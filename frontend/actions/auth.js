import fetch from 'isomorphic-fetch';
import Cookies from 'js-cookie';

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

// COOKIES
export const getCookie = key => {
	if (process.browser) {
		Cookies.get(key);
	}
};

export const removeCookie = key => {
	if (process.browser) {
		Cookies.remove(key, { expires: 1 });
	}
};

export const setCookie = (key, value) => {
	if (process.browser) {
		Cookies.set(key, value, { expires: 1 });
	}
};

// LOCALSTORAGE
export const setLocalStorage = (key, value) => {
	if (process.browser) {
		localStorage.setItem(key, JSON.stringify(value));
	}
};

export const removeLocalStorage = key => {
	if (process.browser) {
		localStorage.removeItem(key);
	}
};

// AUTHENTICATION
export const authenticate = (data, next) => {
	setCookie('token', data.token);
	const { _id, username, name, email, role } = data;
	// const user = { _id, username, name, email, role };
	setLocalStorage('user', { _id, username, name, email, role });
	next();
};

export const isAuth = () => {
	if (process.browser) {
		const cookieChecked = getCookie('token');
		if (cookieChecked) {
			if (localStorage.getItem('user')) {
				return JSON.parse(localStorage.getItem('user'));
			} else {
				return false;
			}
		}
	}
};
