const { db, DataTypes } = require('../utils/database.util');

module.exports.Valoracion = db.define('valoracion', {
	
	id: {
		primaryKey: true,
		type: DataTypes.INTEGER,
		autoIncrement: true,
		allowNull: false,
	},
	fecha: {
        type: DataTypes.DATE,
        allowNull: false,
    },
    hora: {
        type: DataTypes.TIME,
        allowNull: false,
    },
    motivo: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    observaciones: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    test:{
        type: DataTypes.STRING,
        allowNull: false,
    },
    analisis:{
        type: DataTypes.STRING,
        allowNull: false,
    },
    diagnostico:{
        type: DataTypes.STRING,
        allowNull: false,
    },
    pronostico:{
        type: DataTypes.STRING,
        allowNull: false,
    },
    recomendaciones:{
        type: DataTypes.STRING,
        allowNull: false,
    },
    status: {
        type: DataTypes.STRING,
        allowNull: false,
        defaultValue: 'activo',
    },
});