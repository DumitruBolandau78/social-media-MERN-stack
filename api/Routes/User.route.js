import { Router } from "express"
import registerValidator from '../utils/registerValidator.js';
import loginValidator from '../utils/loginValidator.js';
import { followUser, getCurrentUser, getCurrentUserPosts, getCurrentUserSavedPosts, getUsers, isUserFollowed, login, logout, register } from "../controllers/user.controller.js";
const router = Router();

router.get('/getUsers', getUsers);
router.get('/getCurrentUser', getCurrentUser);
router.post('/logout', logout);
router.post('/login', loginValidator, login)
router.post('/register', registerValidator, register);
router.get('/getCurrentUserPosts', getCurrentUserPosts);
router.get('/getCurrentUserSavedPosts', getCurrentUserSavedPosts);
router.post('/followUser', followUser);
router.get('/isUserFollowed', isUserFollowed);


export default router;