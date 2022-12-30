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
Object.defineProperty(exports, "__esModule", { value: true });
exports.Tache = void 0;
const typeorm_1 = require("typeorm");
const planing_entity_1 = require("../../planing/entities/planing.entity");
const employetache_entity_1 = require("../../employetache/entities/employetache.entity");
let Tache = class Tache extends typeorm_1.BaseEntity {
};
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    (0, typeorm_1.Generated)('uuid'),
    __metadata("design:type", String)
], Tache.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)({ default: '' }),
    __metadata("design:type", String)
], Tache.prototype, "title", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], Tache.prototype, "planingId", void 0);
__decorate([
    (0, typeorm_1.Column)({ default: false }),
    __metadata("design:type", Boolean)
], Tache.prototype, "ended", void 0);
__decorate([
    (0, typeorm_1.Column)({ default: '' }),
    __metadata("design:type", String)
], Tache.prototype, "rapport", void 0);
__decorate([
    (0, typeorm_1.Column)({ default: '' }),
    __metadata("design:type", String)
], Tache.prototype, "startImg", void 0);
__decorate([
    (0, typeorm_1.Column)({ default: '' }),
    __metadata("design:type", String)
], Tache.prototype, "start_at", void 0);
__decorate([
    (0, typeorm_1.Column)({ default: '' }),
    __metadata("design:type", String)
], Tache.prototype, "endImg", void 0);
__decorate([
    (0, typeorm_1.Column)({ default: '' }),
    __metadata("design:type", String)
], Tache.prototype, "ended_at", void 0);
__decorate([
    (0, typeorm_1.UpdateDateColumn)(),
    __metadata("design:type", Date)
], Tache.prototype, "updated_at", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)(),
    __metadata("design:type", Date)
], Tache.prototype, "created_at", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => planing_entity_1.Planing, (planing) => planing.taches, {
        onDelete: 'CASCADE'
    }),
    (0, typeorm_1.JoinColumn)({ name: 'planingId' }),
    __metadata("design:type", planing_entity_1.Planing)
], Tache.prototype, "planing", void 0);
__decorate([
    (0, typeorm_1.ManyToMany)(() => employetache_entity_1.Employetache, (employetache) => employetache.taches),
    (0, typeorm_1.JoinTable)(),
    __metadata("design:type", Array)
], Tache.prototype, "employestaches", void 0);
Tache = __decorate([
    (0, typeorm_1.Entity)()
], Tache);
exports.Tache = Tache;
//# sourceMappingURL=tache.entity.js.map