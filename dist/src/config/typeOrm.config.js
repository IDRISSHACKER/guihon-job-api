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
const planing_entity_1 = require("../planing/entities/planing.entity");
const tache_entity_1 = require("../tache/entities/tache.entity");
const employetache_entity_1 = require("../employetache/entities/employetache.entity");
const _1672246786829_CreateFileMigration_1 = require("../../migrations/1672246786829-CreateFileMigration");
exports.ORM_CONFIG = typeorm_1.TypeOrmModule.forRoot({
    type: Const_1.DB_ENGINE,
    database: 'dbprod7.sqlite',
    entities: [employe_entity_1.Employe, client_entity_1.Client, presence_entity_1.Presence, image_entity_1.Image, planing_entity_1.Planing, tache_entity_1.Tache, employetache_entity_1.Employetache],
    synchronize: true,
    autoLoadEntities: true,
    migrationsTableName: 'media_migration_table',
});
exports.default = new typeorm_2.DataSource({
    type: Const_1.DB_ENGINE,
    database: 'dbprod7.sqlite',
    entities: [employe_entity_1.Employe, client_entity_1.Client, presence_entity_1.Presence, image_entity_1.Image, planing_entity_1.Planing, tache_entity_1.Tache, employetache_entity_1.Employetache],
    migrations: [_1672246786829_CreateFileMigration_1.CreateFileMigration1672246786829],
});
//# sourceMappingURL=typeOrm.config.js.map