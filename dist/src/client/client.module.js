"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ClientModule = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const client_service_1 = require("./client.service");
const client_controller_1 = require("./client.controller");
const client_entity_1 = require("./entities/client.entity");
const AuthMiddleware_1 = require("../Middlewares/AuthMiddleware");
const image_service_1 = require("../image/image.service");
const image_entity_1 = require("../image/entities/image.entity");
let ClientModule = class ClientModule {
    configure(consumer) {
        consumer.apply(AuthMiddleware_1.AuthMiddleware).forRoutes(client_controller_1.ClientController);
    }
};
ClientModule = __decorate([
    (0, common_1.Module)({
        imports: [typeorm_1.TypeOrmModule.forFeature([client_entity_1.Client, image_entity_1.Image])],
        providers: [client_service_1.ClientService, image_service_1.ImageService],
        controllers: [client_controller_1.ClientController],
    })
], ClientModule);
exports.ClientModule = ClientModule;
//# sourceMappingURL=client.module.js.map