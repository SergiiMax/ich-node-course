import { Router } from 'express';
import { auth } from '../../middleware/auth.js';
import { logginedUser, login, register } from '../../controllers/authController.js';


const router = Router();

// Регистрация
router.post('/register', register);

// Логин
router.post('/login', login);

// Текущий пользователь по токену
router.get('/me', auth, logginedUser);

export default router;