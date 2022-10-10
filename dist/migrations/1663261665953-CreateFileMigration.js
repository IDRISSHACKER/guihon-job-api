"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CreateFileMigration1663261665953 = void 0;
class CreateFileMigration1663261665953 {
    constructor() {
        this.name = 'CreateFileMigration1663261665953';
    }
    async up(queryRunner) {
        await queryRunner.query(`ALTER TABLE \`format\` CHANGE \`fileId\` \`fileId\` int NULL`);
        await queryRunner.query(`ALTER TABLE \`format\` ADD CONSTRAINT \`FK_bbed81019dacca36bfab02d27ce\` FOREIGN KEY (\`fileId\`) REFERENCES \`file\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }
    async down(queryRunner) {
        await queryRunner.query(`ALTER TABLE \`format\` DROP FOREIGN KEY \`FK_bbed81019dacca36bfab02d27ce\``);
        await queryRunner.query(`ALTER TABLE \`format\` CHANGE \`fileId\` \`fileId\` int NULL DEFAULT 'NULL'`);
    }
}
exports.CreateFileMigration1663261665953 = CreateFileMigration1663261665953;
//# sourceMappingURL=1663261665953-CreateFileMigration.js.map