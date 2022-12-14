"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TOKEN_DURATION = exports.PRIVATE_KEY = exports.DB_ENGINE = exports.DB_PORT = exports.APP_PORT = exports.DB_PASS = exports.DB_USER = exports.DB_NAME = exports.DB_HOST = exports.IDENTIFIER_SUFIX = exports.TMP_FOLDER = exports.UPLOAD_FOLDER = void 0;
const env = require("dotenv");
env.config();
const IDENTIFIER_SUFIX = process.env.APP_PREFIX;
exports.IDENTIFIER_SUFIX = IDENTIFIER_SUFIX;
const UPLOAD_FOLDER = process.env.UPLOAD_FOLDER;
exports.UPLOAD_FOLDER = UPLOAD_FOLDER;
const TMP_FOLDER = 'tmp';
exports.TMP_FOLDER = TMP_FOLDER;
const DB_ENGINE = process.env.DB_ENGINE;
exports.DB_ENGINE = DB_ENGINE;
const DB_HOST = process.env.DB_HOST;
exports.DB_HOST = DB_HOST;
const DB_NAME = process.env.DB_NAME;
exports.DB_NAME = DB_NAME;
const DB_USER = process.env.DB_USERNAME;
exports.DB_USER = DB_USER;
const DB_PASS = process.env.DB_PASS;
exports.DB_PASS = DB_PASS;
const APP_PORT = parseInt(process.env.APP_PORT);
exports.APP_PORT = APP_PORT;
const DB_PORT = parseInt(process.env.DB_PORT);
exports.DB_PORT = DB_PORT;
const PRIVATE_KEY = process.env.PRIVATE_KEY;
exports.PRIVATE_KEY = PRIVATE_KEY;
const TOKEN_DURATION = process.env.TOKEN_DURATION;
exports.TOKEN_DURATION = TOKEN_DURATION;
//# sourceMappingURL=Const.js.map