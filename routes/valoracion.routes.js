const express = require('express');


const {
	createValoracion,
	getAllValoraciones,
	getValoracionById,
	updateValoracion,
	deleteValoracion,
	
} = require('../controllers/valoracion.controller');


const {
	createValoracionValidators
} = require('../middlewares/validators.middleware');

const {
	protectSession,
	protectPsicologoAccount,
} = require('../middlewares/auth.middleware');

const { valoracionExists } = require('../middlewares/valoracion.middleware');

const valoracionRouter = express.Router();

valoracionRouter.get('/', getAllValoraciones);

valoracionRouter.use(protectSession);

valoracionRouter.post('/', createValoracion);

valoracionRouter.get('/:id',valoracionExists, getValoracionById);

valoracionRouter
	.use('/:id', valoracionExists)
	.route('/:id')
	.get(getValoracionById)
	.patch(updateValoracion)
	.delete(deleteValoracion);

module.exports = { valoracionRouter };
