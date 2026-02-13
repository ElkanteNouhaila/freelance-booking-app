import { Router } from "express";
import { addPost, getPosts, updatePost, deletePost } from "../controllers/post.controllers.js";

const router = Router();

router.get('/', getPosts);
router.post('/', addPost);
router.put('/:id', updatePost);
router.delete('/:id', deletePost);

export default router;