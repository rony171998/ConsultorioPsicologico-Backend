const { db, DataTypes } = require('../utils/database.util');

module.exports.Paciente = db.define('paciente', {
	
	id: {
		primaryKey: true,
		type: DataTypes.INTEGER,
		autoIncrement: true,
		allowNull: false,
	},
	name: {
		type: DataTypes.STRING,
		allowNull: false,	
	},
	apellidos:{
		type: DataTypes.STRING,
		allowNull: false,
	},
	sexo:{
		type: DataTypes.STRING,
		allowNull: false,
	},
	EPS:{
		type: DataTypes.STRING,
		allowNull: false,
	},
	ocupacion:{
		type: DataTypes.STRING,
		allowNull: false,
	},
	telefono:{
		type: DataTypes.STRING,
		allowNull: false,
	},
	direccion:{
		type: DataTypes.STRING,
		allowNull: false,
	},
	fechaNacimiento:{
		type: DataTypes.DATE,
		allowNull: false,
	},
	TipoDocumento:{
		type: DataTypes.STRING,
		allowNull: false,
	},
	paciente_id: {
		unique: true,
        type: DataTypes.INTEGER,
        allowNull: false,
    },

	email: {
		type: DataTypes.STRING,
		allowNull: false,
		unique: true,
	},
	password: {
		type: DataTypes.STRING,
		allowNull: false,
	},
	status: {
		type: DataTypes.STRING,
		allowNull: false,
		defaultValue: 'active',
	},
	
	
});

