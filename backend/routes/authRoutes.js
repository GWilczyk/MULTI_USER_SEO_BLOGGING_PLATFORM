import express from 'express';
import {
	requireSignedIn,
	signIn,
	signOut,
	signUp,
} from '../controllers/authController.js';
import { runValidation } from '../middlewares/validation.js';
import {
	userSignInValidator,
	userSignUpValidator,
} from '../middlewares/authValidators.js';

const router = express.Router();

router.post('/signin', userSignInValidator, runValidation, signIn);
router.post('/signup', userSignUpValidator, runValidation, signUp);
router.get('/signout', signOut);

router.get('/secret', requireSignedIn, (req, res) => {
	console.log('SECRET: ', process.env.JWT_SECRET);
	res.json({
		message: 'you have access to secret page!',
	});
});

export default router;
