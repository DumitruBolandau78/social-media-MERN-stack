import bcrypt from 'bcrypt';
import { validationResult } from "express-validator";
import User from "../models/User.js";
import Post from '../models/Post.js';

export async function getCurrentUser(req, res) {
  if (req.session.user) {
    const populatedUser = await User.findOne({ username: req.session.user.username }).select('-password').exec();
    res.json({ user: populatedUser });
  } else {
    res.json({ error: 'Could not find user or is authenticated' });
  }
};

export async function register(req, res) {
  try {
    const { username, email, password, name } = req.body;
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.json({ error: errors.array()[0].msg });
    }

    const hashPassword = await bcrypt.hash(password, 10);
    const user = new User({ username, email, password: hashPassword, name });

    user.save();
    res.json({ message: 'User created successfull' });
  } catch (error) {
    console.log(error);
  }
};

export async function login(req, res) {
  const { username } = req.body;
  
  try {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.json({ error: errors.array()[0].msg });
    }

    const populatedUser = await User.findOne({ username }).select('-password').exec();
    req.session.user = populatedUser;
    req.session.save(err => {
      if (err) throw new err;
      res.json({ message: 'Login successfull', user: req.session.user });
    });

  } catch (error) {
    console.log(error)
  }
}

export async function logout(req, res) {
  try {
    req.session.destroy(err => {
      if (err) throw err;
      return res.json({ message: 'Logout successful' });
    });
  } catch (error) {
    console.log(error)
  }
};

export async function getUsers(req, res) {
  try {
    const users = await User.find({}).select('name username avatarUrl').sort({ createdAt: -1 }).limit(5);
    if (req.session.user) {
      const filteredUsers = users.filter(user => user.username !== req.session.user.username);
      res.json({ users: filteredUsers });
    } else {
      res.json({ users });
    }
  } catch (error) {
    console.log(error);
    res.json({ error });
  }
}

export async function getCurrentUserPosts(req, res) {
  try {
    if (req.session.user) {
      const page = parseInt(req.query.page) || 1;
      const limit = 5;
      const skip = (page - 1) * limit;

      const userPosts = await User.findById(req.session.user._id).populate('posts', 'imgUrl createdAt description likes comments');

      // Sort user posts by createdAt time in descending order
      userPosts.posts.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));

      // Get the last 5 posts
      const paginatedPosts = userPosts.posts.slice(skip, skip + limit);
      res.json(paginatedPosts);
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}

export async function getCurrentUserSavedPosts(req, res) {
  try {
    if (req.session.user) {
      const page = parseInt(req.query.page) || 1;
      const limit = 5;
      const skip = (page - 1) * limit;

      const userPosts = await User.findById(req.session.user._id).populate({
        path: 'saved',
        populate: {
          path: 'user',
          select: 'name username avatarUrl'
        },
        select: 'imgUrl user createdAt description likes comments'
      });

      // Sort user posts by createdAt time in descending order
      userPosts.saved.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));

      // Get the last 5 posts
      const paginatedPosts = userPosts.saved.slice(skip, skip + limit);
      res.json(paginatedPosts);
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}

export async function followUser(req, res) {
  const { postID, userID } = req.body;
  try {
    if (req.session.user) {
      const post = await Post.findById(postID).populate('user', 'username');
      const currentUserFollowing = await User.findById(req.session.user._id).select('following').populate('following', 'username');

      let idx;
      let id;

      if (userID) {
        id = userID;
        idx = currentUserFollowing.following.findIndex(user => user._id.toString() === userID);
      } else {
        id = post.user._id;
        idx = currentUserFollowing.following.findIndex(user => user.username === post.user.username);
      }

      if (idx >= 0) {
        await User.findByIdAndUpdate(req.session.user._id, { $pull: { 'following': id } })
        await User.findByIdAndUpdate(id, { $pull: { 'followers': req.session.user._id } })
        res.status(200).json({ msg: false });
      } else {
        await User.findByIdAndUpdate(req.session.user._id, { $push: { 'following': id } })
        await User.findByIdAndUpdate(id, { $push: { 'followers': req.session.user._id } })
        res.status(200).json({ msg: true });
      }
    }
  } catch (error) {
    console.log(error);
  }
}

export async function isUserFollowed(req, res) {
  const { postID, userID } = req.query;

  try {
    let user;
    let post;
    if (userID) {
      user = await User.findById(userID).select('username');
    } else {
      post = await Post.findById(postID).select('user');
      user = await User.findById(post.user).select('username');
    }

    if (req.session.user) {
      const currentUser = await User.findById(req.session.user._id).select('following').populate('following', 'username');
      const idx = currentUser.following.findIndex(u => u.username === user.username);

      if (idx >= 0) {
        res.status(200).json({ msg: true });
      } else {
        res.status(200).json({ msg: false });
      }
    } else {
      res.json({ msg: 'user not logged' });
    }
  } catch (error) {
    console.log(error);
  }
}

export async function deletePost(req, res) {
  const { postID } = req.body;
  try {
    if (req.session.user) {  
      const user = await User.findById(req.session.user._id).select('posts');
      const postIndex = user.posts.findIndex(post => post._id.toString() === postID);
      if (postIndex !== -1) {
        user.posts.splice(postIndex, 1); // Remove the post from the array
      }
      await user.save();
      await Post.findByIdAndDelete(postID);

      res.status(200).json({msg: 'Post deleted successful.'});
    }
  } catch (error) {
    console.log(error);
  }
}

export async function updateUserProfile(req, res) {
  const path = '/images/' + req.file.filename;
  const { newName } = req.body;
  
  try {
    if(req.session.user){
      await User.findByIdAndUpdate(req.session.user._id, { avatarUrl: path, name: newName })
      const user = await User.findById(req.session.user._id).select('-password');
      res.json(user);
    }  
  } catch (error) {
    console.log(error);
  }
}