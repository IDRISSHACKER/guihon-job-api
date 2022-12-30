"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppModule = void 0;
const common_1 = require("@nestjs/common");
const app_controller_1 = require("./app.controller");
const app_service_1 = require("./app.service");
const multer_1 = require("@nestjs/platform-express/multer");
const typeOrm_config_1 = require("./config/typeOrm.config");
const Const_1 = require("./utils/Const");
const client_module_1 = require("./client/client.module");
const employe_module_1 = require("./employe/employe.module");
const presence_module_1 = require("./presence/presence.module");
const image_module_1 = require("./image/image.module");
const AppMiddleware_1 = require("./Middlewares/AppMiddleware");
const planing_module_1 = require("./planing/planing.module");
const tache_module_1 = require("./tache/tache.module");
const employetache_module_1 = require("./employetache/employetache.module");
let AppModule = class AppModule {
    configure(consumer) {
        consumer
            .apply(AppMiddleware_1.AppMiddleware)
            .forRoutes({ path: '*', method: common_1.RequestMethod.ALL });
    }
};
AppModule = __decorate([
    (0, common_1.Module)({
        imports: [
            typeOrm_config_1.ORM_CONFIG,
            multer_1.MulterModule.register({ dest: Const_1.TMP_FOLDER }),
            employe_module_1.EmployeModule,
            client_module_1.ClientModule,
            presence_module_1.PresenceModule,
            image_module_1.ImageModule,
            planing_module_1.PlaningModule,
            tache_module_1.TacheModule,
            employetache_module_1.EmployetacheModule
        ],
        controllers: [app_controller_1.AppController],
        providers: [app_service_1.AppService],
    })
], AppModule);
exports.AppModule = AppModule;
//# sourceMappingURL=app.module.js.map