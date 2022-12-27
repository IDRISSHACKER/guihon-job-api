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
exports.PresenceController = void 0;
const common_1 = require("@nestjs/common");
const presence_service_1 = require("./presence.service");
const presence_entity_1 = require("./entities/presence.entity");
let PresenceController = class PresenceController {
    constructor(presenceService) {
        this.presenceService = presenceService;
    }
    async handleRequestAllSekers() {
        return await this.presenceService.findAll();
    }
    async index(id) {
        if (!id) {
            throw new common_1.HttpException({
                status: common_1.HttpStatus.FAILED_DEPENDENCY,
                error: 'presence not provided',
            }, common_1.HttpStatus.FAILED_DEPENDENCY);
        }
        const requestedPresence = await this.presenceService.findOne(id);
        if (!requestedPresence) {
            throw new common_1.HttpException({
                status: common_1.HttpStatus.NOT_FOUND,
                error: `presence with id ${id} not found`,
            }, common_1.HttpStatus.NOT_FOUND);
        }
        return requestedPresence;
    }
    async handleDeleteFile(param) {
        const presenceId = param.id;
        const deletedResult = await this.presenceService.remove(presenceId);
        if (deletedResult.affected < 1) {
            throw new common_1.HttpException({
                status: common_1.HttpStatus.NOT_FOUND,
                error: 'The presence you are trying to remove does not exist',
            }, common_1.HttpStatus.NOT_FOUND);
        }
        throw new common_1.HttpException({
            status: common_1.HttpStatus.ACCEPTED,
            message: 'The presence was successfully deleted',
        }, common_1.HttpStatus.ACCEPTED);
    }
    async handleSetPresence(req, presence) {
        return this.presenceService.setPresence(presence);
    }
    async handleUpdatePresence(req, presenceId) {
        return this.presenceService.update(presenceId);
    }
};
__decorate([
    (0, common_1.Get)('/'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], PresenceController.prototype, "handleRequestAllSekers", null);
__decorate([
    (0, common_1.Get)('/:id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], PresenceController.prototype, "index", null);
__decorate([
    (0, common_1.Delete)('/:id'),
    __param(0, (0, common_1.Param)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], PresenceController.prototype, "handleDeleteFile", null);
__decorate([
    (0, common_1.Post)(),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, presence_entity_1.Presence]),
    __metadata("design:returntype", Promise)
], PresenceController.prototype, "handleSetPresence", null);
__decorate([
    (0, common_1.Put)(':id'),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String]),
    __metadata("design:returntype", Promise)
], PresenceController.prototype, "handleUpdatePresence", null);
PresenceController = __decorate([
    (0, common_1.Controller)('presence'),
    __metadata("design:paramtypes", [presence_service_1.PresenceService])
], PresenceController);
exports.PresenceController = PresenceController;
//# sourceMappingURL=presence.controller.js.map