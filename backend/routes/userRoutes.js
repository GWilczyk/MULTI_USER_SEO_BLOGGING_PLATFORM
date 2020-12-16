import express from 'express';
import { signUp } from '../controllers/authController.js';
import { runValidation } from '../validators/validation.js';
import { userSignupValidator } from '../validators/authValidators.js';

const router = express.Router();

router.post('/signup', userSignupValidator, runValidation, signUp);

export default router;
