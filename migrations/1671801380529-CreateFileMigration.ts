import { MigrationInterface, QueryRunner } from "typeorm";

export class CreateFileMigration1671801380529 implements MigrationInterface {
    name = 'CreateFileMigration1671801380529'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "temporary_client" ("id" varchar PRIMARY KEY NOT NULL, "nom" varchar NOT NULL, "prenom" varchar NOT NULL, "email" varchar NOT NULL DEFAULT ('noemail@test.com'), "tel" varchar NOT NULL, "avatar" varchar NOT NULL DEFAULT ('Default.jpg'), "lieux" varchar NOT NULL DEFAULT ('Douala'), "updated_at" datetime NOT NULL DEFAULT (datetime('now')), "created_at" datetime NOT NULL DEFAULT (datetime('now')))`);
        await queryRunner.query(`INSERT INTO "temporary_client"("id", "nom", "prenom", "email", "tel", "avatar", "lieux", "updated_at", "created_at") SELECT "id", "nom", "prenom", "email", "tel", "avatar", "lieux", "updated_at", "created_at" FROM "client"`);
        await queryRunner.query(`DROP TABLE "client"`);
        await queryRunner.query(`ALTER TABLE "temporary_client" RENAME TO "client"`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "client" RENAME TO "temporary_client"`);
        await queryRunner.query(`CREATE TABLE "client" ("id" varchar PRIMARY KEY NOT NULL, "nom" varchar NOT NULL, "prenom" varchar NOT NULL, "email" varchar NOT NULL, "tel" varchar NOT NULL, "avatar" varchar NOT NULL DEFAULT ('Default.jpg'), "lieux" varchar NOT NULL DEFAULT ('Douala'), "updated_at" datetime NOT NULL DEFAULT (datetime('now')), "created_at" datetime NOT NULL DEFAULT (datetime('now')))`);
        await queryRunner.query(`INSERT INTO "client"("id", "nom", "prenom", "email", "tel", "avatar", "lieux", "updated_at", "created_at") SELECT "id", "nom", "prenom", "email", "tel", "avatar", "lieux", "updated_at", "created_at" FROM "temporary_client"`);
        await queryRunner.query(`DROP TABLE "temporary_client"`);
    }

}
