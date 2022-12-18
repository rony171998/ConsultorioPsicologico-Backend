// Models
const { Psicologo } = require('../models/psicologo.model');

// Utils
const { catchAsync } = require('../utils/catchAsync.util');
const { AppError } = require('../utils/appError.util');

const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');

 //Gen secrets for JWT, require('crypto').randomBytes(64).toString('hex')
dotenv.config({ path: './config.env' });

const createPsicologo = catchAsync(async (req, res, next) => {
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
		psicologo_id,
		email, 
		password,
		universidad,
		fechaEstudio,
		areaPsicologica,
		areaEspecializacion,
		mesesExperiencia,
	} = req.body;

	const salt = await bcrypt.genSalt(12);
	const hashedPassword = await bcrypt.hash(password, salt);

	const newPsicologo = await Psicologo.create({
		name,
		apellidos,
		sexo ,
		EPS,
		ocupacion,
		telefono,
		direccion,
		fechaNacimiento,
		TipoDocumento,
		psicologo_id,
		email,
		password : hashedPassword,
		universidad,
		fechaEstudio,
		areaPsicologica,
		areaEspecializacion,
		mesesExperiencia,
	});

	newPsicologo.password = undefined;

	res.status(201).json({
		status: 'success',
		newPsicologo,
	});
});


const login = catchAsync(async (req, res, next) => {
	const { email, password } = req.body;

	// Validate credentials (email)
	const psicologo = await Psicologo.findOne({
		where: {
			email,
			status: 'active',
		},
	});

	if (!psicologo) {
		return next(new AppError('Credentials invalid', 400));
	}

	// Validate password
	const isPasswordValid = await bcrypt.compare(password, psicologo.password);

	if (!isPasswordValid) {
		return next(new AppError('Credentials invalid', 400));
	}

	// Generate JWT (JsonWebToken) ->
	const token = await jwt.sign({ id: psicologo.id }, process.env.JWT_SECRET, {
		expiresIn: '30d',
	});

	// Send response
	res.status(200).json({
		status: 'success',
		token,
	});
});

const getAllPsicologos = catchAsync(async (req, res, next) => {
	const psicologos = await Psicologo.findAll({
		where: {
			status: 'active',
		},
	});

	res.status(200).json({
		status: 'success',
		psicologos,
	});
});

const getPsicologoById = catchAsync(async (req, res, next) => {
	const { psicologo } = req;

	res.status(200).json({
		status: 'success',
		psicologo,
	});
});

const updatePsicologo = catchAsync(async (req, res, next) => {
	const { psicologo } = req;
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
		psicologo_id,
		email,
		universidad,
		fechaEstudios,
		areaPsicologica,
		areaEspecializacion,
		mesesExperiencia,  } = req.body;

	await psicologo.update({ 
		name,
		apellidos,
		sexo ,
		EPS,
		ocupacion,
		telefono,
		direccion,
		fechaNacimiento,
		TipoDocumento,
		psicologo_id,
		email,
		universidad,
		fechaEstudios,
		areaPsicologica,
		areaEspecializacion,
		mesesExperiencia, });

	res.status(200).json({ status: 'success' });
});

const deletePsicologo = catchAsync(async (req, res, next) => {
	const { psicologo } = req;

	await psicologo.update({ status: 'deleted' });

	res.status(200).json({ status: 'success' });
});


module.exports = {
	createPsicologo,
	login,
	getAllPsicologos,
	getPsicologoById,
	updatePsicologo,
	deletePsicologo,
};
