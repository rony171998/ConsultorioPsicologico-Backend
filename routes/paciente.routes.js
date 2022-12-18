const express = require('express');


const {
	createPaciente,
	login,
	getAllPatients,
	getPacienteById,
	updatePaciente,
	deletePaciente,
	
} = require('../controllers/paciente.controller');


const {
	createPacienteValidators
} = require('../middlewares/validators.middleware');

const { pacienteExists, emailPacienteExists, pacienteIdExists } = require('../middlewares/paciente.middleware');
const {
	protectSession,
	protectPacienteAccount,
} = require('../middlewares/auth.middleware');

const pacienteRouter = express.Router();

pacienteRouter.post('/',  createPacienteValidators, emailPacienteExists, pacienteIdExists , createPaciente);

pacienteRouter.post('/login', login);

pacienteRouter.get('/', getAllPatients);

//pacienteRouter.use(protectSession);

pacienteRouter.get('/:id',pacienteExists, getPacienteById);


pacienteRouter
	.use('/:id', pacienteExists)
	.route('/:id')
	.get(getPacienteById)
	.patch(protectPacienteAccount, updatePaciente)
	.delete(protectPacienteAccount, deletePaciente);

module.exports = { pacienteRouter };
