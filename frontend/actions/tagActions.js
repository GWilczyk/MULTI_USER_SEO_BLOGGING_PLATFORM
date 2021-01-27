import fetch from 'isomorphic-fetch';
import { API } from '../config';

export const createTag = (tag, token) => {
	return fetch(`${API}/tag`, {
		method: 'POST',
		headers: {
			Accept: 'application/json',
			'Content-Type': 'application/json',
			Authorization: `Bearer ${token}`,
		},
		body: JSON.stringify(tag),
	})
		.then(response => response.json())
		.catch(err => console.log(err));
};

export const getTags = () => {
	return fetch(`${API}/tag/tags`, { method: 'GET' })
		.then(response => response.json())
		.catch(err => console.log(err));
};

export const getTag = slug => {
	return fetch(`${API}/tag/${slug}`, { method: 'GET' })
		.then(response => response.json())
		.catch(err => console.log(err));
};

export const deleteTag = (slug, token) => {
	return fetch(`${API}/tag/${slug}`, {
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
