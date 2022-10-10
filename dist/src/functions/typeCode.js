"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createTypeCode = void 0;
const fs_1 = require("fs");
const Const_1 = require("../utils/Const");
const createTypeCode = (typeCode) => {
    const folderName = Const_1.UPLOAD_FOLDER + '+' + typeCode;
    if (!fs_1.default.existsSync(folderName)) {
        fs_1.default.mkdirSync(folderName);
    }
};
exports.createTypeCode = createTypeCode;
//# sourceMappingURL=typeCode.js.map