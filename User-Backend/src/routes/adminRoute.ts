import express from 'express';
import { getNotesForAdmin } from '../controller/adminController';
import { authenticateToken, checkAdmin } from '../middleware/authMiddleware';

const router = express.Router();

// Secure endpoint for fetching notes
router.get('/notes', authenticateToken, checkAdmin, getNotesForAdmin);

export default router;
