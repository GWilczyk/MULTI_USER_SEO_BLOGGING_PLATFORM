import { check } from 'express-validator';

export const categoryCreateValidator = [
	check('name').not().isEmpty().withMessage('Category name is required'),
];
