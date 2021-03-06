import fetch from 'isomorphic-fetch';
import { API } from '../config';

export const createBlog = (blog, token) => {
	return fetch(`${API}/blog`, {
		method: 'POST',
		headers: {
			Accept: 'application/json',
			Authorization: `Bearer ${token}`,
		},
		body: blog,
	})
		.then(response => response.json())
		.catch(err => console.log(err));
};

export const getBlogs = () => {
	return fetch(`${API}/blog/listAllBlogs`, { method: 'GET' })
		.then(response => response.json())
		.catch(err => console.log(err));
};

export const getBlogsCategoriesTags = (limit, skip) => {
	const data = { limit, skip };

	return fetch(`${API}/blog/blogs-categories-tags`, {
		method: 'POST',
		headers: {
			Accept: 'application/json',
			'Content-Type': 'application/json',
		},
		body: JSON.stringify(data),
	})
		.then(response => response.json())
		.catch(err => console.log(err));
};

export const getBlog = slug => {
	return fetch(`${API}/blog/${slug}`, { method: 'GET' })
		.then(response => response.json())
		.catch(err => console.log(err));
};

export const deleteBlog = (slug, token) => {
	return fetch(`${API}/blog/${slug}`, {
		method: 'DELETE',
		headers: {
			Accept: 'application/json',
			'Content-Type': 'application/json',
			Authorization: `Bearer ${token}`,
		},
	})
		.then(response => response.json())
		.catch(err => console.log(err));
};
