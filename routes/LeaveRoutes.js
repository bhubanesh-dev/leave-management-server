import express from 'express';

import  verifyToken  from '../middleware/verifyToken.js';
import requireRole  from '../middleware/requireRole.js';
import leaveController from '../controllers/LeaveController.js';

const router = express.Router();

router.post('/create', verifyToken, leaveController.applyLeave );
router.get('/me', verifyToken, leaveController.getYourLeaves );
router.get('/all-leaves', verifyToken, requireRole('Admin'), leaveController.getAllLeaves );
router.put('/:id/:status', verifyToken, requireRole('Admin'), leaveController.updateLeaves );

export default router;