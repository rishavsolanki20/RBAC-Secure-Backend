import express from 'express';
import adminRoutes from './routes/adminRoutes';
import connectDB from './config/db';

const app = express();

app.use(express.json());
app.use('/api', adminRoutes);

const PORT = process.env.PORT || 5001;
connectDB();
app.listen(PORT, () => console.log(`Admin Backend running on port ${PORT}`));
