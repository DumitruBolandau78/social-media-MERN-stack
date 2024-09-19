import { body } from 'express-validator';
import bcrypt from 'bcrypt'
import User from '../models/User.js';

const loginValidator = [
  body('username', 'Username should be at least 3 characters').isLength({min: 3, max: 20}).isAlphanumeric().custom(async (value, { req }) => {
    try {
      const user = await User.findOne({ username: value });

      if (!user) {
        return Promise.reject('User doesnt exist.');
      }
    } catch (error) {
      console.log(error);
    }
  }),
  body('password', 'Password should be at least 6 characters.').isLength({ min: 6, max: 20 }).isAlphanumeric().custom(async (value, { req }) => {
    try {
      const user = await User.findOne({ username: req.body.username });
      
      if (user) {
        const equalPasswords = await bcrypt.compare(value, user.password);

        if (!equalPasswords) {
          return Promise.reject('Incorrect password.');
        }
      }

    } catch (error) {
      console.log(error);
    }
  }),
]

export default loginValidator;