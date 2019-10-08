const winston = require('winston');
const winstonDaily = require('winston-daily-rotate-file');

module.exports = winston.createLogger({
	level: 'info',
	showLevel: true,
	format: winston.format.combine(
		winston.format.json(),
		winston.format.timestamp({
			format: 'YYYY-MM-DD HH:mm:ss',
		}),
		winston.format.simple(),
	),
	transports: [
		new winston.transports.File({
			name: 'info-file',
			filename: './logs/All-Log.log',
		}),

		new winstonDaily({
			name: 'info-file',
			filename: './logs/Date/Log_%DATE%.log',
			datePattern: 'YYYY-MM-DD',
		}),
	]
});