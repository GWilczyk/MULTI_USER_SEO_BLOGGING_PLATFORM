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

export const deleteBlog = (req, res) => {};

export const listBlogs = (req, res) => {};

export const readBlog = (req, res) => {};
