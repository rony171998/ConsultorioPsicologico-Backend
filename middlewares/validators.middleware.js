const { body, validationResult, param } = require('express-validator');

const { AppError } = require('../utils/appError.util');

const checkResult = (req, res, next) => {
	const errors = validationResult(req);

	if (!errors.isEmpty()) {
		
		const errorMsgs = errors.array().map(err => err.msg);

		const message = errorMsgs.join('. ');

		return next(new AppError(message, 400));
	}

	next();
};

const createUserValidators = [
	body('name').notEmpty().withMessage('Name cannot be empty'),
	body('email').isEmail().withMessage('Must provide a valid email'),
	body('password')
		.isLength({ min: 8 })
		.withMessage('Password must be at least 8 characters long')
		.isAlphanumeric()
		.withMessage('Password must contain letters and numbers'),
	body('role')
		.notEmpty()
		.withMessage('Role cannot be empty')
		.isIn(['user', 'admin'])
		.withMessage('Role must be either user or admin'),
	checkResult,
];

const createProductValidators = [
	
	body('title').notEmpty().withMessage('Title cannot be empty'),
	body('description').notEmpty().withMessage('Description cannot be empty'),
	body('quantity')
		.notEmpty()
		.withMessage('Quantity cannot be empty')
		.isNumeric()
		.withMessage('Quantity must be a number')
		.isInt({ min: 0 })
		.withMessage('Quantity must be a positive number'),
	body('price')
		.notEmpty()
		.withMessage('Price cannot be empty')
		.isNumeric()
		.withMessage('Price must be a number')
		.isFloat({ gt: 0 })
		.withMessage('Price must be greater than 0'),
	body("categoryId").notEmpty().withMessage('categoryId cannot be empty'),
	checkResult,
	
]
const createproductsinCartValidators = [
	body('productId').notEmpty().withMessage('ProductId cannot be empty'),
	body('quantity')
		.notEmpty()
		.withMessage('Quantity cannot be empty')
		.isNumeric()
		.withMessage('Quantity must be a number')
		.isInt({ min: 0 })
		.withMessage('Quantity must be a positive number'),
	checkResult,
	
]
const createCategoryValidators = [
	body('name').notEmpty().withMessage('Name cannot be empty'),
	checkResult,
]

const createValoracionValidators = [
	body('fecha')
		.notEmpty().withMessage('fecha cannot be empty')
		.isDate().withMessage('fecha must be a date'),
	body("hora").notEmpty().withMessage('hora cannot be empty'),
	body('motivo').notEmpty().withMessage('motivo cannot be empty'),
	checkResult,
]

const createEmpleadoValidators = [
	body('name').notEmpty().withMessage('Name cannot be empty'),
	body('apellidos').notEmpty().withMessage('apellidos cannot be empty'),
	body('email').notEmpty().withMessage('email cannot be empty')
		.isEmail().withMessage('Must provide a valid email'),
	body('password').notEmpty().withMessage('password cannot be empty'),
	checkResult,
]

const createPacienteValidators = [
	body('name').notEmpty().withMessage('Name cannot be empty'),
	body('apellidos').notEmpty().withMessage('apellidos cannot be empty'),
	body('email').notEmpty().withMessage('email cannot be empty')
		.isEmail().withMessage('Must provide a valid email'),
	body('password').notEmpty().withMessage('password cannot be empty'),
	checkResult,
]

const createPsicologoValidators = [
	body('name').notEmpty().withMessage('Name cannot be empty'),
	body('apellidos').notEmpty().withMessage('apellidos cannot be empty'),
	body('email').notEmpty().withMessage('email cannot be empty')
		.isEmail().withMessage('Must provide a valid email'),
	body('password').notEmpty().withMessage('password cannot be empty'),
	checkResult,
]

module.exports = { 
	createUserValidators  , 
	createProductValidators , 
	createproductsinCartValidators , 
	createCategoryValidators,
	createEmpleadoValidators,
	createPacienteValidators,
	createPsicologoValidators,
	createValoracionValidators
};
