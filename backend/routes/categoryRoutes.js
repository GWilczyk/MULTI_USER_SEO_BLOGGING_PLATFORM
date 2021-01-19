import express from 'express';
import {
	createCategory,
	deleteCategory,
	listCategories,
	readCategory,
} from '../controllers/categoryController.js';
import { runValidation } from '../middlewares/validation.js';
import { categoryCreateValidator } from '../middlewares/categoryValidators.js';
import {
	adminMiddleware,
	requireSignedIn,
} from '../controllers/authController.js';

const router = express.Router();

router.delete('/:slug', requireSignedIn, adminMiddleware, deleteCategory);

router.get('/listAllCategories', listCategories);

router.get('/:slug', readCategory);

router.post(
	'/',
	categoryCreateValidator,
	runValidation,
	requireSignedIn,
	adminMiddleware,
	createCategory
);

export default router;
