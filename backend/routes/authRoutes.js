import express from 'express';
import {
	adminMiddleware,
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

// For Testing
router.get('/secret', requireSignedIn, adminMiddleware, (req, res) => {
	res.json({ user: req.user });
});

export default router;
