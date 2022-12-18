// Models
const { Empleado } = require('../models/empleado.model');

// Utils
const { AppError } = require('../utils/appError.util');
const { catchAsync } = require('../utils/catchAsync.util');

const empleadoExists = catchAsync(async (req, res, next) => {
	const { id } = req.params;

	const empleado = await Empleado.findOne({ where: { id ,status:"active"  }  });

	if (!empleado) {
		return next(new AppError('Empleado not found', 404));
	}

	req.empleado = empleado;
	next();
});

const emailEmpleadoExists = catchAsync(async (req, res, next) => {
	const { email } = req.body;

	const empleado = await Empleado.findOne({ where: { email } });

	if (empleado) {
		return next(new AppError('Email already exists', 400));
	}

	next();
});

module.exports = { empleadoExists ,emailEmpleadoExists };
