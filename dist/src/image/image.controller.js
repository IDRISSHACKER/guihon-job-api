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
exports.ImageController = void 0;
const common_1 = require("@nestjs/common");
const image_service_1 = require("./image.service");
const image_entity_1 = require("./entities/image.entity");
const platform_express_1 = require("@nestjs/platform-express");
const multer_1 = require("multer");
const Const_1 = require("../utils/Const");
const fileName_1 = require("../functions/fileName");
const path = require('path');
const mine = require("mime-types");
const path_1 = require("path");
const fs_1 = require("fs");
let ImageController = class ImageController {
    constructor(imageService) {
        this.imageService = imageService;
    }
    async handleRequestAllSekers() {
        return await this.imageService.findAll();
    }
    async index(image, res) {
        const rootToFile = path.join(Const_1.UPLOAD_FOLDER, image);
        const finalFilePath = (0, path_1.join)(process.cwd(), rootToFile);
        if (!image) {
            throw new common_1.HttpException({
                status: common_1.HttpStatus.FAILED_DEPENDENCY,
                error: 'image ID not provided',
            }, common_1.HttpStatus.FAILED_DEPENDENCY);
        }
        res.set({
            'Content-Type': mine.contentType(rootToFile),
        });
        const streamable = (0, fs_1.createReadStream)(finalFilePath);
        return new common_1.StreamableFile(streamable);
    }
    async handleDeleteFile(param) {
        const clientId = param.id;
        const deletedResult = await this.imageService.remove(clientId);
        if (deletedResult.affected < 1) {
            throw new common_1.HttpException({
                status: common_1.HttpStatus.NOT_FOUND,
                error: 'The image you are trying to delete does not exist',
            }, common_1.HttpStatus.NOT_FOUND);
        }
        throw new common_1.HttpException({
            status: common_1.HttpStatus.ACCEPTED,
            message: 'The image was successfully deleted',
        }, common_1.HttpStatus.ACCEPTED);
    }
    async handleUploadFile(file, req, param) {
        console.log(param);
        if (!file) {
            throw new common_1.HttpException({
                status: common_1.HttpStatus.FORBIDDEN,
                error: 'You did not provide any files',
            }, common_1.HttpStatus.FORBIDDEN);
        }
        const img = {
            path: file.filename,
            clientId: param.clientId,
        };
        return this.imageService.SetImage(img);
    }
};
__decorate([
    (0, common_1.Get)('/'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], ImageController.prototype, "handleRequestAllSekers", null);
__decorate([
    (0, common_1.Get)('/:image'),
    __param(0, (0, common_1.Param)('image')),
    __param(1, (0, common_1.Res)({ passthrough: true })),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], ImageController.prototype, "index", null);
__decorate([
    (0, common_1.Delete)('/:id'),
    __param(0, (0, common_1.Param)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], ImageController.prototype, "handleDeleteFile", null);
__decorate([
    (0, common_1.Post)('/:clientId'),
    (0, common_1.UseInterceptors)((0, platform_express_1.FileInterceptor)('file', {
        storage: (0, multer_1.diskStorage)({
            destination: Const_1.UPLOAD_FOLDER,
            filename(req, file, callback) {
                callback(null, (0, fileName_1.generateUniqueFileName)(file.originalname));
            },
        }),
    })),
    __param(0, (0, common_1.UploadedFile)()),
    __param(1, (0, common_1.Req)()),
    __param(2, (0, common_1.Param)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object, image_entity_1.Image]),
    __metadata("design:returntype", Promise)
], ImageController.prototype, "handleUploadFile", null);
ImageController = __decorate([
    (0, common_1.Controller)('image'),
    __metadata("design:paramtypes", [image_service_1.ImageService])
], ImageController);
exports.ImageController = ImageController;
//# sourceMappingURL=image.controller.js.map