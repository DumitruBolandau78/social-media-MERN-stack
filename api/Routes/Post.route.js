import { Router } from "express";
import imageUpload from "../middleware/imageUpload.js";
import { getPosts, likePostToggle, post, savePostToggle } from "../controllers/post.controller.js";

const router = Router();

router.get('/getPosts', getPosts)
router.post('/post', imageUpload.single('file'), post);
router.post('/likePostToggle', likePostToggle);
router.post('/savePostToggle', savePostToggle);

export default router;