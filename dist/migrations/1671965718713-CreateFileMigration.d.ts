import { MigrationInterface, QueryRunner } from "typeorm";
export declare class CreateFileMigration1671965718713 implements MigrationInterface {
    name: string;
    up(queryRunner: QueryRunner): Promise<void>;
    down(queryRunner: QueryRunner): Promise<void>;
}
