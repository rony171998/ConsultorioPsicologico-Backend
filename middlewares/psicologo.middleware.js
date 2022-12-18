// Models
const { Psicologo } = require('../models/psicologo.model');

// Utils
const { AppError } = require('../utils/appError.util');
const { catchAsync } = require('../utils/catchAsync.util');

const psicologoExists = catchAsync(async (req, res, next) => {
	const { id } = req.params;

	const psicologo = await Psicologo.findOne({ where: { id ,status:"active"  }  });

	if (!psicologo) {
		return next(new AppError('Psicologo not found', 404));
	}

	req.psicologo = psicologo;
	next();
});
const emailPsicologoExists = catchAsync(async (req, res, next) => {
	const { email } = req.body;

	const psicologo = await Psicologo.findOne({ where: { email } });

	if (psicologo) {
		return next(new AppError('Email already exists', 400));
	}

	next();
});
const psicologoIdExists = catchAsync(async (req, res, next) => {
	const { psicologo_id } = req.body;

	const psicologo = await Psicologo.findOne({ where: { psicologo_id ,status:"active"  }  });

	if (psicologo) {
		return next(new AppError('Psicologo ya se encuentra registrado', 404));
	}

	req.psicologo = psicologo;
	next();
});

module.exports = { psicologoExists , emailPsicologoExists , psicologoIdExists };
