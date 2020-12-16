import asyncHandler from 'express-async-handler';
import expressJwt from 'express-jwt';
import generateToken from '../utils/generateToken.js';
import User from '../models/usersModel.js';
import shortId from 'shortid';

export const signIn = asyncHandler(async (req, res) => {
	const { email, password } = req.body;

	const user = await User.findOne({ email });

	if (user && (await user.authenticate(password))) {
		const token = generateToken(user._id);
		const { _id, username, name, email, role } = user;

		res.cookie('token', token, {
			expiresIn: `${process.env.JWT_SECRET_EXPIRESIN}`,
		});

		return res.json({ token, _id, username, name, email, role });
	} else {
		res.status(401);
		throw new Error('Invalid Email or Password');
	}
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
		console.log('user: ', user);
		res.status(201).json({
			message: 'SignUp Successfull! Please signin.',
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
