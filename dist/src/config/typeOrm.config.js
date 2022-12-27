"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ORM_CONFIG = void 0;
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const Const_1 = require("../utils/Const");
const employe_entity_1 = require("../employe/entities/employe.entity");
const client_entity_1 = require("../client/entities/client.entity");
const presence_entity_1 = require("../presence/entities/presence.entity");
const image_entity_1 = require("../image/entities/image.entity");
const _1672053552355_CreateFileMigration_1 = require("../../migrations/1672053552355-CreateFileMigration");
exports.ORM_CONFIG = typeorm_1.TypeOrmModule.forRoot({
    type: Const_1.DB_ENGINE,
    database: 'dbprod5.sqlite',
    entities: [employe_entity_1.Employe, client_entity_1.Client, presence_entity_1.Presence, image_entity_1.Image],
    synchronize: true,
    autoLoadEntities: true,
    migrationsTableName: 'media_migration_table',
});
exports.default = new typeorm_2.DataSource({
    type: Const_1.DB_ENGINE,
    database: 'dbprod5.sqlite',
    entities: [employe_entity_1.Employe, client_entity_1.Client, presence_entity_1.Presence, image_entity_1.Image],
    migrations: [_1672053552355_CreateFileMigration_1.CreateFileMigration1672053552355],
});
//# sourceMappingURL=typeOrm.config.js.map