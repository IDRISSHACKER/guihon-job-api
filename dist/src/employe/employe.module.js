"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.EmployeModule = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const employe_service_1 = require("./employe.service");
const employe_controller_1 = require("./employe.controller");
const employe_entity_1 = require("./entities/employe.entity");
const AuthMiddleware_1 = require("../Middlewares/AuthMiddleware");
const presence_entity_1 = require("../presence/entities/presence.entity");
const presence_service_1 = require("../presence/presence.service");
let EmployeModule = class EmployeModule {
    configure(consumer) {
        consumer
            .apply(AuthMiddleware_1.AuthMiddleware)
            .exclude({ path: 'employe/login', method: common_1.RequestMethod.POST })
            .forRoutes(employe_controller_1.EmployeController);
    }
};
EmployeModule = __decorate([
    (0, common_1.Module)({
        imports: [typeorm_1.TypeOrmModule.forFeature([employe_entity_1.Employe, presence_entity_1.Presence])],
        providers: [employe_service_1.EmployeService, presence_service_1.PresenceService],
        controllers: [employe_controller_1.EmployeController],
    })
], EmployeModule);
exports.EmployeModule = EmployeModule;
//# sourceMappingURL=employe.module.js.map