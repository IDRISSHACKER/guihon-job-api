"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PresenceModule = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const presence_service_1 = require("./presence.service");
const presence_controller_1 = require("./presence.controller");
const presence_entity_1 = require("./entities/presence.entity");
const AuthMiddleware_1 = require("../Middlewares/AuthMiddleware");
let PresenceModule = class PresenceModule {
    configure(consumer) {
        consumer.apply(AuthMiddleware_1.AuthMiddleware).forRoutes(presence_controller_1.PresenceController);
    }
};
PresenceModule = __decorate([
    (0, common_1.Module)({
        imports: [typeorm_1.TypeOrmModule.forFeature([presence_entity_1.Presence])],
        providers: [presence_service_1.PresenceService],
        controllers: [presence_controller_1.PresenceController],
    })
], PresenceModule);
exports.PresenceModule = PresenceModule;
//# sourceMappingURL=presence.module.js.map