import express from 'express';
const router = express.Router();
import { time } from '../controllers/blogController.js';

router.route('/').get(time);

export default router;
