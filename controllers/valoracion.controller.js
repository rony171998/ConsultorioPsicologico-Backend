// Models
const { Valoracion } = require("../models/valoracion.model");
const { Paciente } = require("../models/paciente.model");
const { Psicologo } = require("../models/psicologo.model");

// Utils
const { catchAsync } = require("../utils/catchAsync.util");

const createValoracion = catchAsync(async (req, res, next) => {
    const { sessionUser } = req;
    const {
        fecha,
        hora,
        paciente_id,
        motivo,
        observaciones,
        recomendaciones,
        pronostico,
        test,
        analisis,
        diagnostico,
    } = req.body;

    const psicologo = await Psicologo.findOne({
        where: { id: sessionUser.id },
    });

    const paciente = await Paciente.findOne({
        where: { paciente_id: paciente_id },
    });

    const newValoracion = await Valoracion.create({
        fecha,
        hora,
        pacienteId : paciente.id,
        psicologoId : psicologo.id,
        motivo,
        observaciones,
        recomendaciones,
        pronostico,
        test,
        analisis,
        diagnostico,
    });
    
    res.status(200).json({
        status: "success",
        newValoracion,
    });
});

const getAllValoraciones = catchAsync(async (req, res, next) => {
    const valoraciones = await Valoracion.findAll();
    res.status(200).json({
        status: "success",
        valoraciones,
    });
});

const getValoracionById = catchAsync(async (req, res, next) => {
    const { valoracion } = req;

    res.status(200).json({
        status: "success",
        valoracion,
    });
});

const updateValoracion = catchAsync(async (req, res, next) => {
    const { valoracion } = req;
    const {
        fecha,
        hora,
        idPaciente,
        idPsicologo,
        motivo,
        observaciones,
        recomendaciones,
        pronostico,
        test,
        analisis,
        diagnostico,
    } = req.body;

    await valoracion.update({
        fecha,
        hora,
        idPaciente,
        idPsicologo,
        motivo,
        observaciones,
        recomendaciones,
        pronostico,
        test,
        analisis,
        diagnostico,
    });

    res.status(200).json({ status: "success" });
});

const deleteValoracion = catchAsync(async (req, res, next) => {
    const { valoracion } = req;

    await valoracion.update({ status: "deleted" });

    res.status(200).json({ status: "success" });
});

module.exports = {
    createValoracion,
    getAllValoraciones,
    getValoracionById,
    updateValoracion,
    deleteValoracion,
};
