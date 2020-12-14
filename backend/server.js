import express from 'express';
import dotenv from 'dotenv';
import morgan from 'morgan';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import colors from 'colors';
import connectDB from './config/db.js';

import blogRoutes from './routes/blogRoutes.js';

dotenv.config();

connectDB();

const app = express();

// MIDDLEWARES
if (process.env.NODE_ENV === 'development') {
	app.use(morgan('dev'));
	app.use(cors({ origin: `${process.env.CLIENT_URL}` }));
}
app.use(express.json());
app.use(cookieParser());

// ROUTES
app.use('/api', blogRoutes);

// PORT
const PORT = process.env.PORT || 8000;

app.listen(PORT, () => {
	console.log(
		`Server running in ${process.env.NODE_ENV} mode on port ${PORT}`.yellow.bold
	);
});
