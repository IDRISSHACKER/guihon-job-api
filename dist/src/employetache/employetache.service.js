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
exports.EmployetacheService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const employetache_entity_1 = require("./entities/employetache.entity");
const ulidx_1 = require("ulidx");
let EmployetacheService = class EmployetacheService {
    constructor(employeTacheRepository) {
        this.employeTacheRepository = employeTacheRepository;
    }
    async setEmployeTache(employeTache) {
        const existEmploye = await this.employeTacheRepository.findBy({ tacheId: employeTache.tacheId });
        if (existEmploye.length !== 0) {
            return await this.employeTacheRepository.save(Object.assign({ id: (0, ulidx_1.ulid)() }, employeTache));
        }
        else {
            return await this.employeTacheRepository.save(Object.assign({ id: (0, ulidx_1.ulid)(), isAdmin: true }, employeTache));
        }
    }
    async findAll() {
        return (await this.employeTacheRepository.find({
            order: {
                id: 'DESC',
            },
        }));
    }
    async findOne(id) {
        return await this.employeTacheRepository.findOneBy({ id });
    }
    async findByTache(id) {
        return await this.employeTacheRepository.findBy({ tacheId: id });
    }
    async remove(tacheId, userId) {
        return await this.employeTacheRepository.delete({
            tacheId: tacheId,
            userId: userId
        });
    }
};
EmployetacheService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(employetache_entity_1.Employetache)),
    __metadata("design:paramtypes", [typeorm_2.Repository])
], EmployetacheService);
exports.EmployetacheService = EmployetacheService;
//# sourceMappingURL=employetache.service.js.map