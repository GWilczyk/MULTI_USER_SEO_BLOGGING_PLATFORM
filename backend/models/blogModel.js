import mongoose from 'mongoose';

const blogSchema = mongoose.Schema(
	{
		body: {
			min: 200,
			max: 2000000,
			required: true,
			type: {},
		},
		categories: [
			{ type: mongoose.Schema.ObjectId, ref: 'Category', required: true },
		],
		excerpt: {
			max: 1000,
			type: String,
		},
		mdesc: {
			type: String,
		},
		mtitle: {
			type: String,
		},
		postedBy: {
			ref: 'User',
			type: mongoose.Schema.ObjectId,
		},
		slug: {
			index: true,
			type: String,
			unique: true,
		},
		tags: [{ type: mongoose.Schema.ObjectId, ref: 'Tag', required: true }],
		title: {
			max: 160,
			min: 3,
			required: true,
			trim: true,
			type: String,
		},
		photo: {
			contentType: String,
			data: Buffer,
		},
	},
	{
		timestamps: true,
	}
);

const Blog = mongoose.model('Blog', blogSchema);

export default Blog;
