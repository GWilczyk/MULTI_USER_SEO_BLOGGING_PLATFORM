import fetch from 'isomorphic-fetch';
import { API } from '../config';

export const signup = async user => {
	try {
		const res = await fetch(`${API}/users/signup`, {
			method: 'POST',
			headers: {
				Accept: 'application/json',
				'Content-Type': 'application/json',
			},
			body: JSON.stringify(user),
		});

		return res.json();
	} catch (error) {
		console.error(error);
	}
};
