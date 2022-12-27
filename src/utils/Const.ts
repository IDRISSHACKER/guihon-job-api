import env = require('dotenv');
env.config();
const IDENTIFIER_SUFIX = process.env.APP_PREFIX;
const UPLOAD_FOLDER = process.env.UPLOAD_FOLDER;
const TMP_FOLDER = 'tmp';
const DB_ENGINE: any = process.env.DB_ENGINE;
const DB_HOST = process.env.DB_HOST;
const DB_NAME = process.env.DB_NAME;
const DB_USER = process.env.DB_USERNAME;
const DB_PASS = process.env.DB_PASS;
const APP_PORT = parseInt(process.env.APP_PORT);
const DB_PORT = parseInt(process.env.DB_PORT);
const PRIVATE_KEY = process.env.PRIVATE_KEY;

export {
  UPLOAD_FOLDER,
  TMP_FOLDER,
  IDENTIFIER_SUFIX,
  DB_HOST,
  DB_NAME,
  DB_USER,
  DB_PASS,
  APP_PORT,
  DB_PORT,
  DB_ENGINE,
  PRIVATE_KEY,
};
