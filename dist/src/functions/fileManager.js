"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.removeFile = void 0;
const fs = require("fs");
const Const_1 = require("../utils/Const");
const removeFile = async (fileName) => {
    const filePath = '' + Const_1.UPLOAD_FOLDER + '/' + fileName;
    if (fs.existsSync(filePath)) {
        await fs.unlink(filePath, (err) => {
            if (err)
                console.log(err);
        });
    }
    else {
        return false;
    }
};
exports.removeFile = removeFile;
//# sourceMappingURL=fileManager.js.map