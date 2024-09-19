import bcrypt from 'bcrypt';
import { validationResult } from "express-validator";
import User from "../models/User.js";

export async function getCurrentUser(req, res) {
  if (req.session.user) {
    const populatedUser = await User.findOne({ username: req.session.user.username }).select('-password').exec();
    res.json({ user: populatedUser });
  } else {
    return res.status(404).json({ error: 'Could not find user or is authenticated' });
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
      return res.json({ message: 'Login successfull', user: req.session.user });
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
    if (users) {
      res.json(users);
    }
  } catch (error) {
    console.log(error);
    res.json({ error });
  }
}