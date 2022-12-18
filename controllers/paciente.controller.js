// Models
const { Paciente } = require('../models/paciente.model');

// Utils
const { catchAsync } = require('../utils/catchAsync.util');
const { AppError } = require('../utils/appError.util');

const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');

 //Gen secrets for JWT, require('crypto').randomBytes(64).toString('hex')
dotenv.config({ path: './config.env' });

const createPaciente = catchAsync(async (req, res, next) => {
	const { 
		name,
		apellidos,
		sexo ,
		EPS,
		ocupacion,
		telefono,
		direccion,
		fechaNacimiento,
		TipoDocumento,
		paciente_id,
		email, 
		password 
	} = req.body;

	const salt = await bcrypt.genSalt(12);
	const hashedPassword = await bcrypt.hash(password, salt);

	const newPaciente = await Paciente.create({
		name,
		apellidos,
		sexo ,
		EPS,
		ocupacion,
		telefono,
		direccion,
		fechaNacimiento,
		TipoDocumento,
		paciente_id,
		email,
		password : hashedPassword,
	});

	newPaciente.password = undefined;

	res.status(201).json({
		status: 'success',
		newPaciente,
	});
});


const login = catchAsync(async (req, res, next) => {
	const { email, password } = req.body;

	// Validate credentials (email)
	const paciente = await Paciente.findOne({
		where: {
			email,
			status: 'active',
		},
	});

	if (!paciente) {
		return next(new AppError('Credentials invalid', 400));
	}

	// Validate password
	const isPasswordValid = await bcrypt.compare(password, paciente.password);

	if (!isPasswordValid) {
		return next(new AppError('Credentials invalid', 400));
	}

	// Generate JWT (JsonWebToken) ->
	const token = await jwt.sign({ id: paciente.id }, process.env.JWT_SECRET, {
		expiresIn: '30d',
	});

	// Send response
	res.status(200).json({
		status: 'success',
		token,
	});
});

const getAllPatients = catchAsync(async (req, res, next) => {
	const pacientes = await Paciente.findAll({
		where: {
			status: 'active',
		},
	});

	res.status(200).json({
		status: 'success',
		pacientes,
	});
});

const getPacienteById = catchAsync(async (req, res, next) => {
	const { paciente } = req;

	res.status(200).json({
		status: 'success',
		paciente,
	});
});

const updatePaciente = catchAsync(async (req, res, next) => {
	const { paciente } = req;
	const { 
		name,
		apellidos,
		sexo ,
		EPS,
		ocupacion,
		telefono,
		direccion,
		fechaNacimiento,
		TipoDocumento,
		paciente_id,
		email,  } = req.body;

	await paciente.update({ 
		name,
		apellidos,
		sexo ,
		EPS,
		ocupacion,
		telefono,
		direccion,
		fechaNacimiento,
		TipoDocumento,
		paciente_id,
		email, });

	res.status(200).json({ status: 'success' });
});

const deletePaciente = catchAsync(async (req, res, next) => {
	const { paciente } = req;

	await paciente.update({ status: 'deleted' });

	res.status(200).json({ status: 'success' });
});


module.exports = {
	createPaciente,
	login,
	getAllPatients,
	getPacienteById,
	updatePaciente,
	deletePaciente,
};
