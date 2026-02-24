import { Router } from 'express';
import { deleteUser, getUser, updateUser } from '../controllers/user.controller.js';
import {verifytoken, authorizeRole} from '../middlewares/auth.middlewares.js'

const router = Router();

// anyone logged in can access
router.get('/me', verifytoken, getUser);
router.delete('/me', verifytoken, deleteUser)

// only freelancers can access
router.put('/freelancer-profile', verifytoken, authorizeRole("FREELANCER"), updateUser);

export default router;
