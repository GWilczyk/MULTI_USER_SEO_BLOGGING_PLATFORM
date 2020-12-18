import fetch from 'isomorphic-fetch';
import { API } from '../config';

export const signup = async user => {
	const response = await fetch(`${API}/users/signup`, {
		method: 'POST',
		headers: {
			Accept: 'application/json',
			'Content-Type': 'application/json',
		},
		body: JSON.stringify(user),
	});

	const data = await response.json();

	if (response.status >= 400) {
		throw new Error(data.message);
	}

	return data;
};
