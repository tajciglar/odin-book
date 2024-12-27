// userRoutes.js
import express from 'express';
import { SignUp, LogIn } from '../controllers/authController.js';

const router = express.Router();

router.post('/signup', SignUp);

router.post('/login', LogIn);

export default router;