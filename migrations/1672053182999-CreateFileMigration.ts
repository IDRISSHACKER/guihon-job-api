import { MigrationInterface, QueryRunner } from "typeorm";

export class CreateFileMigration1672053182999 implements MigrationInterface {
    name = 'CreateFileMigration1672053182999'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "temporary_presence" ("id" varchar PRIMARY KEY NOT NULL, "userId" integer NOT NULL, "ended" boolean NOT NULL DEFAULT (0), "updated_at" datetime NOT NULL DEFAULT (datetime('now')), "created_at" datetime NOT NULL DEFAULT (datetime('now')), CONSTRAINT "REL_6c0fa00ffa14c9eaf62cc32a60" UNIQUE ("userId"), CONSTRAINT "FK_6c0fa00ffa14c9eaf62cc32a600" FOREIGN KEY ("userId") REFERENCES "employe" ("id") ON DELETE NO ACTION ON UPDATE NO ACTION)`);
        await queryRunner.query(`INSERT INTO "temporary_presence"("id", "userId", "ended", "updated_at", "created_at") SELECT "id", "userId", "ended", "updated_at", "created_at" FROM "presence"`);
        await queryRunner.query(`DROP TABLE "presence"`);
        await queryRunner.query(`ALTER TABLE "temporary_presence" RENAME TO "presence"`);
        await queryRunner.query(`CREATE TABLE "temporary_presence" ("id" varchar PRIMARY KEY NOT NULL, "userId" integer NOT NULL, "ended" boolean NOT NULL DEFAULT (0), "updated_at" datetime NOT NULL DEFAULT (datetime('now')), "created_at" datetime NOT NULL DEFAULT (datetime('now')), CONSTRAINT "REL_6c0fa00ffa14c9eaf62cc32a60" UNIQUE ("userId"))`);
        await queryRunner.query(`INSERT INTO "temporary_presence"("id", "userId", "ended", "updated_at", "created_at") SELECT "id", "userId", "ended", "updated_at", "created_at" FROM "presence"`);
        await queryRunner.query(`DROP TABLE "presence"`);
        await queryRunner.query(`ALTER TABLE "temporary_presence" RENAME TO "presence"`);
        await queryRunner.query(`CREATE TABLE "temporary_presence" ("id" varchar PRIMARY KEY NOT NULL, "userId" integer NOT NULL, "ended" boolean NOT NULL DEFAULT (0), "updated_at" datetime NOT NULL DEFAULT (datetime('now')), "created_at" datetime NOT NULL DEFAULT (datetime('now')), CONSTRAINT "REL_6c0fa00ffa14c9eaf62cc32a60" UNIQUE ("userId"))`);
        await queryRunner.query(`INSERT INTO "temporary_presence"("id", "userId", "ended", "updated_at", "created_at") SELECT "id", "userId", "ended", "updated_at", "created_at" FROM "presence"`);
        await queryRunner.query(`DROP TABLE "presence"`);
        await queryRunner.query(`ALTER TABLE "temporary_presence" RENAME TO "presence"`);
        await queryRunner.query(`CREATE TABLE "temporary_presence" ("id" varchar PRIMARY KEY NOT NULL, "userId" integer NOT NULL, "ended" boolean NOT NULL DEFAULT (0), "updated_at" datetime NOT NULL DEFAULT (datetime('now')), "created_at" datetime NOT NULL DEFAULT (datetime('now')), CONSTRAINT "REL_6c0fa00ffa14c9eaf62cc32a60" UNIQUE ("userId"), CONSTRAINT "FK_6c0fa00ffa14c9eaf62cc32a600" FOREIGN KEY ("userId") REFERENCES "employe" ("id") ON DELETE NO ACTION ON UPDATE NO ACTION)`);
        await queryRunner.query(`INSERT INTO "temporary_presence"("id", "userId", "ended", "updated_at", "created_at") SELECT "id", "userId", "ended", "updated_at", "created_at" FROM "presence"`);
        await queryRunner.query(`DROP TABLE "presence"`);
        await queryRunner.query(`ALTER TABLE "temporary_presence" RENAME TO "presence"`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "presence" RENAME TO "temporary_presence"`);
        await queryRunner.query(`CREATE TABLE "presence" ("id" varchar PRIMARY KEY NOT NULL, "userId" integer NOT NULL, "ended" boolean NOT NULL DEFAULT (0), "updated_at" datetime NOT NULL DEFAULT (datetime('now')), "created_at" datetime NOT NULL DEFAULT (datetime('now')), CONSTRAINT "REL_6c0fa00ffa14c9eaf62cc32a60" UNIQUE ("userId"))`);
        await queryRunner.query(`INSERT INTO "presence"("id", "userId", "ended", "updated_at", "created_at") SELECT "id", "userId", "ended", "updated_at", "created_at" FROM "temporary_presence"`);
        await queryRunner.query(`DROP TABLE "temporary_presence"`);
        await queryRunner.query(`ALTER TABLE "presence" RENAME TO "temporary_presence"`);
        await queryRunner.query(`CREATE TABLE "presence" ("id" varchar PRIMARY KEY NOT NULL, "userId" integer NOT NULL, "ended" boolean NOT NULL DEFAULT (0), "updated_at" datetime NOT NULL DEFAULT (datetime('now')), "created_at" datetime NOT NULL DEFAULT (datetime('now')), CONSTRAINT "REL_6c0fa00ffa14c9eaf62cc32a60" UNIQUE ("userId"))`);
        await queryRunner.query(`INSERT INTO "presence"("id", "userId", "ended", "updated_at", "created_at") SELECT "id", "userId", "ended", "updated_at", "created_at" FROM "temporary_presence"`);
        await queryRunner.query(`DROP TABLE "temporary_presence"`);
        await queryRunner.query(`ALTER TABLE "presence" RENAME TO "temporary_presence"`);
        await queryRunner.query(`CREATE TABLE "presence" ("id" varchar PRIMARY KEY NOT NULL, "userId" integer NOT NULL, "ended" boolean NOT NULL DEFAULT (0), "updated_at" datetime NOT NULL DEFAULT (datetime('now')), "created_at" datetime NOT NULL DEFAULT (datetime('now')), CONSTRAINT "REL_6c0fa00ffa14c9eaf62cc32a60" UNIQUE ("userId"), CONSTRAINT "FK_6c0fa00ffa14c9eaf62cc32a600" FOREIGN KEY ("userId") REFERENCES "employe" ("id") ON DELETE NO ACTION ON UPDATE NO ACTION)`);
        await queryRunner.query(`INSERT INTO "presence"("id", "userId", "ended", "updated_at", "created_at") SELECT "id", "userId", "ended", "updated_at", "created_at" FROM "temporary_presence"`);
        await queryRunner.query(`DROP TABLE "temporary_presence"`);
        await queryRunner.query(`ALTER TABLE "presence" RENAME TO "temporary_presence"`);
        await queryRunner.query(`CREATE TABLE "presence" ("id" varchar PRIMARY KEY NOT NULL, "userId" integer NOT NULL, "ended" boolean NOT NULL DEFAULT (0), "updated_at" datetime NOT NULL DEFAULT (datetime('now')), "created_at" datetime NOT NULL DEFAULT (datetime('now')), CONSTRAINT "REL_6c0fa00ffa14c9eaf62cc32a60" UNIQUE ("userId"), CONSTRAINT "FK_6c0fa00ffa14c9eaf62cc32a600" FOREIGN KEY ("userId") REFERENCES "employe" ("id") ON DELETE NO ACTION ON UPDATE NO ACTION)`);
        await queryRunner.query(`INSERT INTO "presence"("id", "userId", "ended", "updated_at", "created_at") SELECT "id", "userId", "ended", "updated_at", "created_at" FROM "temporary_presence"`);
        await queryRunner.query(`DROP TABLE "temporary_presence"`);
    }

}
