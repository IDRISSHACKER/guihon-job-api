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
exports.Presence = void 0;
const typeorm_1 = require("typeorm");
const employe_entity_1 = require("../../employe/entities/employe.entity");
let Presence = class Presence extends typeorm_1.BaseEntity {
};
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    (0, typeorm_1.Generated)('uuid'),
    __metadata("design:type", String)
], Presence.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], Presence.prototype, "userId", void 0);
__decorate([
    (0, typeorm_1.Column)({
        default: false,
    }),
    __metadata("design:type", Boolean)
], Presence.prototype, "ended", void 0);
__decorate([
    (0, typeorm_1.UpdateDateColumn)({
        type: 'datetime',
        default: () => 'CURRENT_TIMESTAMP',
        onUpdate: 'CURRENT_TIMESTAMP',
    }),
    __metadata("design:type", Date)
], Presence.prototype, "updated_at", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)({
        type: 'datetime',
        default: () => 'CURRENT_TIMESTAMP',
        onUpdate: 'NO ACTION',
    }),
    __metadata("design:type", Date)
], Presence.prototype, "created_at", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => employe_entity_1.Employe, (employe) => employe.presences, {
        onDelete: 'CASCADE',
    }),
    (0, typeorm_1.JoinColumn)({ name: 'userId' }),
    __metadata("design:type", employe_entity_1.Employe)
], Presence.prototype, "user", void 0);
Presence = __decorate([
    (0, typeorm_1.Entity)()
], Presence);
exports.Presence = Presence;
//# sourceMappingURL=presence.entity.js.map