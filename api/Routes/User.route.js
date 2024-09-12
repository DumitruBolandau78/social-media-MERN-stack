import { Router } from "express"
import User from "../models/User.js";
const router = Router();

router.get('/getUsers', async (req, res) => {
  try {
    const users = await User.find({}).select('name username avatarUrl').sort({ createdAt: -1 }).limit(5);
    if(users){
      res.json(users);
    }
  } catch (error) {
    console.log(error);
    res.json({error});
  }
});


export default router;