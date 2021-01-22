import { useEffect, useState } from 'react';
import { getCookie } from '../../actions/auth';
import {
	createCategory,
	deleteCategory,
	getCategories,
	getCategory,
} from '../../actions/categoryActions';

const Category = () => {
	const [values, setValues] = useState({
		categories: [],
		deleted: false,
		error: false,
		name: '',
		reload: false,
		success: false,
	});

	const { categories, deleted, error, name, reload, success } = values;
	const token = getCookie('token');

	useEffect(() => {
		getCategories().then(data => {
			if (data.error) {
				console.log(data.error);
			} else {
				setValues(values => ({
					...values,
					categories: data,
					reload: false,
				}));
			}
		});
	}, [reload]);

	const handleChange = event => {
		setValues(values => ({
			...values,
			error: false,
			deleted: false,
			name: event.target.value,
			success: false,
		}));
	};

	const handleDelete = slug => {
		let answer = window.confirm(
			'Are you sure you want to delete this category?'
		);

		answer &&
			deleteCategory(slug, token).then(data => {
				if (data.error) {
					console.log(data.error);
				} else {
				}
				setValues(values => ({
					...values,
					deleted: true,
					reload: true,
				}));
			});
	};

	const handleMouseMove = () =>
		setValues(values => ({
			...values,
			deleted: false,
			error: false,
			success: false,
		}));

	const handleSubmit = event => {
		event.preventDefault();
		createCategory({ name }, token).then(data => {
			if (data.error) {
				setValues(values => ({ ...values, error: data.error, success: false }));
			} else {
				setValues(values => ({
					...values,
					error: false,
					name: '',
					reload: true,
					success: true,
				}));
			}
		});
	};

	const showCategories = () =>
		categories.map((category, index) => (
			<button
				className='btn btn-outline-primary mx-1 mt-3'
				key={index}
				onClick={() => handleDelete(category.slug)}
				title='Click to delete'
			>
				{category.name}
			</button>
		));

	const showDeleted = () =>
		deleted && <p className='text-success'>Category successfully deleted!</p>;

	const showError = () =>
		error && <p className='text-danger'>Category already exists!</p>;

	const showSuccess = () =>
		success && <p className='text-success'>Category successfully created!</p>;

	const newCategoryForm = () => (
		<form onSubmit={handleSubmit}>
			<div className='form-group'>
				<label className='text-muted'>Name</label>

				<input
					type='text'
					className='form-control'
					onChange={handleChange}
					value={name}
					required
				/>
			</div>
			<button type='submit' className='btn btn-primary'>
				Create
			</button>
		</form>
	);

	return (
		<>
			{showDeleted()}
			{showError()}
			{showSuccess()}
			<div onMouseMove={handleMouseMove}>
				{newCategoryForm()}
				{showCategories()}
			</div>
		</>
	);
};

export default Category;
