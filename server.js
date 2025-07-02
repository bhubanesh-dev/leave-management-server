import express from 'express';
import cors from 'cors';
import 'dotenv/config';

import connectDb from './db/connectDb.js';
import authRoutes from './routes/AuthRoutes.js';
import userRoutes from './routes/UserRoutes.js';
import leaveRoutes from './routes/LeaveRoutes.js';

import cookieParser from 'cookie-parser';


const app = express();
const port = process.env.PORT || 3000;

// Connect to DB
connectDb();

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(cors({
  origin: 'https://leave-management-gilt.vercel.app',
  credentials: true 
}));

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/user', userRoutes);
app.use('/api/leave', leaveRoutes);

app.get('/', (req, res) => {
  res.send('Hello World!');
});

app.listen(port, () => {
  console.log(`Server listening on port ${port}/api`);
});
