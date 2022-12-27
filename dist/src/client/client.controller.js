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
exports.ClientController = void 0;
const common_1 = require("@nestjs/common");
const client_service_1 = require("./client.service");
const client_entity_1 = require("./entities/client.entity");
let ClientController = class ClientController {
    constructor(clientService) {
        this.clientService = clientService;
    }
    async handleRequestAllSekers() {
        return this.clientService.findAll();
    }
    async index(clientId) {
        if (!clientId) {
            throw new common_1.HttpException({
                status: common_1.HttpStatus.FAILED_DEPENDENCY,
                error: 'client ID not provided',
            }, common_1.HttpStatus.FAILED_DEPENDENCY);
        }
        const requestedClient = await this.clientService.findOne(clientId);
        if (!requestedClient) {
            throw new common_1.HttpException({
                status: common_1.HttpStatus.NOT_FOUND,
                error: `client with id ${clientId} not found`,
            }, common_1.HttpStatus.NOT_FOUND);
        }
        return requestedClient;
    }
    async handleDeleteFile(param) {
        const clientId = param.id;
        const deletedResult = await this.clientService.remove(clientId);
        if (deletedResult.affected < 1) {
            throw new common_1.HttpException({
                status: common_1.HttpStatus.NOT_FOUND,
                error: 'The client you are trying to delete does not exist',
            }, common_1.HttpStatus.NOT_FOUND);
        }
        throw new common_1.HttpException({
            status: common_1.HttpStatus.ACCEPTED,
            message: 'The client was successfully deleted',
        }, common_1.HttpStatus.ACCEPTED);
    }
    async handleUploadFile(req, body) {
        console.log(body);
        if (!body.nom || !body.prenom || !body.email || !body.tel) {
            throw new common_1.HttpException({
                status: common_1.HttpStatus.FAILED_DEPENDENCY,
                error: 'All fields are mandatory',
            }, common_1.HttpStatus.FAILED_DEPENDENCY);
        }
        return this.clientService.setClient(body);
    }
};
__decorate([
    (0, common_1.Get)('/'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], ClientController.prototype, "handleRequestAllSekers", null);
__decorate([
    (0, common_1.Get)('/:clientId'),
    __param(0, (0, common_1.Param)('clientId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], ClientController.prototype, "index", null);
__decorate([
    (0, common_1.Delete)('/:id'),
    __param(0, (0, common_1.Param)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], ClientController.prototype, "handleDeleteFile", null);
__decorate([
    (0, common_1.Post)(),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, client_entity_1.Client]),
    __metadata("design:returntype", Promise)
], ClientController.prototype, "handleUploadFile", null);
ClientController = __decorate([
    (0, common_1.Controller)('client'),
    __metadata("design:paramtypes", [client_service_1.ClientService])
], ClientController);
exports.ClientController = ClientController;
//# sourceMappingURL=client.controller.js.map