const winston = require('winston');
const moment = require('moment');

logger = {

    create: (id) => {
        return winston.createLogger({
            format: winston.format.combine(
                winston.format.errors({ stack: true }),
                winston.format.json()
            ),
            transports: [
                new winston.transports.File({ filename: 'logs/empresas/' + id + '/' + moment().format("YYYY-MM-DD") +'.txt', level: 'info'}),
            ],
        });

    }
}


module.exports = logger;