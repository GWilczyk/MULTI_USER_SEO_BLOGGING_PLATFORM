import express from 'express';
import { signIn, signUp } from '../controllers/authController.js';
import { runValidation } from '../middlewares/validation.js';
import {
	userSignInValidator,
	userSignUpValidator,
} from '../middlewares/authValidators.js';

const router = express.Router();

router.post('/signin', userSignInValidator, runValidation, signIn);
router.post('/signup', userSignUpValidator, runValidation, signUp);

export default router;
