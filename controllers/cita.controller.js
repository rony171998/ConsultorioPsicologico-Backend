// Models
const { Cita } = require('../models/cita.model');
const { Paciente } = require('../models/paciente.model');
const { Psicologo } = require('../models/psicologo.model');

// Utils
const { catchAsync } = require('../utils/catchAsync.util');

const createCita = catchAsync(async (req, res, next) => {
	const { 
		fecha,
		hora,
		paciente_id,
		psicologo_id,
		motivo,
	} = req.body;

	const newCita = await Cita.create({
		fecha,
		hora,
		paciente_id,
		psicologo_id,
		motivo,
	});

	res.status(201).json({
		status: 'success',
		newCita,
	});
});

const createMeCita = catchAsync(async (req, res, next) => {
	const {
		fecha,
		hora,
		motivo,
		psicologo_id,
	} = req.body;
	const { sessionUser } = req;

	const newCita = await Cita.create({
		fecha,
		hora,
		paciente_id: sessionUser.id,
		psicologo_id,
		motivo,
	});

	res.status(201).json({
		status: 'success',
		newCita,
	});
});

const getCitaById = catchAsync(async (req, res, next) => {
	const { cita } = req;

	res.status(200).json({
		status: 'success',
		cita,
	});
});

const getMyCitas = catchAsync(async (req, res, next) => {
	const { sessionUser } = req;

	const citas = await Cita.findAll({
		where: {
			paciente_id: sessionUser.id,
		},
		include: [
			{
				model: Psicologo,
				attributes: ['name', 'apellidos'],
			},
		],

	});

	res.status(200).json({
		status: 'success',
		citas,
	});
});

const getMyCitasPsicologo = catchAsync(async (req, res, next) => {
	const { sessionUser } = req;

	const citas = await Cita.findAll({
		where: {
			psicologo_id: sessionUser.id,
		},
		include: [
			{
				model: Psicologo,
				attributes: ['name', 'apellidos'],
			},
		],

	});

	res.status(200).json({
		status: 'success',
		citas,
	});
});

const getAllCitas = catchAsync(async (req, res, next) => {
	const citas = await Cita.findAll({
		include: [
			{
				model: Paciente,
				as: 'paciente',
				attributes: [ "id",'name', 'apellidos'],
			},
			{
				model: Psicologo,
				as: 'psicologo',
				attributes: ["id",'name', 'apellidos'],
			},
		],
	});

	res.status(200).json({
		status: 'success',
		citas,
	});
});

const updateCita = catchAsync(async (req, res, next) => {
	const { cita } = req;
	const { 
		fecha,
		hora,
		paciente_id,
		psicologo_id,
		motivo,  } = req.body;

	await cita.update({ 
		fecha,
		hora,
		paciente_id,
		psicologo_id,
		motivo, 
	});

	res.status(200).json({ status: 'success' });
});

const deleteCita = catchAsync(async (req, res, next) => {
	const { cita } = req;

	await cita.update({ status: 'deleted' });

	res.status(200).json({ status: 'success' });
});


module.exports = {
	createCita,
	createMeCita,
	getAllCitas,
	getMyCitas,
	getMyCitasPsicologo,
	getCitaById,
	updateCita,
	deleteCita,
};
