import {Router} from "express";
import { getPosts } from "../controllers/post.controllers";
import auth from "../middlewares/auth.middlewares"

const router = Router();

router.get("/", auth, getPosts)

export default router;
