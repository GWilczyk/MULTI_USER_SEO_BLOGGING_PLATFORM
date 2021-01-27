import express from 'express';
const router = express.Router();
import {
	createBlog,
	deleteBlog,
	listBlogs,
	readBlog,
} from '../controllers/blogController.js';
import {
	adminMiddleware,
	requireSignedIn,
} from '../controllers/authController.js';

router.post('/', requireSignedIn, adminMiddleware, createBlog);

router.delete('/:slug', requireSignedIn, adminMiddleware, deleteBlog);

router.get('/blogs', listBlogs);

router.get('/:slug', readBlog);

export default router;
