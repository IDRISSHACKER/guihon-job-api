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
exports.PresenceService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const presence_entity_1 = require("./entities/presence.entity");
const ulidx_1 = require("ulidx");
const date = require("date-and-time");
let PresenceService = class PresenceService {
    constructor(presenceRepository) {
        this.presenceRepository = presenceRepository;
    }
    async setPresence(presence) {
        return await this.presenceRepository.save(Object.assign({ id: (0, ulidx_1.ulid)() }, presence));
    }
    async findAll() {
        return (await this.presenceRepository.find({
            order: {
                id: 'DESC',
            },
        }));
    }
    async findOne(id) {
        return await this.presenceRepository.findOneBy({ id });
    }
    async findByUser(id) {
        const now = new Date();
        const datep = date.format(now, 'YYYY-MM-DD');
        return await this.presenceRepository.findOne({
            order: {
                id: 'DESC',
            },
            where: {
                userId: id,
                created_at: (0, typeorm_2.Not)((0, typeorm_2.LessThan)(datep)),
            },
        });
    }
    async update(id) {
        return await this.presenceRepository.update({
            id: id,
        }, {
            ended: true,
        });
    }
    async remove(id) {
        return await this.presenceRepository.delete(id);
    }
};
PresenceService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(presence_entity_1.Presence)),
    __metadata("design:paramtypes", [typeorm_2.Repository])
], PresenceService);
exports.PresenceService = PresenceService;
//# sourceMappingURL=presence.service.js.map