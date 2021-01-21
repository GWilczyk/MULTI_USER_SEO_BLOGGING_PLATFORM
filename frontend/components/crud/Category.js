import { useEffect, useState } from 'react';
import Link from 'next/link';
import Router from 'next/router';
import { isAuth, getCookie } from '../../actions/auth';
import { create } from '../../actions/categoryActions';

const Category = () => {
	const [values, setValues] = useState({
		error: false,
		categories: [],
		name: '',
		removed: false,
		success: false,
	});

	const { name, error, success, categories, removed } = values;
	const token = getCookie('token');

	const handleChange = event => {
		setValues(values => ({
			...values,
			error: false,
			name: event.target.value,
			removed: false,
			success: false,
		}));
	};

	const handleSubmit = event => {
		event.preventDefault();
		create({ name }, token).then(data => {
			if (data.error) {
				setValues(values => ({ ...values, error: data.error, success: false }));
			} else {
				setValues(values => ({
					...values,
					error: false,
					name: '',
					success: true,
				}));
			}
		});
		console.log(`Category ${name} created!`);
	};

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

	return <>{newCategoryForm()}</>;
};

export default Category;
