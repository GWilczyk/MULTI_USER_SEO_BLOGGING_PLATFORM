import mongoose from 'mongoose';

const categorySchema = mongoose.Schema(
	{
		name: {
			type: String,
			trim: true,
			required: true,
			max: 32,
		},
		slug: {
			type: String,
			unique: true,
			index: true,
		},
	},
	{
		timestamps: true,
	}
);

const Category = mongoose.model('Category', categorySchema);

export default Category;
