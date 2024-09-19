import { Router } from "express"
import registerValidator from '../utils/registerValidator.js';
import loginValidator from '../utils/loginValidator.js';
import { getCurrentUser, getUsers, login, logout, register } from "../controllers/user.controller.js";
const router = Router();

router.get('/getUsers', getUsers);
router.get('/getCurrentUser', getCurrentUser);
router.post('/logout', logout);
router.post('/login', loginValidator, login)
router.post('/register', registerValidator, register);


export default router;