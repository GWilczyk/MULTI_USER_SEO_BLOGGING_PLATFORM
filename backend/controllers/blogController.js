import fs from 'fs';
import formidable from 'formidable';
import slugify from 'slugify';
import stripHtml from 'string-strip-html';
import _ from 'lodash';

import Blog from '../models/blogModel.js';
import Category from '../models/categoryModel.js';
import Tag from '../models/tagModel.js';
import dbErrorHandler from '../middlewares/dbErrorHandler.js';
import { smartTrim } from '../middlewares/blogHelpers.js';

export const createBlog = (req, res) => {
	let form = new formidable.IncomingForm();
	form.keepExtensions = true;
	form.parse(req, (err, fields, files) => {
		if (err) {
			return res.status(400).json({ error: 'Image could not upload.' });
		}

		const { title, body, categories, tags } = fields;

		if (!body || body.length < 200) {
			return res.status(400).json({ error: 'Content is too short.' });
		}

		if (!categories || categories.length === 0) {
			return res
				.status(400)
				.json({ error: 'At least one category is required.' });
		}

		if (!tags || tags.length === 0) {
			return res.status(400).json({ error: 'At least one tag is required.' });
		}

		if (!title || title.length === 0) {
			return res.status(400).json({ error: 'Title is required.' });
		}

		let categoriesArray = categories && categories.split(',');
		let tagsArray = tags && tags.split(',');

		let blog = new Blog();

		blog.body = body;
		blog.excerpt = smartTrim(body, 320, ' ', ' …');
		blog.mdesc = stripHtml(body.substring(0, 160)).result;
		blog.mtitle = `${title} | ${process.env.APP_NAME}`;
		blog.postedBy = req.user._id;
		blog.slug = slugify(title, { lower: true });
		blog.title = title;

		if (files.photo) {
			if (files.photo.size > 1000000) {
				return res
					.status(400)
					.json({ error: 'Image should be less than 1Mo in size' });
			}

			blog.photo.data = fs.readFileSync(files.photo.path);
			blog.photo.contentType = files.photo.type;
		}

		blog.save((err, result) => {
			if (err) {
				return res.status(400).json({ error: dbErrorHandler(err) });
			}

			Blog.findByIdAndUpdate(
				result._id,
				{
					$push: { categories: categoriesArray },
				},
				{ new: true }
			).exec((err, result) => {
				if (err) {
					return res.status(400).json({ error: dbErrorHandler(err) });
				} else {
					Blog.findByIdAndUpdate(
						result._id,
						{ $push: { tags: tagsArray } },
						{ new: true }
					).exec((err, result) => {
						if (err) {
							return res.status(400).json({ error: dbErrorHandler(err) });
						}

						res.json(result);
					});
				}
			});
		});
	});
};

export const deleteBlog = (req, res) => {
	const slug = req.params.slug;

	Blog.findOneAndRemove({ slug }).exec((err, data) => {
		if (err) {
			return res.json({ error: dbErrorHandler(err) });
		}

		res.json({ message: 'Blog deleted successfully.' });
	});
};

export const listBlogs = (req, res) => {
	Blog.find({})
		.populate('categories', '_id name slug')
		.populate('postedBy', '_id name username')
		.populate('tags', '_id name slug')
		.select(
			'_id categories createdAt excerpt postedBy slug tags title updatedAt'
		)
		.exec((err, data) => {
			if (err) {
				return res.json({ error: dbErrorHandler(err) });
			}

			res.json(data);
		});
};

export const listBlogsCategoriesTags = (req, res) => {
	let limit = req.body.limit ? parseInt(req.body.limit) : 10;
	let skip = req.body.skip ? parseInt(req.body.skip) : 0;

	let blogs;
	let categories;
	let tags;

	// Get all Blogs
	Blog.find({})
		.populate('categories', '_id name slug')
		.populate('postedBy', '_id name profile username')
		.populate('tags', '_id name slug')
		.sort({ createdAt: -1 })
		.skip(skip)
		.limit(limit)
		.select(
			'_id categories createdAt excerpt postedBy slug tags title updatedAt'
		)
		.exec((err, allBlogs) => {
			if (err) {
				return res.json({ error: dbErrorHandler(err) });
			}

			blogs = allBlogs;

			// Get all Categories
			Category.find({}).exec((err, allCategories) => {
				if (err) {
					return res.json({ error: dbErrorHandler(err) });
				}

				categories = allCategories;

				// Get all Tags
				Tag.find({}).exec((err, allTags) => {
					if (err) {
						return res.json({ error: dbErrorHandler(err) });
					}

					tags = allTags;

					// Return all Blogs, Categories, Tags as response
					res.json({ blogs, categories, tags, size: blogs.length });
				});
			});
		});
};

export const readBlog = (req, res) => {
	const slug = req.params.slug.toLowerCase();

	Blog.findOne({ slug })
		.populate('categories', '_id name slug')
		.populate('postedBy', '_id name username')
		.populate('tags', '_id name slug')
		.select(
			'_id body categories createdAt mdesc mtitle postedBy slug tags title updatedAt'
		)
		.exec((err, blog) => {
			if (err) {
				return res.json({ error: dbErrorHandler(err) });
			}

			res.json(blog);
		});
};

export const updateBlog = (req, res) => {
	const slug = req.params.slug.toLowerCase();

	Blog.findOne({ slug }).exec((err, oldBlog) => {
		if (err) {
			return res.json({ error: dbErrorHandler(err) });
		}

		let form = new formidable.IncomingForm();
		form.keepExtensions = true;
		form.parse(req, (err, fields, files) => {
			if (err) {
				return res.status(400).json({ error: 'Image could not upload.' });
			}

			// We do NOT change slug for SEO concerns!
			let slugBeforeMerge = oldBlog.slug;
			oldBlog = _.merge(oldBlog, fields);
			oldBlog.slug = slugBeforeMerge;

			const { body, categories, tags } = fields;

			if (body) {
				oldBlog.excerpt = smartTrim(body, 320, ' ', ' …');
				oldBlog.mdesc = stripHtml(body.substring(0, 160)).result;
			}

			if (categories) {
				oldBlog.categories = categories.split(',');
			}

			if (tags) {
				oldBlog.tags = tags.split(',');
			}

			if (files.photo) {
				if (files.photo.size > 1000000) {
					return res
						.status(400)
						.json({ error: 'Image should be less than 1Mo in size' });
				}

				oldBlog.photo.data = fs.readFileSync(files.photo.path);
				oldBlog.photo.contentType = files.photo.type;
			}

			oldBlog.save((err, result) => {
				if (err) {
					return res.status(400).json({ error: dbErrorHandler(err) });
				}

				res.json(result);
			});
		});
	});
};
