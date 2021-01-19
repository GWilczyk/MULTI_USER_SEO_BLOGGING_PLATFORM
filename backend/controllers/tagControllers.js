import Tag from '../models/tagModel.js';
import slugify from 'slugify';
import dbErrorHandler from '../middlewares/dbErrorHandler.js';

export const createTag = (req, res) => {
	const { name } = req.body;
	let slugName = slugify(name, { lower: true });

	let tag = new Tag({ name, slug: slugName });

	tag.save((err, data) => {
		if (err) {
			return res.status(400).json({ error: dbErrorHandler(err) });
		}

		res.json(data);
	});
};

export const deleteTag = (req, res) => {
	const slug = req.params.slug.toLowerCase();
	Tag.findOneAndRemove({ slug }).exec((err, data) => {
		if (err) {
			return res.status(400).json({ error: dbErrorHandler(err) });
		}

		res.json({ message: 'Tag deleted successfully.' });
	});
};

export const listTags = (req, res) => {
	Tag.find({}).exec((err, tags) => {
		if (err) {
			return res.status(400).json({ error: dbErrorHandler(err) });
		}

		res.json(tags);
	});
};

export const readTag = (req, res) => {
	const slug = req.params.slug.toLowerCase();
	Tag.findOne({ slug }).exec((err, tag) => {
		if (err) {
			return res.status(400).json({ error: dbErrorHandler(err) });
		}

		res.json(tag);
	});
};
