import { MigrationInterface, QueryRunner } from "typeorm";

export class CreateFileMigration1671728981770 implements MigrationInterface {
    name = 'CreateFileMigration1671728981770'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "temporary_image" ("id" varchar PRIMARY KEY NOT NULL, "path" varchar NOT NULL DEFAULT ('default.jpg'), "updated_at" datetime NOT NULL DEFAULT (datetime('now')), "created_at" datetime NOT NULL DEFAULT (datetime('now')), "clientId" integer NOT NULL)`);
        await queryRunner.query(`INSERT INTO "temporary_image"("id", "path", "updated_at", "created_at") SELECT "id", "path", "updated_at", "created_at" FROM "image"`);
        await queryRunner.query(`DROP TABLE IF EXISTS "image"`);
        await queryRunner.query(`ALTER TABLE "temporary_image" RENAME TO "image"`);
        await queryRunner.query(`CREATE TABLE "temporary_image" ("id" varchar PRIMARY KEY NOT NULL, "path" varchar NOT NULL DEFAULT ('default.jpg'), "updated_at" datetime NOT NULL DEFAULT (datetime('now')), "created_at" datetime NOT NULL DEFAULT (datetime('now')), "clientId" integer NOT NULL, CONSTRAINT "FK_fc6e33aad6b408dbbf64e8cc6ea" FOREIGN KEY ("clientId") REFERENCES "client" ("id") ON DELETE CASCADE ON UPDATE CASCADE )`);
        await queryRunner.query(`INSERT INTO "temporary_image"("id", "path", "updated_at", "created_at", "clientId") SELECT "id", "path", "updated_at", "created_at", "clientId" FROM "image"`);
        await queryRunner.query(`DROP TABLE  "image"`);
        await queryRunner.query(`ALTER TABLE "temporary_image" RENAME TO "image"`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "image" RENAME TO "temporary_image"`);
        await queryRunner.query(`CREATE TABLE "image" ("id" varchar PRIMARY KEY NOT NULL, "path" varchar NOT NULL DEFAULT ('default.jpg'), "updated_at" datetime NOT NULL DEFAULT (datetime('now')), "created_at" datetime NOT NULL DEFAULT (datetime('now')), "clientId" integer NOT NULL)`);
        await queryRunner.query(`INSERT INTO "image"("id", "path", "updated_at", "created_at", "clientId") SELECT "id", "path", "updated_at", "created_at", "clientId" FROM "temporary_image"`);
        await queryRunner.query(`DROP TABLE "temporary_image"`);
        await queryRunner.query(`ALTER TABLE "image" RENAME TO "temporary_image"`);
        await queryRunner.query(`CREATE TABLE "image" ("id" varchar PRIMARY KEY NOT NULL, "path" varchar NOT NULL DEFAULT ('default.jpg'), "updated_at" datetime NOT NULL DEFAULT (datetime('now')), "created_at" datetime NOT NULL DEFAULT (datetime('now')))`);
        await queryRunner.query(`INSERT INTO "image"("id", "path", "updated_at", "created_at") SELECT "id", "path", "updated_at", "created_at" FROM "temporary_image"`);
        await queryRunner.query(`DROP TABLE "temporary_image"`);
    }

}
