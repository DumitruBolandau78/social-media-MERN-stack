import { Router } from "express";
import imageUpload from "../middleware/imageUpload.js";
import { getPostComments, getPosts, likePostToggle, post, postComment, savePostToggle } from "../controllers/post.controller.js";

const router = Router();

router.get('/getPosts', getPosts)
router.post('/post', imageUpload.single('file'), post);
router.post('/likePostToggle', likePostToggle);
router.post('/savePostToggle', savePostToggle);
router.get('/getPostComments', getPostComments);
router.post('/postComment', postComment)

export default router;