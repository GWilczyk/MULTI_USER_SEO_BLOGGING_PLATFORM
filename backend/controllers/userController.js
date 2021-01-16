import User from '../models/userModel.js';

export const profileNoHashedPassword = (req, res) => {
	req.profile.hashedPassword = undefined;
	console.log('profileNoHashedPassword: ', req.profile);
	return res.json(req.profile);
};
