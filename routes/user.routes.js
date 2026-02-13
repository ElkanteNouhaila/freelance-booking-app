import { Router } from 'express';
import { signIn, signUp } from '../controllers/user.controllers.js';

const router = Router();

router.post('/signup', signUp);
router.post('/signin', auth, signIn);

export default router;
