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

	const publishBlog = event => {
		event.preventDefault();
		console.log('ready to publishBlog');
	};

	return (
		<>
			{createBlogForm()}
			<hr />
			{JSON.stringify(title)}
			<hr />
			{JSON.stringify(body)}
		</>
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
