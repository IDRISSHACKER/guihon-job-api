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
exports.TacheService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const tache_entity_1 = require("./entities/tache.entity");
const ulidx_1 = require("ulidx");
const planing_service_1 = require("../planing/planing.service");
const employetache_service_1 = require("../employetache/employetache.service");
const employe_service_1 = require("../employe/employe.service");
let TacheService = class TacheService {
    constructor(tacheRepository, planingService, employeTacheService, employeService) {
        this.tacheRepository = tacheRepository;
        this.planingService = planingService;
        this.employeTacheService = employeTacheService;
        this.employeService = employeService;
    }
    async setTache(tache) {
        const tacheResp = await this.tacheRepository.save(Object.assign({ id: (0, ulidx_1.ulid)() }, tache));
        const planing = await this.planingService.findOne(tacheResp.planingId);
        const employeTache = await this.employeTacheService.findByTache(tache.id);
        const employes = [];
        for (const tache of employeTache) {
            const employe = await this.employeService.findOne(tache.userId);
            employes.push(employes.push(Object.assign(Object.assign({}, employe), { tacheInfo: tache })));
        }
        return Object.assign(Object.assign({}, tacheResp), { planing: planing !== null ? planing : {}, employes: employes });
    }
    async findAll() {
        const taches = await this.tacheRepository.find({
            order: {
                id: 'DESC',
            },
        });
        const tachesPlaning = [];
        for (const tache of taches) {
            const planing = await this.planingService.findOne(tache.planingId);
            const employeTache = await this.employeTacheService.findByTache(tache.id);
            const employes = [];
            for (const tache of employeTache) {
                const employe = await this.employeService.findOne(tache.userId);
                employes.push(Object.assign(Object.assign({}, employe), { tacheInfo: tache }));
            }
            const data = Object.assign(Object.assign({}, tache), { planing: planing !== null ? planing : {}, employes: employes });
            tachesPlaning.push(data);
        }
        return tachesPlaning;
    }
    async findOne(id) {
        const tache = await this.tacheRepository.findOneBy({ id: id });
        const planing = await this.planingService.findOne(tache.id);
        const employeTache = await this.employeTacheService.findByTache(tache.id);
        const employes = [];
        for (const tache of employeTache) {
            const employe = await this.employeService.findOne(tache.userId);
            employes.push(Object.assign(Object.assign({}, employe), { tacheInfo: tache }));
        }
        return Object.assign(Object.assign({}, tache), { planing: planing !== null ? planing : {}, employes: employes });
    }
    async remove(id) {
        return await this.tacheRepository.delete(id);
    }
};
TacheService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(tache_entity_1.Tache)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        planing_service_1.PlaningService,
        employetache_service_1.EmployetacheService,
        employe_service_1.EmployeService])
], TacheService);
exports.TacheService = TacheService;
//# sourceMappingURL=tache.service.js.map