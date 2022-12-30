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
exports.EmployetacheController = void 0;
const common_1 = require("@nestjs/common");
const employetache_entity_1 = require("./entities/employetache.entity");
const employetache_service_1 = require("./employetache.service");
let EmployetacheController = class EmployetacheController {
    constructor(employeTacheService) {
        this.employeTacheService = employeTacheService;
    }
    async handleRequestAllEmployeTache() {
        return await this.employeTacheService.findAll();
    }
    async index(id) {
        if (!id) {
            throw new common_1.HttpException({
                status: common_1.HttpStatus.FAILED_DEPENDENCY,
                error: 'employeTache id not provided',
            }, common_1.HttpStatus.FAILED_DEPENDENCY);
        }
        const requestedEmployeTache = await this.employeTacheService.findOne(id);
        if (!requestedEmployeTache) {
            throw new common_1.HttpException({
                status: common_1.HttpStatus.NOT_FOUND,
                error: `employeTache with id ${id} not found`,
            }, common_1.HttpStatus.NOT_FOUND);
        }
        return requestedEmployeTache;
    }
    async handleDeleteEmployeTache(id, userId) {
        const deletedResult = await this.employeTacheService.remove(id, userId);
        if (deletedResult.affected < 1) {
            throw new common_1.HttpException({
                status: common_1.HttpStatus.NOT_FOUND,
                error: 'The employeTache you are trying to remove does not exist',
            }, common_1.HttpStatus.NOT_FOUND);
        }
        throw new common_1.HttpException({
            status: common_1.HttpStatus.ACCEPTED,
            message: 'The employeTache was successfully deleted',
        }, common_1.HttpStatus.ACCEPTED);
    }
    async handleSetEmployeTache(req, employeTache) {
        return this.employeTacheService.setEmployeTache(employeTache);
    }
};
__decorate([
    (0, common_1.Get)('/'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], EmployetacheController.prototype, "handleRequestAllEmployeTache", null);
__decorate([
    (0, common_1.Get)('/:id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], EmployetacheController.prototype, "index", null);
__decorate([
    (0, common_1.Delete)('/:id'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Query)('userId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], EmployetacheController.prototype, "handleDeleteEmployeTache", null);
__decorate([
    (0, common_1.Post)(),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, employetache_entity_1.Employetache]),
    __metadata("design:returntype", Promise)
], EmployetacheController.prototype, "handleSetEmployeTache", null);
EmployetacheController = __decorate([
    (0, common_1.Controller)('employetache'),
    __metadata("design:paramtypes", [employetache_service_1.EmployetacheService])
], EmployetacheController);
exports.EmployetacheController = EmployetacheController;
//# sourceMappingURL=employetache.controller.js.map