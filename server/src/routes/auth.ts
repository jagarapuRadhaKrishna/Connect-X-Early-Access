import { Router } from 'express';
import { login, refreshToken, logout, getProfile } from '../controllers/authController';
import { loginValidation } from '../validations/authValidation';
import { authenticate } from '../middleware/auth';

const router = Router();

router.post('/login', loginValidation, login);
router.post('/refresh', refreshToken);
router.post('/logout', logout);
router.get('/profile', authenticate, getProfile);

export default router;
