import express from 'express';
import authRoutes from './routes/authRoutes';
import { authenticateToken, checkAdmin } from './middleware/authMiddleware';
import notesRoute from './routes/notesRoute';
import adminRoute from './routes/adminRoute';

const app = express();

app.use(express.json());
app.use('/api/auth', authRoutes);
app.use('/api/notes', authenticateToken, notesRoute);
app.use('/api/admin', authenticateToken, checkAdmin, adminRoute); 

export default app;
