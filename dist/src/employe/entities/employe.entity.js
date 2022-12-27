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
exports.Employe = void 0;
const typeorm_1 = require("typeorm");
const presence_entity_1 = require("../../presence/entities/presence.entity");
let Employe = class Employe extends typeorm_1.BaseEntity {
};
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    (0, typeorm_1.Generated)('uuid'),
    __metadata("design:type", String)
], Employe.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], Employe.prototype, "nom", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], Employe.prototype, "prenom", void 0);
__decorate([
    (0, typeorm_1.Column)({
        default: 'tetttttt',
    }),
    __metadata("design:type", String)
], Employe.prototype, "cni", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], Employe.prototype, "email", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], Employe.prototype, "tel", void 0);
__decorate([
    (0, typeorm_1.Column)({
        default: 'Avatar.jpg',
    }),
    __metadata("design:type", String)
], Employe.prototype, "avatar", void 0);
__decorate([
    (0, typeorm_1.Column)({
        default: '50000',
    }),
    __metadata("design:type", String)
], Employe.prototype, "basesalary", void 0);
__decorate([
    (0, typeorm_1.Column)({
        default: '0000',
    }),
    __metadata("design:type", String)
], Employe.prototype, "secret", void 0);
__decorate([
    (0, typeorm_1.Column)({
        default: false,
    }),
    __metadata("design:type", Boolean)
], Employe.prototype, "isAdmin", void 0);
__decorate([
    (0, typeorm_1.Column)({
        default: false,
    }),
    __metadata("design:type", Boolean)
], Employe.prototype, "isSecretary", void 0);
__decorate([
    (0, typeorm_1.Column)({
        default: '',
    }),
    __metadata("design:type", String)
], Employe.prototype, "token", void 0);
__decorate([
    (0, typeorm_1.Column)({
        default: '',
    }),
    __metadata("design:type", String)
], Employe.prototype, "refreshToken", void 0);
__decorate([
    (0, typeorm_1.UpdateDateColumn)(),
    __metadata("design:type", Date)
], Employe.prototype, "updated_at", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)(),
    __metadata("design:type", Date)
], Employe.prototype, "created_at", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => presence_entity_1.Presence, (presence) => presence.user),
    (0, typeorm_1.JoinTable)(),
    __metadata("design:type", presence_entity_1.Presence)
], Employe.prototype, "presences", void 0);
Employe = __decorate([
    (0, typeorm_1.Entity)()
], Employe);
exports.Employe = Employe;
//# sourceMappingURL=employe.entity.js.map