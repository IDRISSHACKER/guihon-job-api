import { MigrationInterface, QueryRunner } from "typeorm";

export class CreateFileMigration1663667122442 implements MigrationInterface {
    name = 'CreateFileMigration1663667122442'

    public async up(queryRunner: QueryRunner): Promise<void> {
		await queryRunner.query(`CREATE TABLE IF NOT EXISTS \`format\` (\`id\` varchar(36) NOT NULL, \`resolution\` varchar(255) NOT NULL, \`isOriginal\` tinyint NOT NULL, \`extension\` varchar(255) NOT NULL, \`size\` varchar(255) NOT NULL, \`path\` varchar(255) NOT NULL, \`updated_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`fileId\` int NOT NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE IF NOT EXISTS \`file\` (\`id\` varchar(36) NOT NULL, \`type_code\` varchar(255) NOT NULL, \`application\` varchar(255) NOT NULL, \`root_path\` varchar(255) NOT NULL, \`updated_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`ALTER TABLE \`format\` ADD CONSTRAINT \`FK_bbed81019dacca36bfab02d27ce\` FOREIGN KEY (\`fileId\`) REFERENCES \`file\`(\`id\`) ON DELETE CASCADE ON UPDATE CASCADE`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`format\` DROP FOREIGN KEY \`FK_bbed81019dacca36bfab02d27ce\``);
        await queryRunner.query(`DROP TABLE \`format\``);
        await queryRunner.query(`DROP TABLE \`file\``);
    }

}
