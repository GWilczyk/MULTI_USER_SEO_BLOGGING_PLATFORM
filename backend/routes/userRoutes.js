import express from 'express';
import {
	authMiddleware,
	requireSignedIn,
} from '../controllers/authController.js';
import { profileNoHashedPassword } from '../controllers/userController.js';

const router = express.Router();

router.get(
	'/profile',
	requireSignedIn,
	authMiddleware,
	profileNoHashedPassword
);

export default router;
