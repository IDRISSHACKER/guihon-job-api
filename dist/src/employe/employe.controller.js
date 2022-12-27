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
exports.EmployeController = void 0;
const common_1 = require("@nestjs/common");
const Const_1 = require("../utils/Const");
const employe_service_1 = require("./employe.service");
const employe_entity_1 = require("./entities/employe.entity");
const jwt = require("jsonwebtoken");
let EmployeController = class EmployeController {
    constructor(employeService) {
        this.employeService = employeService;
    }
    async handleRequestAllSekers() {
        return await this.employeService.findAll();
    }
    async handleRequestLoginInfo(token) {
        const tokenFormated = token.split(' ')[1];
        try {
            const verification = jwt.verify(tokenFormated, Const_1.PRIVATE_KEY);
            return await this.employeService.findOne(verification.data.id);
        }
        catch (err) {
            throw new common_1.HttpException({
                status: common_1.HttpStatus.UNAUTHORIZED,
                error: 'token expired',
            }, common_1.HttpStatus.UNAUTHORIZED);
        }
    }
    async index(employeID) {
        if (!employeID) {
            throw new common_1.HttpException({
                status: common_1.HttpStatus.FAILED_DEPENDENCY,
                error: 'employe ID not provided',
            }, common_1.HttpStatus.FAILED_DEPENDENCY);
        }
        const requestedEmloye = await this.employeService.findOne(employeID);
        if (!requestedEmloye) {
            throw new common_1.HttpException({
                status: common_1.HttpStatus.NOT_FOUND,
                error: `employe with id ${employeID} not found`,
            }, common_1.HttpStatus.NOT_FOUND);
        }
        return requestedEmloye;
    }
    async handleSaveEmploye(req, body) {
        console.log(body);
        if (!body.nom || !body.prenom || !body.email || !body.tel || !body.cni) {
            throw new common_1.HttpException({
                status: common_1.HttpStatus.FAILED_DEPENDENCY,
                error: 'All fields are mandatory',
            }, common_1.HttpStatus.FAILED_DEPENDENCY);
        }
        return this.employeService.setEmploye(body);
    }
    async handleDeleteFile(param) {
        const employeId = param.id;
        const deletedResult = await this.employeService.remove(employeId);
        if (deletedResult.affected < 1) {
            throw new common_1.HttpException({
                status: common_1.HttpStatus.NOT_FOUND,
                error: 'The employe you are trying to delete does not exist',
            }, common_1.HttpStatus.NOT_FOUND);
        }
        throw new common_1.HttpException({
            status: common_1.HttpStatus.ACCEPTED,
            message: 'The employe was successfully deleted',
        }, common_1.HttpStatus.ACCEPTED);
    }
    async handleLogin(userReq) {
        if (!userReq.tel || !userReq.password) {
            throw new common_1.HttpException({
                status: common_1.HttpStatus.UNAUTHORIZED,
                error: 'Phone and secret required',
            }, common_1.HttpStatus.UNAUTHORIZED);
        }
        const user = await this.employeService.findUser(userReq);
        if (user) {
            const userData = {
                id: user.id,
            };
            return await jwt.sign({
                data: userData,
            }, Const_1.PRIVATE_KEY, { expiresIn: '5m' });
        }
        else {
            throw new common_1.HttpException({
                status: common_1.HttpStatus.UNAUTHORIZED,
                error: 'The phone or password not found',
            }, common_1.HttpStatus.UNAUTHORIZED);
        }
    }
};
__decorate([
    (0, common_1.Get)('/'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], EmployeController.prototype, "handleRequestAllSekers", null);
__decorate([
    (0, common_1.Get)('/info'),
    __param(0, (0, common_1.Headers)('authorization')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], EmployeController.prototype, "handleRequestLoginInfo", null);
__decorate([
    (0, common_1.Get)('/:employeID'),
    __param(0, (0, common_1.Param)('employeID')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], EmployeController.prototype, "index", null);
__decorate([
    (0, common_1.Post)(),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, employe_entity_1.Employe]),
    __metadata("design:returntype", Promise)
], EmployeController.prototype, "handleSaveEmploye", null);
__decorate([
    (0, common_1.Delete)('/:id'),
    __param(0, (0, common_1.Param)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], EmployeController.prototype, "handleDeleteFile", null);
__decorate([
    (0, common_1.Post)('/login'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], EmployeController.prototype, "handleLogin", null);
EmployeController = __decorate([
    (0, common_1.Controller)('employe'),
    __metadata("design:paramtypes", [employe_service_1.EmployeService])
], EmployeController);
exports.EmployeController = EmployeController;
//# sourceMappingURL=employe.controller.js.map