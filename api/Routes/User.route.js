import { Router } from "express"
import registerValidator from '../utils/registerValidator.js';
import loginValidator from '../utils/loginValidator.js';
import { deletePost, followUser, getCurrentUser, getCurrentUserPosts, getCurrentUserSavedPosts, getUsers, isUserFollowed, login, logout, register, updateUserProfile } from "../controllers/user.controller.js";
import imageUpload from "../middleware/imageUpload.js";
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
router.post('/deletePost', deletePost);
router.post('/updateUserProfile', imageUpload.single('file'), updateUserProfile);

export default router;