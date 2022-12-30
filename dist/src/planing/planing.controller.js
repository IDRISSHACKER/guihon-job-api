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
exports.PlaningController = void 0;
const common_1 = require("@nestjs/common");
const planing_service_1 = require("./planing.service");
const planing_entity_1 = require("./entities/planing.entity");
let PlaningController = class PlaningController {
    constructor(planingService) {
        this.planingService = planingService;
    }
    async handleRequestAllPlanings() {
        return await this.planingService.findAll();
    }
    async index(id) {
        if (!id) {
            throw new common_1.HttpException({
                status: common_1.HttpStatus.FAILED_DEPENDENCY,
                error: 'planing with ID not provided',
            }, common_1.HttpStatus.FAILED_DEPENDENCY);
        }
        const requestedPlaning = await this.planingService.findOne(id);
        if (!requestedPlaning) {
            throw new common_1.HttpException({
                status: common_1.HttpStatus.NOT_FOUND,
                error: `planing with id ${id} not found`,
            }, common_1.HttpStatus.NOT_FOUND);
        }
        return requestedPlaning;
    }
    async handleSavePlaning(req, body) {
        if (!body.clientId || !body.prix) {
            throw new common_1.HttpException({
                status: common_1.HttpStatus.FAILED_DEPENDENCY,
                error: 'All fields are mandatory',
            }, common_1.HttpStatus.FAILED_DEPENDENCY);
        }
        return this.planingService.setPlaning(body);
    }
    async handleDeletePlaning(id) {
        const deletedResult = await this.planingService.remove(id);
        if (deletedResult.affected < 1) {
            throw new common_1.HttpException({
                status: common_1.HttpStatus.NOT_FOUND,
                error: 'The planing you are trying to delete does not exist',
            }, common_1.HttpStatus.NOT_FOUND);
        }
        throw new common_1.HttpException({
            status: common_1.HttpStatus.ACCEPTED,
            message: 'The planing was successfully deleted',
        }, common_1.HttpStatus.ACCEPTED);
    }
};
__decorate([
    (0, common_1.Get)('/'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], PlaningController.prototype, "handleRequestAllPlanings", null);
__decorate([
    (0, common_1.Get)('/:id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], PlaningController.prototype, "index", null);
__decorate([
    (0, common_1.Post)(),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, planing_entity_1.Planing]),
    __metadata("design:returntype", Promise)
], PlaningController.prototype, "handleSavePlaning", null);
__decorate([
    (0, common_1.Delete)('/:id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], PlaningController.prototype, "handleDeletePlaning", null);
PlaningController = __decorate([
    (0, common_1.Controller)('planing'),
    __metadata("design:paramtypes", [planing_service_1.PlaningService])
], PlaningController);
exports.PlaningController = PlaningController;
//# sourceMappingURL=planing.controller.js.map