import fetch from 'isomorphic-fetch';
import { API } from '../config';

export const signin = user => {
	return fetch(`${API}/users/signin`, {
		method: 'POST',
		headers: {
			Accept: 'application/json',
			'Content-Type': 'application/json',
		},
		body: JSON.stringify(user),
	})
		.then(response => response.json())
		.catch(err => console.log(err));
};

export const signup = user => {
	return fetch(`${API}/users/signup`, {
		method: 'POST',
		headers: {
			Accept: 'application/json',
			'Content-Type': 'application/json',
		},
		body: JSON.stringify(user),
	})
		.then(response => response.json())
		.catch(err => console.log(err));
};
