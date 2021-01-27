import express from 'express';
import {
	createTag,
	deleteTag,
	listTags,
	readTag,
} from '../controllers/tagControllers.js';
import { runValidation } from '../middlewares/validation.js';
import { tagCreateValidator } from '../middlewares/tagValidators.js';
import {
	adminMiddleware,
	requireSignedIn,
} from '../controllers/authController.js';

const router = express.Router();

router.delete('/:slug', requireSignedIn, adminMiddleware, deleteTag);

router.get('/tags', listTags);

router.get('/:slug', readTag);

router.post(
	'/',
	tagCreateValidator,
	runValidation,
	requireSignedIn,
	adminMiddleware,
	createTag
);

export default router;
