import User from "../models/User.js";
import Post from '../models/Post.js';

export async function getPosts(req, res) {
  const page = parseInt(req.query.page) || 1;
  const limit = 5;
  const skip = (page - 1) * limit;

  try {
    const posts = await Post.find().populate('user', 'name username avatarUrl').sort({ createdAt: -1 }).skip(skip).limit(limit).exec();
    res.json(posts);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
}

export async function post(req, res) {
  try {
    if (!req.session.user) {
      return res.status(401).json({ error: 'User not authenticated' });
    }

    const path = '/images/' + req.file.filename;
    const newPost = new Post({ description: req.body.desc, imgUrl: path, user: req.session.user._id});

    await newPost.save();
    await User.findOneAndUpdate({ username: req.session.user.username },{ $push: { posts: newPost._id } });

    const posts = await Post.find().populate('user', 'name username avatarUrl').sort({ createdAt: -1 }).limit(5).exec();

    return res.json({ posts: posts });
  } catch (error) {
    console.error('Error in post function:', error);
    return res.status(500).json({ error: 'An error occurred while processing your request.' });
  }
}

export async function likePostToggle(req, res) {
  const { postID } = req.body;
  try {
    if (req.session.user) {
      const post = await Post.findById(postID);
      const idx = post.likes.findIndex(like => like._id.toString() === req.session.user._id.toString());

      if (idx >= 0) {
        await Post.findByIdAndUpdate({ _id: postID }, { $pull: { likes: req.session.user._id } });
        await User.findByIdAndUpdate(post.user, { $pull: { 'notifications': { message: 'like', user: req.session.user._id, post: post._id }}});
        res.json({ message: 'Unlike' });
      } else {
        await Post.findByIdAndUpdate({ _id: postID }, { $push: { likes: req.session.user._id } });
        await User.findByIdAndUpdate(post.user, { $push: { 'notifications': { message: 'like', user: req.session.user._id,  post: post._id }}});
        res.json({ message: 'Like' });
      }
    }
  } catch (error) {
    console.log(error);
  }
}

export async function savePostToggle(req, res) {
  const { postID } = req.body;
  try {
    if (req.session.user) {
      const user = await User.findById(req.session.user._id);
      const idx = user.saved.findIndex(post => post._id.toString() === postID.toString());

      if (idx >= 0) {
        await User.findByIdAndUpdate(req.session.user._id, { $pull: { saved: postID } })
        res.json({ message: 'Unsaved' });
      } else {
        await User.findByIdAndUpdate(req.session.user._id, { $push: { saved: postID } })
        res.json({ message: 'Saved' });
      }
    }
  } catch (error) {
    console.log(error);
  }
}

export async function getPostComments(req, res) {
  const { postID } = req.query;
  try {
    if (req.session.user) {
      const populatedComment = await Post.findById(postID).select('comments').populate({
        path: 'comments',
        populate: {
          path: 'user',
          select: 'name username avatarUrl'
        },
        select: 'message createdAt'
      }).exec();

      res.status(200).json(populatedComment);
    }
  } catch (error) {
    console.log(error);
  }
}

export async function postComment(req, res) {
  const { comment, postID } = req.body;
  try {
    if (req.session.user) {
      await Post.findByIdAndUpdate(postID, { $push: { comments: { user: req.session.user._id, message: comment } } });

      const populatedComment = await Post.findById(postID).select('comments').populate({
        path: 'comments',
        populate: {
          path: 'user',
          select: 'name avatarUrl username'
        },
        select: 'message createdAt'
      }).exec();

      const post = await Post.findById(postID).select('user');
      await User.findByIdAndUpdate(post.user, { $push: { 'notifications': { message: 'comment', user: req.session.user._id, post: post._id }}});

      res.status(200).json(populatedComment);
    }
  } catch (error) {
    console.log(error);
  }
}