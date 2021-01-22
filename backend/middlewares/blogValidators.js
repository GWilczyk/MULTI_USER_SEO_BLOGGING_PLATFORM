import { check } from 'express-validator';

export const blogCreateValidator = [
	check('title').not().isEmpty().withMessage("Blog's title is required"),
];
