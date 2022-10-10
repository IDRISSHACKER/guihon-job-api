"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.logger = void 0;
const winston = require("winston");
const date = require("date-and-time");
const logger = (level, ip, message) => {
    const now = new Date();
    winston.log(level, `[${ip}] [${date.format(now, 'DD/MM/YYYY HH:mm:ss')}] ${message}`);
};
exports.logger = logger;
//# sourceMappingURL=logger.js.map