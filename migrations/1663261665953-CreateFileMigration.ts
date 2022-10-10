import { MigrationInterface, QueryRunner } from "typeorm";

export class CreateFileMigration1663261665953 implements MigrationInterface {
    name = 'CreateFileMigration1663261665953'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`format\` CHANGE \`fileId\` \`fileId\` int NULL`);
        await queryRunner.query(`ALTER TABLE \`format\` ADD CONSTRAINT \`FK_bbed81019dacca36bfab02d27ce\` FOREIGN KEY (\`fileId\`) REFERENCES \`file\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`format\` DROP FOREIGN KEY \`FK_bbed81019dacca36bfab02d27ce\``);
        await queryRunner.query(`ALTER TABLE \`format\` CHANGE \`fileId\` \`fileId\` int NULL DEFAULT 'NULL'`);
    }

}
