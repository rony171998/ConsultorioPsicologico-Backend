const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');

// Models
const { Paciente } = require('../models/paciente.model');
const { Psicologo } = require('../models/psicologo.model');

// Utils
const { catchAsync } = require('../utils/catchAsync.util');
const { AppError } = require('../utils/appError.util');

dotenv.config({ path: './config.env' });

const protectSession = catchAsync(async (req, res, next) => {
	let token;

	// Extract the token from headers
	if (
		req.headers.authorization &&
		req.headers.authorization.startsWith('Bearer')
	) {
		token = req.headers.authorization.split(' ')[1];
	}

	if (!token) {
		return next(new AppError('Invalid session', 403));
	}

	// Ask JWT (library), if the token is still valid
	const decoded = await jwt.verify(token, process.env.JWT_SECRET);
	// { id, ... }

	// Check in db that user still exists
	const user = await Paciente.findOne({
		where: { id: decoded.id, status: 'active' },
	});

	if (!user) {
		return next(
			new AppError('The owner of this token doesnt exist anymore', 403)
		);
	}

	// Grant access
	req.sessionUser = user;
	next();
});

const protectPacienteAccount = (req, res, next) => {
	// const { id } = req.params -> Alternative
	const { sessionUser, Paciente } = req;

	// If the id's don't match, return error (403)
	if (sessionUser.id !== Paciente.id) {
		return next(new AppError('You do not own this account', 403));
	}

	next();
};

const protectEmpleadoAccount = (req, res, next) => {
	const { sessionUser, Empleado } = req;

	if (sessionUser.id !== Empleado.id) {
		return next(new AppError('You do not own this account', 403));
	}

	next();
};

const protectPsicologoAccount = (req, res, next) => {
	// const { id } = req.params -> Alternative
	const { sessionUser, Psicologo } = req;

	// If the id's don't match, return error (403)
	if (sessionUser.id !== Psicologo.id) {
		return next(new AppError('You do not own this account', 403));
	}

	next();
};

module.exports = { 
	protectSession, 
	protectPacienteAccount ,
	protectEmpleadoAccount,
	protectPsicologoAccount
}; // Export the middleware 
