const express = require('express');


const {
	createPsicologo,
	login,
	getAllPsicologos,
	getPsicologoById,
	updatePsicologo,
	deletePsicologo,
	
} = require('../controllers/psicologo.controller');


const {
	createPsicologoValidators
} = require('../middlewares/validators.middleware');

const { psicologoExists, emailPsicologoExists, psicologoIdExists } = require('../middlewares/psicologo.middleware');
const {
	protectSession,
	protectPsicologoAccount,
} = require('../middlewares/auth.middleware');

const psicologoRouter = express.Router();

psicologoRouter.post('/', createPsicologoValidators , emailPsicologoExists , psicologoIdExists, createPsicologo);

psicologoRouter.post('/login', login);

psicologoRouter.get('/', getAllPsicologos);

psicologoRouter.use(protectSession);

psicologoRouter.get('/:id',psicologoExists, getPsicologoById);


psicologoRouter
	.use('/:id', psicologoExists)
	.route('/:id')
	.get(getPsicologoById)
	.patch(protectPsicologoAccount, updatePsicologo)
	.delete(protectPsicologoAccount, deletePsicologo);

module.exports = { psicologoRouter };
