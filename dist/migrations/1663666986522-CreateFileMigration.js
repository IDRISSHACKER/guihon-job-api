"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CreateFileMigration1663666986522 = void 0;
class CreateFileMigration1663666986522 {
    constructor() {
        this.name = 'CreateFileMigration1663666986522';
    }
    async up(queryRunner) {
        await queryRunner.query(`ALTER TABLE \`format\` DROP FOREIGN KEY \`FK_bbed81019dacca36bfab02d27ce\``);
        await queryRunner.query(`ALTER TABLE \`format\` DROP COLUMN \`fileId\``);
        await queryRunner.query(`ALTER TABLE \`format\` ADD \`fileId\` int NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`format\` ADD CONSTRAINT \`FK_bbed81019dacca36bfab02d27ce\` FOREIGN KEY (\`fileId\`) REFERENCES \`file\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }
    async down(queryRunner) {
        await queryRunner.query(`ALTER TABLE \`format\` DROP FOREIGN KEY \`FK_bbed81019dacca36bfab02d27ce\``);
        await queryRunner.query(`ALTER TABLE \`format\` DROP COLUMN \`fileId\``);
        await queryRunner.query(`ALTER TABLE \`format\` ADD \`fileId\` varchar(36) NULL DEFAULT 'NULL'`);
        await queryRunner.query(`ALTER TABLE \`format\` ADD CONSTRAINT \`FK_bbed81019dacca36bfab02d27ce\` FOREIGN KEY (\`fileId\`) REFERENCES \`file\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }
}
exports.CreateFileMigration1663666986522 = CreateFileMigration1663666986522;
//# sourceMappingURL=1663666986522-CreateFileMigration.js.map