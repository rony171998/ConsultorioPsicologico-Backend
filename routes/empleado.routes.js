const express = require('express');

const {
	createEmpleado,
	login,
	getAllEmpleados,
	getEmpleadoById,
	updateEmpleado,
	deleteEmpleado,
	
} = require('../controllers/empleado.controller');


const {
	createEmpleadoValidators,
} = require('../middlewares/validators.middleware');

const { empleadoExists , emailEmpleadoExists } = require('../middlewares/empleado.middleware');
const {
	protectSession,
	protectEmpleadoAccount,
} = require('../middlewares/auth.middleware');

const empleadoRouter = express.Router();

empleadoRouter.post('/', emailEmpleadoExists , createEmpleadoValidators ,  createEmpleado);

empleadoRouter.post('/login', login);

empleadoRouter.get('/', getAllEmpleados);

//empleadoRouter.use(protectSession);

empleadoRouter.get('/:id',empleadoExists, getEmpleadoById);

empleadoRouter
	.use('/:id', empleadoExists)
	.route('/:id')
	.get(getEmpleadoById)
	.patch(protectEmpleadoAccount, updateEmpleado)
	.delete(protectEmpleadoAccount, deleteEmpleado);

module.exports = { empleadoRouter };
