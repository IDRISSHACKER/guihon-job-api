"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.generateUniqueFileName = void 0;
const ulid_1 = require("ulid");
const path_1 = require("path");
const Const_1 = require("../utils/Const");
const generateUniqueFileName = (file) => {
    const UNIQUE_ID = (0, ulid_1.ulid)();
    const EXTENSION = (0, path_1.extname)(file);
    return `${Const_1.IDENTIFIER_SUFIX}-${refractorFileName(file.split('.')[0])}-${UNIQUE_ID}${EXTENSION}`;
};
exports.generateUniqueFileName = generateUniqueFileName;
const refractorFileName = (file) => {
    return file.replace(' ', '-');
};
//# sourceMappingURL=fileName.js.map