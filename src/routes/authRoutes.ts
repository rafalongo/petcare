import express from 'express';
import { AuthController } from '../controllers/authController';

const router = express.Router();

// já deve existir o login
// router.post('/login', AuthController.login);

router.post('/refresh', AuthController.refresh);
router.post('/logout', AuthController.logout);

export default router;
