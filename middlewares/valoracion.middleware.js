// Models
const { Valoracion } = require('../models/valoracion.model');

// Utils
const { AppError } = require('../utils/appError.util');
const { catchAsync } = require('../utils/catchAsync.util');

const valoracionExists = catchAsync(async (req, res, next) => {
	const { id } = req.params;

	const valoracion = await Valoracion.findOne({ where: { id ,estado:"active"  }  });

	if (!valoracion) {
		return next(new AppError('Valoracion not found', 404));
	}

	req.valoracion = valoracion;
	next();
});

module.exports = { valoracionExists };
