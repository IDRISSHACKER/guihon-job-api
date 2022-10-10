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
exports.SeekerController = void 0;
const common_1 = require("@nestjs/common");
const platform_express_1 = require("@nestjs/platform-express");
const multer_1 = require("multer");
const Const_1 = require("../utils/Const");
const seeker_service_1 = require("./seeker.service");
const fileName_1 = require("../functions/fileName");
const ulidx_1 = require("ulidx");
let SeekerController = class SeekerController {
    constructor(seekerService) {
        this.seekerService = seekerService;
    }
    async handleRequestAllSekers() {
        return await this.seekerService.findAll();
    }
    async index(seekerID) {
        if (!seekerID) {
            throw new common_1.HttpException({
                status: common_1.HttpStatus.FAILED_DEPENDENCY,
                error: 'seeker id not provided',
            }, common_1.HttpStatus.FAILED_DEPENDENCY);
        }
        const requestedSeeker = await this.seekerService.findOne(seekerID);
        if (!requestedSeeker) {
            throw new common_1.HttpException({
                status: common_1.HttpStatus.NOT_FOUND,
                error: `seeker with id ${seekerID} not found`,
            }, common_1.HttpStatus.NOT_FOUND);
        }
        return requestedSeeker;
    }
    async handleUploadFile(file, req, body) {
        console.log(file);
        if (!file) {
            throw new common_1.HttpException({
                status: common_1.HttpStatus.FORBIDDEN,
                error: 'You did not provide any cv',
            }, common_1.HttpStatus.FORBIDDEN);
        }
        if (!body.name || !body.surname || !body.age || !body.phone || !body.cni) {
            throw new common_1.HttpException({
                status: common_1.HttpStatus.FAILED_DEPENDENCY,
                error: 'All fields are mandatory',
            }, common_1.HttpStatus.FAILED_DEPENDENCY);
        }
        const newSeekerEntity = {
            id: (0, ulidx_1.ulid)(),
            name: body.name,
            surname: body.surname,
            age: body.age,
            sex: body.sex,
            avatar: '',
            phone: body.phone,
            cni: body.cni,
            email: body.email,
            cv: file.filename,
        };
        return this.seekerService.setSeeker(newSeekerEntity);
    }
    async handleDeleteFile(param) {
        const seekerId = param.id;
        const deletedResult = await this.seekerService.remove(seekerId);
        if (deletedResult.affected < 1) {
            throw new common_1.HttpException({
                status: common_1.HttpStatus.NOT_FOUND,
                error: 'The seeker you are trying to delete does not exist',
            }, common_1.HttpStatus.NOT_FOUND);
        }
        throw new common_1.HttpException({
            status: common_1.HttpStatus.ACCEPTED,
            message: 'The seeker was successfully deleted',
        }, common_1.HttpStatus.ACCEPTED);
    }
};
__decorate([
    (0, common_1.Get)('/'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], SeekerController.prototype, "handleRequestAllSekers", null);
__decorate([
    (0, common_1.Get)('/:seekerID'),
    __param(0, (0, common_1.Param)("seekerID")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], SeekerController.prototype, "index", null);
__decorate([
    (0, common_1.Post)(),
    (0, common_1.UseInterceptors)((0, platform_express_1.FileInterceptor)('file', {
        storage: (0, multer_1.diskStorage)({
            destination: Const_1.UPLOAD_FOLDER,
            filename(req, file, callback) {
                console.log(file);
                callback(null, (0, fileName_1.generateUniqueFileName)(file.originalname));
            },
        }),
    })),
    __param(0, (0, common_1.UploadedFile)()),
    __param(1, (0, common_1.Req)()),
    __param(2, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object, Object]),
    __metadata("design:returntype", Promise)
], SeekerController.prototype, "handleUploadFile", null);
__decorate([
    (0, common_1.Delete)('/:id'),
    __param(0, (0, common_1.Param)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], SeekerController.prototype, "handleDeleteFile", null);
SeekerController = __decorate([
    (0, common_1.Controller)('seeker'),
    __metadata("design:paramtypes", [seeker_service_1.SeekerService])
], SeekerController);
exports.SeekerController = SeekerController;
//# sourceMappingURL=seeker.controller.js.map