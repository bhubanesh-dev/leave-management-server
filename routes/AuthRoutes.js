import express from 'express';
import verifyToken from '../middleware/verifyToken.js';
import authController from '../controllers/AuthController.js';

const router = express.Router();

router.post('/register', authController.register);
router.post('/login', authController.login);
router.post('/change-password', verifyToken, authController.changePassword);
router.post('/logout', authController.logout)

export default router;
