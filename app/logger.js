var config = require('./config.json')
config = config;

const winston = require('winston');
const logger = winston.createLogger({
	level: 'info',
	format: winston.format.json(),
	transports: [
		//
		// - Write to all logs with level `info` and below to `combined.log` 
		// - Write all logs error (and below) to `error.log`.
		//
		new winston.transports.File({ filename: config.logs.errors, level: 'error' }),
		new winston.transports.File({ filename: config.logs.all })
	]
});
if (config.env !== 'production') {
	logger.add(new winston.transports.Console({
	   format: winston.format.simple()
	}));
}

module.exports = logger;