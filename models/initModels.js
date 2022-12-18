// Models
const { Paciente } = require('./paciente.model');
const { Psicologo } = require('./psicologo.model');
const { Cita } = require('./cita.model');
const { Valoracion } = require('./valoracion.model');

const initModels = () => {
    
    Paciente.hasMany(Cita, { foreignKey: 'paciente_id' });
    Cita.belongsTo(Paciente, { foreignKey: 'paciente_id' });

    Psicologo.hasMany(Cita, { foreignKey: 'psicologo_id' });
    Cita.belongsTo(Psicologo, { foreignKey: 'psicologo_id' });

    Paciente.hasMany(Valoracion);
    Valoracion.belongsTo(Paciente);

    Psicologo.hasMany(Valoracion);
    Valoracion.belongsTo(Psicologo);
    
};

module.exports={initModels};
