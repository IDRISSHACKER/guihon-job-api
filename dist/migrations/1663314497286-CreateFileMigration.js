"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CreateFileMigration1663314497286 = void 0;
class CreateFileMigration1663314497286 {
    constructor() {
        this.name = 'CreateFileMigration1663314497286';
    }
    async up(queryRunner) {
        await queryRunner.query(`CREATE TABLE \`format\` (\`id\` varchar(36) NOT NULL, \`resolution\` varchar(255) NOT NULL, \`isOriginal\` tinyint NOT NULL, \`extension\` varchar(255) NOT NULL, \`size\` varchar(255) NOT NULL, \`path\` varchar(255) NOT NULL, \`updated_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`fileId\` varchar(36) NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`file\` (\`id\` varchar(36) NOT NULL, \`type_code\` varchar(255) NOT NULL, \`application\` varchar(255) NOT NULL, \`root_path\` varchar(255) NOT NULL, \`updated_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`ALTER TABLE \`format\` ADD CONSTRAINT \`FK_bbed81019dacca36bfab02d27ce\` FOREIGN KEY (\`fileId\`) REFERENCES \`file\`(\`id\`) ON DELETE CASCADE ON UPDATE CASCADE`);
    }
    async down(queryRunner) {
        await queryRunner.query(`ALTER TABLE \`format\` DROP FOREIGN KEY \`FK_bbed81019dacca36bfab02d27ce\``);
        await queryRunner.query(`DROP TABLE \`format\``);
        await queryRunner.query(`DROP TABLE \`file\``);
    }
}
exports.CreateFileMigration1663314497286 = CreateFileMigration1663314497286;
//# sourceMappingURL=1663314497286-CreateFileMigration.js.map