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
	const blogFromLocalStorage = () => {
		if (typeof window === 'undefined') {
			return {};
		}

		if (localStorage.getItem('blog')) {
			return JSON.parse(localStorage.getItem('blog'));
		} else {
			return {};
		}
	};

	const [body, setBody] = useState(blogFromLocalStorage());
	const [categories, setCategories] = useState([]);
	const [checkedCategories, setCheckedCategories] = useState([]);
	const [checkedTags, setCheckedTags] = useState([]);
	const [tags, setTags] = useState([]);
	const [values, setValues] = useState({
		error: false,
		formData: '',
		hidePublishButton: false,
		sizeError: '',
		success: false,
		title: '',
	});

	const {
		error,
		formData,
		hidePublishButton,
		sizeError,
		success,
		title,
	} = values;

	useEffect(() => {
		setValues(state => ({ ...state, formData: new FormData() }));
		initCategories();
		initTags();
	}, [router]);

	const createBlogForm = () => {
		return (
			<form onSubmit={publishBlog}>
				<div className='form-group'>
					<label className='text-muted'>Title</label>
					<input
						className='form-control'
						name='title'
						onChange={handleChange}
						type='text'
						value={title}
					/>
				</div>

				<div className='form-group'>
					<ReactQuill
						formats={BlogCreate.formats}
						modules={BlogCreate.modules}
						onChange={handleReactQuill}
						placeholder='Write something amazing…'
						value={body}
					/>
				</div>

				<div>
					<button type='submit' className='btn btn-primary'>
						Publish
					</button>
				</div>
			</form>
		);
	};

	const handleChange = ({ target: { files, name, value } }) => {
		const receivedData = name === 'photo' ? files[0] : value;
		formData.set(name, receivedData);
		setValues(state => ({
			...state,
			[name]: receivedData,
			formData,
			error: '',
		}));
	};

	const handleReactQuill = event => {
		setBody(event);
		formData.set('body', event);
		if (typeof window !== 'undefined') {
			localStorage.setItem('blog', JSON.stringify(event));
		}
	};

	const handleToggle = ({ target: { id, name } }) => {
		setValues(prevState => ({ ...prevState, error: '' }));

		const all =
			name === 'Categories' ? [...checkedCategories] : [...checkedTags];

		const clickedItem = all.indexOf(id);

		clickedItem === -1 ? all.push(id) : all.splice(clickedItem, 1);

		if (name === 'Categories') {
			setCheckedCategories(all);
			formData.set('categories', all);
		} else {
			setCheckedTags(all);
			formData.set('tags', all);
		}
	};

	const initCategories = () => {
		getCategories().then(data => {
			if (data.error) {
				setValues(state => ({ ...state, error: data.error }));
			} else {
				setCategories(data);
			}
		});
	};

	const initTags = () => {
		getTags().then(data => {
			if (data.error) {
				setValues(state => ({ ...state, error: data.error }));
			} else {
				setTags(data);
			}
		});
	};

	const publishBlog = event => {
		event.preventDefault();
		console.log('ready to publishBlog');
	};

	const showCategories = () => {
		return (
			categories &&
			categories.map((category, index) => (
				<li className='list-unstyled' key={index}>
					<input
						className='mr-2'
						id={category._id}
						name='Categories'
						onChange={handleToggle}
						type='checkbox'
					/>
					<label className='form-check-label'>{category.name}</label>
				</li>
			))
		);
	};

	const showTags = () => {
		return (
			tags &&
			tags.map((tag, index) => (
				<li className='list-unstyled' key={index}>
					<input
						className='mr-2'
						id={tag._id}
						name='Tags'
						onChange={handleToggle}
						type='checkbox'
					/>
					<label className='form-check-label'>{tag.name}</label>
				</li>
			))
		);
	};

	return (
		<div className='container-fluid'>
			<div className='row'>
				<div className='col-md-8'>
					{createBlogForm()}
					<hr />
					{JSON.stringify(title)}
					<hr />
					{JSON.stringify(body)}
				</div>
				<div className='col-md-4'>
					<h5>Categories</h5>
					<hr />
					<ul style={{ maxHeight: '200px', overflowY: 'scroll' }}>
						{showCategories()}
					</ul>
					<h5>Tags</h5>
					<hr />
					<ul style={{ maxHeight: '200px', overflowY: 'scroll' }}>
						{showTags()}
					</ul>
				</div>
			</div>
		</div>
	);
};

BlogCreate.modules = {
	toolbar: [
		[{ header: '1' }, { header: '2' }, { header: [3, 4, 5, 6] }, { font: [] }],
		[{ size: [] }],
		['bold', 'italic', 'underline', 'strike', 'blockquote'],
		[{ list: 'ordered' }, { list: 'bullet' }],
		['link', 'image', 'video'],
		['clean'],
		['code-block'],
	],
};

BlogCreate.formats = [
	'blockquote',
	'bold',
	'bullet',
	'code-block',
	'font',
	'header',
	'image',
	'italic',
	'link',
	'list',
	'size',
	'strike',
	'underline',
	'video',
];

export default withRouter(BlogCreate);
