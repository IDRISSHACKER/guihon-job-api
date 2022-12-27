import { MigrationInterface, QueryRunner } from "typeorm";

export class CreateFileMigration1671463839305 implements MigrationInterface {
    name = 'CreateFileMigration1671463839305'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "presence" ("id" varchar PRIMARY KEY NOT NULL, "userId" integer NOT NULL, "ended" boolean NOT NULL DEFAULT (0), "updated_at" datetime NOT NULL DEFAULT (datetime('now')), "created_at" datetime NOT NULL DEFAULT (datetime('now')), CONSTRAINT "REL_6c0fa00ffa14c9eaf62cc32a60" UNIQUE ("userId"))`);
        await queryRunner.query(`CREATE TABLE "employe" ("id" varchar PRIMARY KEY NOT NULL, "nom" varchar NOT NULL, "prenom" varchar NOT NULL, "cni" varchar NOT NULL, "email" varchar NOT NULL, "tel" varchar NOT NULL, "avatar" varchar NOT NULL DEFAULT ('Avatar.jpg'), "basesalary" varchar NOT NULL DEFAULT ('50000'), "secret" varchar NOT NULL DEFAULT ('0000'), "isAdmin" boolean NOT NULL DEFAULT (0), "isSecretary" boolean NOT NULL DEFAULT (0), "updated_at" datetime NOT NULL DEFAULT (datetime('now')), "created_at" datetime NOT NULL DEFAULT (datetime('now')))`);
        await queryRunner.query(`CREATE TABLE "client" ("id" varchar PRIMARY KEY NOT NULL, "nom" varchar NOT NULL, "prenom" varchar NOT NULL, "email" varchar NOT NULL, "tel" varchar NOT NULL, "avatar" varchar NOT NULL DEFAULT ('Default.jpg'), "lieux" varchar NOT NULL DEFAULT ('Douala'), "updated_at" datetime NOT NULL DEFAULT (datetime('now')), "created_at" datetime NOT NULL DEFAULT (datetime('now')))`);
        await queryRunner.query(`CREATE TABLE "temporary_presence" ("id" varchar PRIMARY KEY NOT NULL, "userId" integer NOT NULL, "ended" boolean NOT NULL DEFAULT (0), "updated_at" datetime NOT NULL DEFAULT (datetime('now')), "created_at" datetime NOT NULL DEFAULT (datetime('now')), CONSTRAINT "REL_6c0fa00ffa14c9eaf62cc32a60" UNIQUE ("userId"), CONSTRAINT "FK_6c0fa00ffa14c9eaf62cc32a600" FOREIGN KEY ("userId") REFERENCES "employe" ("id") ON DELETE CASCADE ON UPDATE CASCADE)`);
        await queryRunner.query(`INSERT INTO "temporary_presence"("id", "userId", "ended", "updated_at", "created_at") SELECT "id", "userId", "ended", "updated_at", "created_at" FROM "presence"`);
        await queryRunner.query(`DROP TABLE "presence"`);
        await queryRunner.query(`ALTER TABLE "temporary_presence" RENAME TO "presence"`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "presence" RENAME TO "temporary_presence"`);
        await queryRunner.query(`CREATE TABLE "presence" ("id" varchar PRIMARY KEY NOT NULL, "userId" integer NOT NULL, "ended" boolean NOT NULL DEFAULT (0), "updated_at" datetime NOT NULL DEFAULT (datetime('now')), "created_at" datetime NOT NULL DEFAULT (datetime('now')), CONSTRAINT "REL_6c0fa00ffa14c9eaf62cc32a60" UNIQUE ("userId"))`);
        await queryRunner.query(`INSERT INTO "presence"("id", "userId", "ended", "updated_at", "created_at") SELECT "id", "userId", "ended", "updated_at", "created_at" FROM "temporary_presence"`);
        await queryRunner.query(`DROP TABLE "temporary_presence"`);
        await queryRunner.query(`DROP TABLE "client"`);
        await queryRunner.query(`DROP TABLE "employe"`);
        await queryRunner.query(`DROP TABLE "presence"`);
    }

}
