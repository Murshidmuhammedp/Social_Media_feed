import express from 'express'
import { userSignin, userSignup } from '../controller/userController.js';

const router = express.Router();

router.post('/register', userSignup);
router.post('/login', userSignin)

export default router