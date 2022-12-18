const { db, DataTypes } = require('../utils/database.util');

module.exports.Psicologo = db.define('psicologo', {
	
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
	psicologo_id: {
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
	fechaEstudio:{
		type: DataTypes.DATE,
		allowNull: false,
	},
	universidad:{
		type: DataTypes.STRING,
		allowNull: false,
	},
	areaPsicologica:{
		type: DataTypes.STRING,
		allowNull: false,
	},
	areaEspecializacion:{
		type: DataTypes.STRING,
		allowNull: false,
	},
	mesesExperiencia:{
		type: DataTypes.INTEGER,
		allowNull: false,
	},
	status: {
		type: DataTypes.STRING,
		allowNull: false,
		defaultValue: 'active',
	},
	
	
});

