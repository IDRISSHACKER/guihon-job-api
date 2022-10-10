"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CreateFileMigration1663667122442 = void 0;
class CreateFileMigration1663667122442 {
    constructor() {
        this.name = 'CreateFileMigration1663667122442';
    }
    async up(queryRunner) {
        await queryRunner.query(`CREATE TABLE IF NOT EXISTS \`format\` (\`id\` varchar(36) NOT NULL, \`resolution\` varchar(255) NOT NULL, \`isOriginal\` tinyint NOT NULL, \`extension\` varchar(255) NOT NULL, \`size\` varchar(255) NOT NULL, \`path\` varchar(255) NOT NULL, \`updated_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`fileId\` int NOT NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE IF NOT EXISTS \`file\` (\`id\` varchar(36) NOT NULL, \`type_code\` varchar(255) NOT NULL, \`application\` varchar(255) NOT NULL, \`root_path\` varchar(255) NOT NULL, \`updated_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`ALTER TABLE \`format\` ADD CONSTRAINT \`FK_bbed81019dacca36bfab02d27ce\` FOREIGN KEY (\`fileId\`) REFERENCES \`file\`(\`id\`) ON DELETE CASCADE ON UPDATE CASCADE`);
    }
    async down(queryRunner) {
        await queryRunner.query(`ALTER TABLE \`format\` DROP FOREIGN KEY \`FK_bbed81019dacca36bfab02d27ce\``);
        await queryRunner.query(`DROP TABLE \`format\``);
        await queryRunner.query(`DROP TABLE \`file\``);
    }
}
exports.CreateFileMigration1663667122442 = CreateFileMigration1663667122442;
//# sourceMappingURL=1663667122442-CreateFileMigration.js.map