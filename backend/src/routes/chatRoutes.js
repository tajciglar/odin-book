import express from 'express';
import { getMessages } from '../controllers/chatController.js'
import authenticate from '../middleware/authenticate.js';

const router = express.Router();

router.get('/', authenticate, getMessages);

export default router;