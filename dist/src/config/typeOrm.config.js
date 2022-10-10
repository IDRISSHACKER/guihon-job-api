"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ORM_CONFIG = void 0;
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const Const_1 = require("../utils/Const");
const _1663314497286_CreateFileMigration_1 = require("../../migrations/1663314497286-CreateFileMigration");
const seeker_entity_1 = require("../seeker/entities/seeker.entity");
const admin_entity_1 = require("../admin/entities/admin.entity");
exports.ORM_CONFIG = typeorm_1.TypeOrmModule.forRoot({
    type: Const_1.DB_ENGINE,
    database: "dbprod.sqlite",
    entities: [seeker_entity_1.Seeker, admin_entity_1.Admin],
    synchronize: true,
    autoLoadEntities: true,
    migrationsTableName: 'media_migration_table',
});
exports.default = new typeorm_2.DataSource({
    type: Const_1.DB_ENGINE,
    database: "dbprod.sqlite",
    entities: [seeker_entity_1.Seeker, admin_entity_1.Admin],
    migrations: [_1663314497286_CreateFileMigration_1.CreateFileMigration1663314497286],
});
//# sourceMappingURL=typeOrm.config.js.map