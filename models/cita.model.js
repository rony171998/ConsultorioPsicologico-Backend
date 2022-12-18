const { db, DataTypes } = require('../utils/database.util');

module.exports.Cita = db.define('cita', {
	
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
    estado: {
        type: DataTypes.STRING,
        allowNull: false,
        defaultValue: 'active',
    },
    paciente_id: {
        foreignkey: true,
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    psicologo_id: {
        foreignkey: true,
        type: DataTypes.INTEGER,
        allowNull: false,
    },
});