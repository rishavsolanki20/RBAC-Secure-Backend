import express from 'express';
import { validateLogin } from '../middlewares/validateMiddleware';
import { getUsers, getUserById, deleteUser, getNotesForAudit } from '../controllers/adminController';
import { authenticateToken, checkAdmin } from '../middlewares/authMiddleware';
import { getAuditLogs } from '../controllers/auditController';

const router = express.Router();

router.post('/auth/login', validateLogin, checkAdmin);

router.get('/users', authenticateToken, checkAdmin, getUsers);
router.get('/users/:id', authenticateToken, checkAdmin, getUserById);
router.delete('/users/:id', authenticateToken, checkAdmin, deleteUser);
router.get('/audit/notes', authenticateToken, checkAdmin, getNotesForAudit);
router.get('/audit/logs', authenticateToken, checkAdmin, getAuditLogs);

export default router;
