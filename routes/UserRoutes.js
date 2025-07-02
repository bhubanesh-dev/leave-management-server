import express from 'express';
import userController from '../controllers/UserController.js';
import verifyToken from '../middleware/verifyToken.js';
import  requireRole  from '../middleware/requireRole.js';

const router = express.Router();

router.get('/me', verifyToken, userController.getYourInfo);
router.get('/', verifyToken, requireRole('Admin'), userController.getAllUsers);
router.post('/create', verifyToken, requireRole('Admin'), userController.createUser);
router.delete('/:id',verifyToken,requireRole('Admin'),userController.deleteUser);
router.get('/check-password/:id',verifyToken,requireRole('Admin'), userController.checkPassword);
router.put('/',verifyToken,requireRole("Admin"),userController.editUser );

export default router;
