import { Router } from 'express';
import { auth } from '../middleware/auth.js';
import { getMe, loginUser, logout, refresh, registerUser } from '../controllers/auth.controller.js';

const router = Router();

router.post('/register', registerUser);
router.post('/login', loginUser);
router.post('/refresh', refresh);
router.post('/logout', logout);
router.get('/me', auth, getMe);

export default router;
