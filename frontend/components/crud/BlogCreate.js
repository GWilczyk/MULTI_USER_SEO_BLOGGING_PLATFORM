import dynamic from 'next/dynamic';
import Link from 'next/link';
import Router, { withRouter } from 'next/router';
import { useEffect, useState } from 'react';

import {
	createBlog,
	deleteBlog,
	getBlog,
	getBlogs,
} from '../../actions/blogActions';
import { getCategories } from '../../actions/categoryActions';
import { getCookie } from '../../actions/auth';
import { getTags } from '../../actions/tagActions';

const ReactQuill = dynamic(() => import('react-quill'), { ssr: false });

import '../../node_modules/react-quill/dist/quill.snow.css';

const BlogCreate = ({ router }) => {
	const [values, setValues] = useState({
		blogs: [],
		deleted: false,
		error: false,
		name: '',
		reload: false,
		success: false,
	});

	const { blogs, deleted, error, name, reload, success } = values;
	const token = getCookie('token');

	useEffect(() => {
		getBlogs().then(data => {
			if (data.error) {
				console.log(data.error);
			} else {
				setValues(values => ({
					...values,
					blogs: data,
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
			deleteBlog(slug, token).then(data => {
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
		createBlog({ name }, token).then(data => {
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

	const showBlogs = () =>
		blogs.map((blog, index) => (
			<button
				className='btn btn-outline-primary mx-1 mt-3'
				key={index}
				onClick={() => handleDelete(blog.slug)}
				title='Click to delete'
			>
				{blog.title}
			</button>
		));

	const showDeleted = () =>
		deleted && <p className='text-success'>Blog successfully deleted!</p>;

	const showError = () =>
		error && <p className='text-danger'>Blog already exists!</p>;

	const showSuccess = () =>
		success && <p className='text-success'>Blog successfully created!</p>;

	const newBlogForm = () => (
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
			<h2>Create Blog Form</h2>
			{JSON.stringify(router)}
		</>
	);
};

export default withRouter(BlogCreate);
