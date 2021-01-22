import { useEffect, useState } from 'react';
import { getCookie } from '../../actions/auth';
import {
	createTag,
	deleteTag,
	getTags,
	getTag,
} from '../../actions/tagActions';

const Tag = () => {
	const [values, setValues] = useState({
		deleted: false,
		error: false,
		name: '',
		reload: false,
		success: false,
		tags: [],
	});

	const { deleted, error, name, reload, success, tags } = values;
	const token = getCookie('token');

	useEffect(() => {
		getTags().then(data => {
			if (data.error) {
				console.log(data.error);
			} else {
				setValues(values => ({
					...values,
					tags: data,
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
		let answer = window.confirm('Are you sure you want to delete this tag?');

		answer &&
			deleteTag(slug, token).then(data => {
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
		createTag({ name }, token).then(data => {
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

	const showTags = () =>
		tags.map((tag, index) => (
			<button
				className='btn btn-outline-primary mx-1 mt-3'
				key={index}
				onClick={() => handleDelete(tag.slug)}
				title='Click to delete'
			>
				{tag.name}
			</button>
		));

	const showDeleted = () =>
		deleted && <p className='text-success'>Tag successfully deleted!</p>;

	const showError = () =>
		error && <p className='text-danger'>Tag already exists!</p>;

	const showSuccess = () =>
		success && <p className='text-success'>Tag successfully created!</p>;

	const newTagForm = () => (
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
				{newTagForm()}
				{showTags()}
			</div>
		</>
	);
};

export default Tag;
