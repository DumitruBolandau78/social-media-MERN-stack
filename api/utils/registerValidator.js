import User from "../models/User.js";
import { body } from "express-validator";

const registerValidator = [
  body('username', 'Username should be at least 3 characters.').isLength({ min: 3, max: 20 }).isAlphanumeric().custom(async (value, { req }) => {
    try {
      const user = await User.findOne({ username: value });

      if (user) {
        return Promise.reject('This username is already taken!');
      }
    } catch (error) {
      console.log(error);
    }
  }),
  body('name', 'Name should be at least 3 characters.').isLength({ min: 3, max: 20 }),
  body('email', 'Please use a valid email address.').isEmail().normalizeEmail().custom(async (value, { req }) => {
    try {
      const user = await User.findOne({ email: value });

      if (user) {
        return Promise.reject('This email is used by another user!');
      }
    } catch (error) {
      console.log(error);
    }
  }),
  body('password', 'Password should be at least 6 characters.').isLength({ min: 6, max: 20 }).isAlphanumeric()
]

export default registerValidator;