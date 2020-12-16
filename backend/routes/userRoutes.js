import express from 'express';
const router = express.Router();
import { signUp } from '../controllers/authController.js';

router.post('/signup', signUp);

export default router;
