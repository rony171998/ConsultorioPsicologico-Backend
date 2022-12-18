const express = require('express');

const {
	createCita,
	createMeCita,
	getAllCitas,
	getMyCitas,
	getMyCitasPsicologo,
	getCitaById,
	updateCita,
	deleteCita,
	
} = require('../controllers/cita.controller');
const {
	protectSession,
} = require('../middlewares/auth.middleware');
const { citaExists } = require('../middlewares/cita.middleware');

const citaRouter = express.Router();

citaRouter.post('/', createCita);

citaRouter.get('/', getAllCitas);

citaRouter.use(protectSession);

citaRouter.get('/me', getMyCitas);

citaRouter.get('/me/psicologo', getMyCitasPsicologo);

citaRouter.post('/me', createMeCita);

citaRouter
	.use('/:id' , citaExists)
	.route('/:id')
	.get(getCitaById)
	.patch( updateCita)
	.delete( deleteCita);

module.exports = { citaRouter };
