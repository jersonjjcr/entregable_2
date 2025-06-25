import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import { corsOptions } from './config/cors';
import userRoutes from './routes/user.routes';
import postRoutes from './routes/post.routes';
import authRoutes from './routes/auth.routes';
import { authMiddleware } from './middleware/auth';

dotenv.config();

const app = express();

app.use(cors(corsOptions));
app.use(express.json());

app.use('/api/auth', authRoutes);
app.use('/api/users', userRoutes);
app.use('/api/posts', authMiddleware, postRoutes);

export default app;
