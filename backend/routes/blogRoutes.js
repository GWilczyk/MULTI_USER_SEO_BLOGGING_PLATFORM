import express from 'express';
const router = express.Router();
import {
	createBlog,
	deleteBlog,
	listBlogs,
	listBlogsCategoriesTags,
	readBlog,
	updateBlog,
} from '../controllers/blogController.js';
import {
	adminMiddleware,
	requireSignedIn,
} from '../controllers/authController.js';

router.post('/', requireSignedIn, adminMiddleware, createBlog);

router.delete('/:slug', requireSignedIn, adminMiddleware, deleteBlog);

router.get('/blogs', listBlogs);

router.post('/blogs-categories-tags', listBlogsCategoriesTags);

router.get('/:slug', readBlog);

router.put('/:slug', requireSignedIn, adminMiddleware, updateBlog);

export default router;
