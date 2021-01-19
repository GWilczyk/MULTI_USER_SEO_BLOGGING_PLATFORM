import Category from '../models/categoryModel.js';
import slugify from 'slugify';
import dbErrorHandler from '../middlewares/dbErrorHandler.js';

export const createCategory = (req, res) => {
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

export const deleteCategory = (req, res) => {
	const slug = req.params.slug.toLowerCase();
	Category.findOneAndRemove({ slug }).exec((err, data) => {
		if (err) {
			return res.status(400).json({ error: dbErrorHandler(err) });
		}

		res.json({ message: 'Category deleted successfully' });
	});
};

export const listCategories = (req, res) => {
	Category.find({}).exec((err, data) => {
		if (err) {
			return res.status(400).json({ error: dbErrorHandler(err) });
		}

		res.json(data);
	});
};

export const readCategory = (req, res) => {
	const slug = req.params.slug.toLowerCase();
	Category.findOne({ slug }).exec((err, category) => {
		if (err) {
			return res.status(400).json({ error: dbErrorHandler(err) });
		}

		res.json(category);
	});
};
