import express from 'express';
import dotenv from 'dotenv';
import morgan from 'morgan';
import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import colors from 'colors';

dotenv.config();

// APP
const app = express();

// MIDDLEWARES
if (process.env.NODE_ENV === 'development') {
	app.use(morgan('dev'));
	app.use(cors({ origin: `${process.env.CLIENT_URL}` }));
}
app.use(bodyParser.json());
app.use(cookieParser());

// ROUTES
app.get('/api', (req, res) => {
	res.json({ time: Date().toString() });
});

// PORT
const PORT = process.env.PORT || 8000;

app.listen(PORT, () => {
	console.log(
		`Server running in ${process.env.NODE_ENV} mode on port ${PORT}`.yellow.bold
	);
});
