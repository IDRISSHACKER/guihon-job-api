"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ulidToDate = void 0;
const ulidx_1 = require("ulidx");
const timeStampToDate = (timestamp) => {
    const date = new Date(timestamp);
    return date;
};
const ulidToDate = (ulid) => {
    const timeStamp = (0, ulidx_1.decodeTime)(ulid);
    const date = timeStampToDate(timeStamp);
    return date;
};
exports.ulidToDate = ulidToDate;
//# sourceMappingURL=date.js.map