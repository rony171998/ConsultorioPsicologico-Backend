// Models
const { Cita } = require('../models/cita.model');

// Utils
const { AppError } = require('../utils/appError.util');
const { catchAsync } = require('../utils/catchAsync.util');

const citaExists = catchAsync(async (req, res, next) => {
	const { id } = req.params;

	const cita = await Cita.findOne({ where: { id ,estado:"active"  }  });

	if (!cita) {
		return next(new AppError('Cita not found', 404));
	}

	req.cita = cita;
	next();
});

module.exports = { citaExists };
