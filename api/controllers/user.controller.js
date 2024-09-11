import { Router } from "express";
import bcrypt from 'bcrypt';
import { validationResult } from "express-validator";
import User from "../models/User.js";
import registerValidator from '../utils/registerValidator.js';
import loginValidator from '../utils/loginValidator.js';

const router = Router();

router.get('/getUser', (req, res) => {
  if(req.session.user){
    res.json({user: req.session.user});
  } else {
    return res.status(404).json({error: 'Could not find user or is authenticated'});
  }
});

router.post('/register', registerValidator, async (req, res) => {
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
});

router.post('/login', loginValidator, async (req, res) => {
  try {
    const { username } = req.body;
    const user = await User.findOne({ username });

    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.json({ error: errors.array()[0].msg });
    }

    const populatedUser = await User.findOne({ username }).select('username posts followers following email name avatarUrl').exec();
    req.session.user = populatedUser;
    req.session.save(err => {
      if (err) throw new err;
      return res.json({message: 'Login successfull', user: req.session.user});
    });

  } catch (error) {
    console.log(error)
  }
});

router.post('/logout', (req, res) => {
  try {    
    req.session.destroy(err => {
      if(err) throw err;
      return res.json({ message: 'Logout successful' });
    });
  } catch (error) {
    console.log(error)
  }
});

export default router;