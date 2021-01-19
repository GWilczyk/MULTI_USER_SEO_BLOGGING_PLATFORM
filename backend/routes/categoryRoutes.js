import express from 'express';
import { create } from '../controllers/categoryController.js';
import { runValidation } from '../middlewares/validation.js';
import { categoryCreateValidator } from '../middlewares/categoryValidators.js';
import {
	adminMiddleware,
	requireSignedIn,
} from '../controllers/authController.js';

const router = express.Router();

router.post(
	'/',
	categoryCreateValidator,
	runValidation,
	requireSignedIn,
	adminMiddleware,
	create
);

export default router;
