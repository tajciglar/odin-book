import { Router } from "express";

import { getPosts } from '../controllers/postController.js'

import authenticate from "../middleware/authenticate.js";
const router = Router();

router.get('/', authenticate, getPosts);

export default router;