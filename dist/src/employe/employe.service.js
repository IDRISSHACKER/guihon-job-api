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
exports.EmployeService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const employe_entity_1 = require("./entities/employe.entity");
const presence_service_1 = require("../presence/presence.service");
const ulidx_1 = require("ulidx");
let EmployeService = class EmployeService {
    constructor(employeRepository, presenceService) {
        this.employeRepository = employeRepository;
        this.presenceService = presenceService;
    }
    async setEmploye(employe) {
        const user = await this.employeRepository.save(Object.assign({ id: (0, ulidx_1.ulid)() }, employe));
        const presence = await this.presenceService.findByUser(user.id);
        return Object.assign(Object.assign({}, user), { presence: presence !== null ? presence : {} });
    }
    async findAll() {
        const employes = await this.employeRepository.find({
            order: {
                id: 'DESC',
            },
        });
        const presenceUsers = [];
        for (const employe of employes) {
            const presence = await this.presenceService.findByUser(employe.id);
            const data = Object.assign(Object.assign({}, employe), { presence: presence !== null ? presence : {} });
            presenceUsers.push(data);
        }
        return presenceUsers;
    }
    async findOne(id) {
        const user = await this.employeRepository.findOneBy({ id });
        const presence = await this.presenceService.findByUser(user.id);
        return Object.assign(Object.assign({}, user), { presence: presence !== null ? presence : {} });
    }
    async findUser(user) {
        return await this.employeRepository.findOneBy({
            tel: user.tel,
            secret: user.password,
        });
    }
    async remove(id) {
        return await this.employeRepository.delete(id);
    }
};
EmployeService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(employe_entity_1.Employe)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        presence_service_1.PresenceService])
], EmployeService);
exports.EmployeService = EmployeService;
//# sourceMappingURL=employe.service.js.map