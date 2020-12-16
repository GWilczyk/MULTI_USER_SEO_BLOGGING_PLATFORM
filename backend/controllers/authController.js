import User from '../models/usersModel.js';
import crypto from 'crypto';

export const signUp = async (req, res) => {
	const { name, email, password } = req.body;
	res.status(201).json({
		user: { name, email, password },
	});
};
