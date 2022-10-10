import { MigrationInterface, QueryRunner } from "typeorm";

export class CreateFileMigration1663666986522 implements MigrationInterface {
    name = 'CreateFileMigration1663666986522'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`format\` DROP FOREIGN KEY \`FK_bbed81019dacca36bfab02d27ce\``);
        await queryRunner.query(`ALTER TABLE \`format\` DROP COLUMN \`fileId\``);
        await queryRunner.query(`ALTER TABLE \`format\` ADD \`fileId\` int NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`format\` ADD CONSTRAINT \`FK_bbed81019dacca36bfab02d27ce\` FOREIGN KEY (\`fileId\`) REFERENCES \`file\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`format\` DROP FOREIGN KEY \`FK_bbed81019dacca36bfab02d27ce\``);
        await queryRunner.query(`ALTER TABLE \`format\` DROP COLUMN \`fileId\``);
        await queryRunner.query(`ALTER TABLE \`format\` ADD \`fileId\` varchar(36) NULL DEFAULT 'NULL'`);
        await queryRunner.query(`ALTER TABLE \`format\` ADD CONSTRAINT \`FK_bbed81019dacca36bfab02d27ce\` FOREIGN KEY (\`fileId\`) REFERENCES \`file\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

}
