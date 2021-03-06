import asyncHandler from 'express-async-handler';
import expressJwt from 'express-jwt';
import generateToken from '../utils/generateToken.js';
import User from '../models/userModel.js';
import shortId from 'shortid';

// Needed to get process.env.JWT_SECRET in requireSignedIn
import dotenv from 'dotenv';
dotenv.config();

export const authMiddleware = (req, res, next) => {
	User.findById({ _id: req.user.id }).exec((err, user) => {
		if (err || !user) {
			return res.status(400).json({ error: 'User not found' });
		}
		req.profile = user;
		next();
	});
};

export const adminMiddleware = (req, res, next) => {
	User.findById({ _id: req.user.id }).exec((err, user) => {
		if (err || !user) {
			return res.status(400).json({ error: 'User not found.' });
		}
		console.log(
			'adminMiddleware:',
			user.role === 1 ? 'Admin User' : 'Regular User'
		);
		if (user.role !== 1) {
			return res.status(400).json({ error: 'Admin resources. Access denied.' });
		}
		req.profile = user;
		next();
	});
};

export const requireSignedIn = expressJwt({
	secret: process.env.JWT_SECRET,
	algorithms: ['HS256'],
});

export const signIn = asyncHandler(async (req, res) => {
	const { email, password } = req.body;

	const user = await User.findOne({ email });

	if (user && (await user.authenticate(password))) {
		const token = generateToken(user._id);
		const { _id, username, name, email, role } = user;

		res.cookie('token', token, {
			expiresIn: `${process.env.JWT_SECRET_EXPIRESIN}`,
		});

		res.json({ token, user: { _id, email, name, role, username } });
	} else {
		res.status(401);
		throw new Error('Invalid Email or Password');
	}
});

export const signOut = asyncHandler(async (req, res) => {
	await res.clearCookie('token');
	res.json({ message: 'You signed out successfully' });
});

export const signUp = asyncHandler(async (req, res) => {
	const { email, name, password } = req.body;
	const userExists = await User.findOne({ email });

	if (userExists) {
		res.status(400);
		throw new Error('User Already Exists');
	}

	const username = shortId.generate();
	const profile = `${process.env.CLIENT_URL}/profile/${username}`;

	const user = await User.create({ name, email, password, profile, username });

	if (user) {
		res.status(201).json({
			message: 'Signed Up Successfully! Please Sign In.',
			// id: user._id,
			// name: user.name,
			// email: user.email,
			// salt: user.salt,
			// hashedPassword: user.hashedPassword,
			// profile: user.profile,
			// username: user.username,
		});
	} else {
		res.status(400);
		throw new Error('Invalid User Data');
	}
});
