// Models
const { Empleado } = require('../models/empleado.model');

// Utils
const { catchAsync } = require('../utils/catchAsync.util');
const { AppError } = require('../utils/appError.util');

const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');

 //Gen secrets for JWT, require('crypto').randomBytes(64).toString('hex')
dotenv.config({ path: './config.env' });

const createEmpleado = catchAsync(async (req, res, next) => {
	const { name,apellidos, email, password } = req.body;

	const salt = await bcrypt.genSalt(12);
	const hashedPassword = await bcrypt.hash(password, salt);

	const newEmpleado = await Empleado.create({
		name,
		apellidos,
		email,
		password : hashedPassword,
	});

	newEmpleado.password = undefined;

	res.status(201).json({
		status: 'success',
		newEmpleado,
	});
});


const login = catchAsync(async (req, res, next) => {
	const { email, password } = req.body;

	// Validate credentials (email)
	const empleado = await Empleado.findOne({
		where: {
			email,
			status: 'active',
		},
	});

	if (!empleado) {
		return next(new AppError('Credentials invalid', 400));
	}

	// Validate password
	const isPasswordValid = await bcrypt.compare(password, empleado.password);

	if (!isPasswordValid) {
		return next(new AppError('Credentials invalid', 400));
	}

	// Generate JWT (JsonWebToken) ->
	const token = await jwt.sign({ id: empleado.id }, process.env.JWT_SECRET, {
		expiresIn: '30d',
	});

	// Send response
	res.status(200).json({
		status: 'success',
		token,
	});
});

const getEmpleadoById = catchAsync(async (req, res, next) => {
	const { empleado } = req;

	res.status(200).json({
		status: 'success',
		empleado,
	});
});

const getAllEmpleados = catchAsync(async (req, res, next) => {
	const empleados = await Empleado.findAll({
		where: {
			status: 'active',
		},
	});

	res.status(200).json({
		status: 'success',
		empleados,
	});
});

const updateEmpleado = catchAsync(async (req, res, next) => {
	const { empleado } = req;
	const { name ,apellidos, email } = req.body;

	await empleado.update({ name,apellidos, email });

	res.status(200).json({ status: 'success' });
});

const deleteEmpleado = catchAsync(async (req, res, next) => {
	const { empleado } = req;

	await empleado.update({ status: 'deleted' });

	res.status(200).json({ status: 'success' });
});


module.exports = {
	createEmpleado,
	login,
	getEmpleadoById,
	getAllEmpleados,
	updateEmpleado,
	deleteEmpleado,
};
