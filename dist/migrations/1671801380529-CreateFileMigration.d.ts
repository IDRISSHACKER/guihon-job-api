import { MigrationInterface, QueryRunner } from "typeorm";
export declare class CreateFileMigration1671801380529 implements MigrationInterface {
    name: string;
    up(queryRunner: QueryRunner): Promise<void>;
    down(queryRunner: QueryRunner): Promise<void>;
}
