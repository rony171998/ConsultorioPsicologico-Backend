const express = require('express');
const rateLimit = require('express-rate-limit');
const helmet = require('helmet');
const compression = require('compression');
const morgan = require('morgan');
const path = require('path');
const join = require('path').join;
const cors = require('cors');

const { psicologoRouter } = require('./routes/psicologo.routes');
const { pacienteRouter } = require('./routes/paciente.routes');
const { citaRouter } = require('./routes/cita.routes');
const { valoracionRouter } = require('./routes/valoracion.routes');
const { empleadoRouter } = require('./routes/empleado.routes');

// Global err controller
const { globalErrorHandler } = require('./controllers/error.controller');

// Utils
const { AppError } = require('./utils/appError.util');

const app = express();

app.use(express.json())

app.use(express.static(join(__dirname, '../client/build'))); // Serve static files

// Limit the number of requests that can be accepted to our server
const limiter = rateLimit({
	max: 10000,
	windowMs: 60 * 60 * 1000, // 1 hr
	message: 'Number of requests have been exceeded',
});

app.use(limiter);

// Add security headers
app.use(helmet());

// Compress responses
app.use(compression());

if (process.env.NODE_ENV === 'development') {
	app.use(morgan('dev'));
}else{
	app.use(morgan('tiny'));
}
// Enable CORS
app.use(cors());

app.use("/api/v1/empleado", empleadoRouter);
app.use('/api/v1/psicologo', psicologoRouter);
app.use('/api/v1/paciente', pacienteRouter);
app.use('/api/v1/cita', citaRouter);
app.use('/api/v1/valoracion', valoracionRouter);

//Handle incoming unknown routes to the server
app.all('*', (req, res, next) => {
	next(
		new AppError(
			`${req.method} ${req.originalUrl} not found in this server`,
			404
		)
	);
});

app.use(globalErrorHandler);

module.exports = { app };