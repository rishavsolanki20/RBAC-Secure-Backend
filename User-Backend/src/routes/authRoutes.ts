import { Router } from 'express';
import { register, login } from '../controller/authController';
import { validateRegister, validateLogin } from '../middleware/validateMiddleware';

const router = Router();

router.post('/register', validateRegister, register);
router.post('/login', validateLogin, login);

export default router;
