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
exports.PlaningService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const planing_entity_1 = require("./entities/planing.entity");
const ulidx_1 = require("ulidx");
const client_service_1 = require("../client/client.service");
let PlaningService = class PlaningService {
    constructor(planingRepository, clientService) {
        this.planingRepository = planingRepository;
        this.clientService = clientService;
    }
    async setPlaning(planing) {
        const planingrest = await this.planingRepository.save(Object.assign({ id: (0, ulidx_1.ulid)() }, planing));
        const client = await this.clientService.findOne(planingrest.clientId);
        return Object.assign(Object.assign({}, planingrest), { client: client !== null ? client : {} });
    }
    async findAll() {
        const planings = await this.planingRepository.find({
            order: {
                id: 'DESC',
            },
        });
        const planingsClient = [];
        for (const planing of planings) {
            const client = await this.clientService.findOne(planing.clientId);
            const data = Object.assign(Object.assign({}, planing), { client: client !== null ? client : [] });
            planingsClient.push(data);
        }
        return planingsClient;
    }
    async findOne(id) {
        const planing = await this.planingRepository.findOneBy({ id: id });
        const client = await this.clientService.findOne(planing.clientId);
        return Object.assign(Object.assign({}, planing), { client: client !== null ? client : {} });
    }
    async remove(id) {
        return await this.planingRepository.delete(id);
    }
};
PlaningService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(planing_entity_1.Planing)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        client_service_1.ClientService])
], PlaningService);
exports.PlaningService = PlaningService;
//# sourceMappingURL=planing.service.js.map