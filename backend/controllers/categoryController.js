import Category from '../models/categoryModel.js';
import slugify from 'slugify';
import dbErrorHandler from '../middlewares/dbErrorHandler.js';

export const create = (req, res) => {
	const { name } = req.body;
	let slugName = slugify(name, { lower: true });

	let category = new Category({ name, slug: slugName });

	category.save((err, data) => {
		if (err) {
			return res.status(400).json({ error: dbErrorHandler(err) });
		}

		res.json(data);
	});
};
