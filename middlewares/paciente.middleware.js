// Models
const { Paciente } = require('../models/paciente.model');

// Utils
const { AppError } = require('../utils/appError.util');
const { catchAsync } = require('../utils/catchAsync.util');

const pacienteExists = catchAsync(async (req, res, next) => {
	const { id } = req.params;

	const paciente = await Paciente.findOne({ where: { id ,status:"active"  }  });

	if (!paciente) {
		return next(new AppError('Paciente not found', 404));
	}

	req.paciente = paciente;
	next();
});
const emailPacienteExists = catchAsync(async (req, res, next) => {
	const { email } = req.body;

	const paciente = await Paciente.findOne({ where: { email } });

	if (paciente) {
		return next(new AppError('Email already exists', 400));
	}

	next();
});
const pacienteIdExists = catchAsync(async (req, res, next) => {
	const { paciente_id } = req.body;

	const paciente = await Paciente.findOne({ where: { paciente_id ,status:"active"  }  });

	if (paciente) {
		return next(new AppError('Paciente ya se encuentra registrado', 404));
	}

	req.paciente = paciente;
	next();
});

module.exports = { pacienteExists ,emailPacienteExists ,pacienteIdExists };
