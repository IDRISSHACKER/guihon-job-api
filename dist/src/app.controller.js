"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppController = void 0;
const common_1 = require("@nestjs/common");
const app_service_1 = require("./app.service");
const fs = require("fs");
const path = require("path");
const mine = require("mime-types");
const path_1 = require("path");
const fs_1 = require("fs");
const util_1 = require("util");
const logger_1 = require("./functions/logger");
const Const_1 = require("./utils/Const");
let AppController = class AppController {
    constructor(appService) {
        this.appService = appService;
    }
    getWelcome() {
        return this.appService.welcomeToCinafFile();
    }
    async handleStreamFile(param, res, header, ip, next) {
        const rootToFile = path.join(Const_1.UPLOAD_FOLDER, param.filePath);
        if (!fs.existsSync(rootToFile)) {
            (0, logger_1.logger)('error', ip, rootToFile);
            throw new common_1.HttpException({
                status: common_1.HttpStatus.NOT_FOUND,
                error: `${param.filePath} not found on this server`,
            }, common_1.HttpStatus.NOT_FOUND);
        }
        (0, logger_1.logger)('info', ip, rootToFile);
        const finalFilePath = (0, path_1.join)(process.cwd(), rootToFile);
        const range = header.range;
        if (!range) {
            res.set({
                'Content-Type': mine.contentType(rootToFile),
            });
            const streamable = (0, fs_1.createReadStream)(finalFilePath);
            return new common_1.StreamableFile(streamable);
        }
        res.set({
            'Content-Type': mine.contentType(rootToFile),
        });
        const infos = await (0, util_1.promisify)(fs_1.stat)(finalFilePath);
        const parts = range.replace('bytes=', '').split('-');
        const start = parseInt(parts[0], 10);
        const end = parts[1] ? parseInt(parts[1], 10) : infos.size - 1;
        res.set({
            'Content-Range': `bytes ${start}-${end}/${infos.size}`,
            'Accept-Ranges': `bytes`,
            'Content-Length': end - start + 1,
        });
        res.status(206);
        const file = (0, fs_1.createReadStream)(finalFilePath, { start, end });
        return new common_1.StreamableFile(file);
    }
};
__decorate([
    (0, common_1.Get)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", String)
], AppController.prototype, "getWelcome", null);
__decorate([
    (0, common_1.Get)('file/:filePath'),
    __param(0, (0, common_1.Param)()),
    __param(1, (0, common_1.Res)({ passthrough: true })),
    __param(2, (0, common_1.Headers)()),
    __param(3, (0, common_1.Ip)()),
    __param(4, (0, common_1.Next)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object, Object, Object, Function]),
    __metadata("design:returntype", Promise)
], AppController.prototype, "handleStreamFile", null);
AppController = __decorate([
    (0, common_1.Controller)(),
    __metadata("design:paramtypes", [app_service_1.AppService])
], AppController);
exports.AppController = AppController;
//# sourceMappingURL=app.controller.js.map