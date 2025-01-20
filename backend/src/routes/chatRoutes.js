import express from 'express';
import { getMessages, sendMessage } from '../controllers/chatController.js'
import authenticate from '../middleware/authenticate.js';

const router = express.Router();

router.get('/', authenticate, getMessages);

router.post('/send', authenticate, sendMessage)

export default router;