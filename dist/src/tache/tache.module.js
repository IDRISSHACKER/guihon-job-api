"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.TacheModule = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const tache_entity_1 = require("./entities/tache.entity");
const tache_service_1 = require("./tache.service");
const tache_controller_1 = require("./tache.controller");
const AuthMiddleware_1 = require("../Middlewares/AuthMiddleware");
const planing_entity_1 = require("../planing/entities/planing.entity");
const planing_service_1 = require("../planing/planing.service");
const client_service_1 = require("../client/client.service");
const image_service_1 = require("../image/image.service");
const client_entity_1 = require("../client/entities/client.entity");
const image_entity_1 = require("../image/entities/image.entity");
const employetache_entity_1 = require("../employetache/entities/employetache.entity");
const employetache_service_1 = require("../employetache/employetache.service");
const employe_entity_1 = require("../employe/entities/employe.entity");
const employe_service_1 = require("../employe/employe.service");
const presence_service_1 = require("../presence/presence.service");
const presence_entity_1 = require("../presence/entities/presence.entity");
let TacheModule = class TacheModule {
    configure(consumer) {
        consumer
            .apply(AuthMiddleware_1.AuthMiddleware).forRoutes(tache_controller_1.TacheController);
    }
};
TacheModule = __decorate([
    (0, common_1.Module)({
        imports: [typeorm_1.TypeOrmModule.forFeature([tache_entity_1.Tache, planing_entity_1.Planing, client_entity_1.Client, image_entity_1.Image, employetache_entity_1.Employetache, employe_entity_1.Employe, presence_entity_1.Presence])],
        providers: [tache_service_1.TacheService, planing_service_1.PlaningService, client_service_1.ClientService, image_service_1.ImageService, employetache_service_1.EmployetacheService, employe_service_1.EmployeService, presence_service_1.PresenceService],
        controllers: [tache_controller_1.TacheController],
    })
], TacheModule);
exports.TacheModule = TacheModule;
//# sourceMappingURL=tache.module.js.map