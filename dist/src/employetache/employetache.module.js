"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.EmployetacheModule = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const employetache_entity_1 = require("./entities/employetache.entity");
const employetache_service_1 = require("./employetache.service");
const employetache_controller_1 = require("./employetache.controller");
const AuthMiddleware_1 = require("../Middlewares/AuthMiddleware");
let EmployetacheModule = class EmployetacheModule {
    configure(consumer) {
        consumer.apply(AuthMiddleware_1.AuthMiddleware).forRoutes(employetache_controller_1.EmployetacheController);
    }
};
EmployetacheModule = __decorate([
    (0, common_1.Module)({
        imports: [typeorm_1.TypeOrmModule.forFeature([employetache_entity_1.Employetache])],
        providers: [employetache_service_1.EmployetacheService],
        controllers: [employetache_controller_1.EmployetacheController],
    })
], EmployetacheModule);
exports.EmployetacheModule = EmployetacheModule;
//# sourceMappingURL=employetache.module.js.map