import winston from 'winston';
import { config } from '../config';

const logger = winston.createLogger({
  level: config.logging.level,
  format: winston.format.combine(
    winston.format.timestamp(),
    winston.format.errors({ stack: true }),
    winston.format.json()
  ),
  defaultMeta: { service: 'connectx-api' },
  transports: [
    new winston.transports.File({ 
      filename: `${config.logging.dir}/error.log`, 
      level: 'error' 
    }),
    new winston.transports.File({ 
      filename: `${config.logging.dir}/combined.log` 
    })
  ]
});

if (config.env !== 'production') {
  logger.add(new winston.transports.Console({
    format: winston.format.combine(
      winston.format.colorize(),
      winston.format.simple()
    )
  }));
}

export default logger;

