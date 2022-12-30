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
exports.TacheController = void 0;
const common_1 = require("@nestjs/common");
const tache_entity_1 = require("./entities/tache.entity");
const tache_service_1 = require("./tache.service");
let TacheController = class TacheController {
    constructor(tacheService) {
        this.tacheService = tacheService;
    }
    async handleRequestAllTache() {
        return await this.tacheService.findAll();
    }
    async index(id) {
        if (!id) {
            throw new common_1.HttpException({
                status: common_1.HttpStatus.FAILED_DEPENDENCY,
                error: 'tache ID not provided',
            }, common_1.HttpStatus.FAILED_DEPENDENCY);
        }
        const requestedTache = await this.tacheService.findOne(id);
        if (!requestedTache) {
            throw new common_1.HttpException({
                status: common_1.HttpStatus.NOT_FOUND,
                error: `tache with id ${id} not found`,
            }, common_1.HttpStatus.NOT_FOUND);
        }
        return requestedTache;
    }
    async handleSaveTache(req, body) {
        if (!body.planingId) {
            throw new common_1.HttpException({
                status: common_1.HttpStatus.FAILED_DEPENDENCY,
                error: 'All fields are mandatory',
            }, common_1.HttpStatus.FAILED_DEPENDENCY);
        }
        return this.tacheService.setTache(body);
    }
    async handleDeleteTache(id) {
        const deletedResult = await this.tacheService.remove(id);
        if (deletedResult.affected < 1) {
            throw new common_1.HttpException({
                status: common_1.HttpStatus.NOT_FOUND,
                error: 'The tache you are trying to delete does not exist',
            }, common_1.HttpStatus.NOT_FOUND);
        }
        throw new common_1.HttpException({
            status: common_1.HttpStatus.ACCEPTED,
            message: 'The tache was successfully deleted',
        }, common_1.HttpStatus.ACCEPTED);
    }
};
__decorate([
    (0, common_1.Get)('/'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], TacheController.prototype, "handleRequestAllTache", null);
__decorate([
    (0, common_1.Get)('/:id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], TacheController.prototype, "index", null);
__decorate([
    (0, common_1.Post)(),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, tache_entity_1.Tache]),
    __metadata("design:returntype", Promise)
], TacheController.prototype, "handleSaveTache", null);
__decorate([
    (0, common_1.Delete)('/:id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], TacheController.prototype, "handleDeleteTache", null);
TacheController = __decorate([
    (0, common_1.Controller)('tache'),
    __metadata("design:paramtypes", [tache_service_1.TacheService])
], TacheController);
exports.TacheController = TacheController;
//# sourceMappingURL=tache.controller.js.map