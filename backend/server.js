import express from 'express';
import dotenv from 'dotenv';
import morgan from 'morgan';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import colors from 'colors';
import connectDB from './config/db.js';
import { notFound, errorHandler } from './middlewares/errorMiddlewares.js';

dotenv.config();

import authRoutes from './routes/authRoutes.js';
import blogRoutes from './routes/blogRoutes.js';
import categoryRoutes from './routes/categoryRoutes.js';
import tagRoutes from './routes/tagRoutes.js';
import userRoutes from './routes/userRoutes.js';

connectDB();

const app = express();

if (process.env.NODE_ENV === 'development') {
	// app.use(cors({ origin: `${process.env.CLIENT_URL}` }));
	app.use(cors());
	app.use(morgan('dev'));
}
app.use(express.json());
app.use(cookieParser());

app.use('/api/v1/blog', blogRoutes);
app.use('/api/v1/category', categoryRoutes);
app.use('/api/v1/tag', tagRoutes);
app.use('/api/v1/users', authRoutes);
app.use('/api/v1/users', userRoutes);

app.use(notFound);
app.use(errorHandler);

const PORT = process.env.PORT || 8000;

app.listen(PORT, () => {
	console.log(
		`Server running in ${process.env.NODE_ENV} mode on port ${PORT}`.yellow.bold
	);
});
