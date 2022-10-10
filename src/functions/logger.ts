import winston = require('winston');
import date = require('date-and-time');

export const logger = (level: string, ip: string, message: string) => {
  const now = new Date();

  winston.log(
    level,
    `[${ip}] [${date.format(now, 'DD/MM/YYYY HH:mm:ss')}] ${message}`,
  );
};
