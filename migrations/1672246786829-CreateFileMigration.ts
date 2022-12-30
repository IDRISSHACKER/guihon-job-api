import { MigrationInterface, QueryRunner } from "typeorm";

export class CreateFileMigration1672246786829 implements MigrationInterface {
    name = 'CreateFileMigration1672246786829'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "presence" ("id" varchar PRIMARY KEY NOT NULL, "userId" integer NOT NULL, "ended" boolean NOT NULL DEFAULT (0), "updated_at" datetime NOT NULL DEFAULT (datetime('now')), "created_at" datetime NOT NULL DEFAULT (datetime('now')))`);
        await queryRunner.query(`CREATE TABLE "employe" ("id" varchar PRIMARY KEY NOT NULL, "nom" varchar NOT NULL, "prenom" varchar NOT NULL, "cni" varchar NOT NULL DEFAULT ('tetttttt'), "email" varchar NOT NULL, "tel" varchar NOT NULL, "avatar" varchar NOT NULL DEFAULT ('Avatar.jpg'), "basesalary" varchar NOT NULL DEFAULT ('50000'), "secret" varchar NOT NULL DEFAULT ('0000'), "isAdmin" boolean NOT NULL DEFAULT (0), "isSecretary" boolean NOT NULL DEFAULT (0), "token" varchar NOT NULL DEFAULT (''), "refreshToken" varchar NOT NULL DEFAULT (''), "updated_at" datetime NOT NULL DEFAULT (datetime('now')), "created_at" datetime NOT NULL DEFAULT (datetime('now')))`);
        await queryRunner.query(`CREATE TABLE "image" ("id" varchar PRIMARY KEY NOT NULL, "path" varchar NOT NULL DEFAULT ('default.jpg'), "clientId" integer NOT NULL, "updated_at" datetime NOT NULL DEFAULT (datetime('now')), "created_at" datetime NOT NULL DEFAULT (datetime('now')))`);
        await queryRunner.query(`CREATE TABLE "employetache" ("id" varchar PRIMARY KEY NOT NULL, "userId" varchar NOT NULL, "tacheId" varchar NOT NULL, "isAdmin" boolean NOT NULL DEFAULT (0), "updated_at" datetime NOT NULL DEFAULT (datetime('now')), "created_at" datetime NOT NULL DEFAULT (datetime('now')))`);
        await queryRunner.query(`CREATE TABLE "tache" ("id" varchar PRIMARY KEY NOT NULL, "planingId" integer NOT NULL, "ended" boolean NOT NULL DEFAULT (0), "rapport" varchar NOT NULL DEFAULT (''), "startImg" varchar NOT NULL DEFAULT (''), "start_at" varchar NOT NULL DEFAULT (''), "endImg" varchar NOT NULL DEFAULT (''), "ended_at" varchar NOT NULL DEFAULT (''), "updated_at" datetime NOT NULL DEFAULT (datetime('now')), "created_at" datetime NOT NULL DEFAULT (datetime('now')))`);
        await queryRunner.query(`CREATE TABLE "planing" ("id" varchar PRIMARY KEY NOT NULL, "title" varchar NOT NULL DEFAULT (''), "clientId" integer NOT NULL, "rewindDay" integer NOT NULL, "prix" integer NOT NULL, "updated_at" datetime NOT NULL DEFAULT (datetime('now')), "created_at" datetime NOT NULL DEFAULT (datetime('now')), CONSTRAINT "REL_97d06fe2e120af7b36e3861a36" UNIQUE ("clientId"))`);
        await queryRunner.query(`CREATE TABLE "client" ("id" varchar PRIMARY KEY NOT NULL, "nom" varchar NOT NULL, "prenom" varchar NOT NULL, "email" varchar NOT NULL DEFAULT ('noemail@test.com'), "tel" varchar NOT NULL, "avatar" varchar NOT NULL DEFAULT ('Default.jpg'), "lieux" varchar NOT NULL DEFAULT ('Douala'), "updated_at" datetime NOT NULL DEFAULT (datetime('now')), "created_at" datetime NOT NULL DEFAULT (datetime('now')))`);
        await queryRunner.query(`CREATE TABLE "tache_employestaches_employetache" ("tacheId" integer NOT NULL, "employetacheId" integer NOT NULL, PRIMARY KEY ("tacheId", "employetacheId"))`);
        await queryRunner.query(`CREATE INDEX "IDX_5744b483160ee0eaa040dedfed" ON "tache_employestaches_employetache" ("tacheId") `);
        await queryRunner.query(`CREATE INDEX "IDX_97d8b1a9e7733eabdd2d0d2633" ON "tache_employestaches_employetache" ("employetacheId") `);
        await queryRunner.query(`CREATE TABLE "temporary_presence" ("id" varchar PRIMARY KEY NOT NULL, "userId" integer NOT NULL, "ended" boolean NOT NULL DEFAULT (0), "updated_at" datetime NOT NULL DEFAULT (datetime('now')), "created_at" datetime NOT NULL DEFAULT (datetime('now')), CONSTRAINT "FK_6c0fa00ffa14c9eaf62cc32a600" FOREIGN KEY ("userId") REFERENCES "employe" ("id") ON DELETE CASCADE ON UPDATE NO ACTION)`);
        await queryRunner.query(`INSERT INTO "temporary_presence"("id", "userId", "ended", "updated_at", "created_at") SELECT "id", "userId", "ended", "updated_at", "created_at" FROM "presence"`);
        await queryRunner.query(`DROP TABLE "presence"`);
        await queryRunner.query(`ALTER TABLE "temporary_presence" RENAME TO "presence"`);
        await queryRunner.query(`CREATE TABLE "temporary_image" ("id" varchar PRIMARY KEY NOT NULL, "path" varchar NOT NULL DEFAULT ('default.jpg'), "clientId" integer NOT NULL, "updated_at" datetime NOT NULL DEFAULT (datetime('now')), "created_at" datetime NOT NULL DEFAULT (datetime('now')), CONSTRAINT "FK_fc6e33aad6b408dbbf64e8cc6ea" FOREIGN KEY ("clientId") REFERENCES "client" ("id") ON DELETE CASCADE ON UPDATE NO ACTION)`);
        await queryRunner.query(`INSERT INTO "temporary_image"("id", "path", "clientId", "updated_at", "created_at") SELECT "id", "path", "clientId", "updated_at", "created_at" FROM "image"`);
        await queryRunner.query(`DROP TABLE "image"`);
        await queryRunner.query(`ALTER TABLE "temporary_image" RENAME TO "image"`);
        await queryRunner.query(`CREATE TABLE "temporary_tache" ("id" varchar PRIMARY KEY NOT NULL, "planingId" integer NOT NULL, "ended" boolean NOT NULL DEFAULT (0), "rapport" varchar NOT NULL DEFAULT (''), "startImg" varchar NOT NULL DEFAULT (''), "start_at" varchar NOT NULL DEFAULT (''), "endImg" varchar NOT NULL DEFAULT (''), "ended_at" varchar NOT NULL DEFAULT (''), "updated_at" datetime NOT NULL DEFAULT (datetime('now')), "created_at" datetime NOT NULL DEFAULT (datetime('now')), CONSTRAINT "FK_c491efc6816d9e1bbc831930a77" FOREIGN KEY ("planingId") REFERENCES "planing" ("id") ON DELETE CASCADE ON UPDATE NO ACTION)`);
        await queryRunner.query(`INSERT INTO "temporary_tache"("id", "planingId", "ended", "rapport", "startImg", "start_at", "endImg", "ended_at", "updated_at", "created_at") SELECT "id", "planingId", "ended", "rapport", "startImg", "start_at", "endImg", "ended_at", "updated_at", "created_at" FROM "tache"`);
        await queryRunner.query(`DROP TABLE "tache"`);
        await queryRunner.query(`ALTER TABLE "temporary_tache" RENAME TO "tache"`);
        await queryRunner.query(`CREATE TABLE "temporary_planing" ("id" varchar PRIMARY KEY NOT NULL, "title" varchar NOT NULL DEFAULT (''), "clientId" integer NOT NULL, "rewindDay" integer NOT NULL, "prix" integer NOT NULL, "updated_at" datetime NOT NULL DEFAULT (datetime('now')), "created_at" datetime NOT NULL DEFAULT (datetime('now')), CONSTRAINT "REL_97d06fe2e120af7b36e3861a36" UNIQUE ("clientId"), CONSTRAINT "FK_97d06fe2e120af7b36e3861a368" FOREIGN KEY ("clientId") REFERENCES "client" ("id") ON DELETE CASCADE ON UPDATE NO ACTION)`);
        await queryRunner.query(`INSERT INTO "temporary_planing"("id", "title", "clientId", "rewindDay", "prix", "updated_at", "created_at") SELECT "id", "title", "clientId", "rewindDay", "prix", "updated_at", "created_at" FROM "planing"`);
        await queryRunner.query(`DROP TABLE "planing"`);
        await queryRunner.query(`ALTER TABLE "temporary_planing" RENAME TO "planing"`);
        await queryRunner.query(`DROP INDEX "IDX_5744b483160ee0eaa040dedfed"`);
        await queryRunner.query(`DROP INDEX "IDX_97d8b1a9e7733eabdd2d0d2633"`);
        await queryRunner.query(`CREATE TABLE "temporary_tache_employestaches_employetache" ("tacheId" integer NOT NULL, "employetacheId" integer NOT NULL, CONSTRAINT "FK_5744b483160ee0eaa040dedfed9" FOREIGN KEY ("tacheId") REFERENCES "tache" ("id") ON DELETE CASCADE ON UPDATE CASCADE, CONSTRAINT "FK_97d8b1a9e7733eabdd2d0d2633f" FOREIGN KEY ("employetacheId") REFERENCES "employetache" ("id") ON DELETE CASCADE ON UPDATE NO ACTION, PRIMARY KEY ("tacheId", "employetacheId"))`);
        await queryRunner.query(`INSERT INTO "temporary_tache_employestaches_employetache"("tacheId", "employetacheId") SELECT "tacheId", "employetacheId" FROM "tache_employestaches_employetache"`);
        await queryRunner.query(`DROP TABLE "tache_employestaches_employetache"`);
        await queryRunner.query(`ALTER TABLE "temporary_tache_employestaches_employetache" RENAME TO "tache_employestaches_employetache"`);
        await queryRunner.query(`CREATE INDEX "IDX_5744b483160ee0eaa040dedfed" ON "tache_employestaches_employetache" ("tacheId") `);
        await queryRunner.query(`CREATE INDEX "IDX_97d8b1a9e7733eabdd2d0d2633" ON "tache_employestaches_employetache" ("employetacheId") `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP INDEX "IDX_97d8b1a9e7733eabdd2d0d2633"`);
        await queryRunner.query(`DROP INDEX "IDX_5744b483160ee0eaa040dedfed"`);
        await queryRunner.query(`ALTER TABLE "tache_employestaches_employetache" RENAME TO "temporary_tache_employestaches_employetache"`);
        await queryRunner.query(`CREATE TABLE "tache_employestaches_employetache" ("tacheId" integer NOT NULL, "employetacheId" integer NOT NULL, PRIMARY KEY ("tacheId", "employetacheId"))`);
        await queryRunner.query(`INSERT INTO "tache_employestaches_employetache"("tacheId", "employetacheId") SELECT "tacheId", "employetacheId" FROM "temporary_tache_employestaches_employetache"`);
        await queryRunner.query(`DROP TABLE "temporary_tache_employestaches_employetache"`);
        await queryRunner.query(`CREATE INDEX "IDX_97d8b1a9e7733eabdd2d0d2633" ON "tache_employestaches_employetache" ("employetacheId") `);
        await queryRunner.query(`CREATE INDEX "IDX_5744b483160ee0eaa040dedfed" ON "tache_employestaches_employetache" ("tacheId") `);
        await queryRunner.query(`ALTER TABLE "planing" RENAME TO "temporary_planing"`);
        await queryRunner.query(`CREATE TABLE "planing" ("id" varchar PRIMARY KEY NOT NULL, "title" varchar NOT NULL DEFAULT (''), "clientId" integer NOT NULL, "rewindDay" integer NOT NULL, "prix" integer NOT NULL, "updated_at" datetime NOT NULL DEFAULT (datetime('now')), "created_at" datetime NOT NULL DEFAULT (datetime('now')), CONSTRAINT "REL_97d06fe2e120af7b36e3861a36" UNIQUE ("clientId"))`);
        await queryRunner.query(`INSERT INTO "planing"("id", "title", "clientId", "rewindDay", "prix", "updated_at", "created_at") SELECT "id", "title", "clientId", "rewindDay", "prix", "updated_at", "created_at" FROM "temporary_planing"`);
        await queryRunner.query(`DROP TABLE "temporary_planing"`);
        await queryRunner.query(`ALTER TABLE "tache" RENAME TO "temporary_tache"`);
        await queryRunner.query(`CREATE TABLE "tache" ("id" varchar PRIMARY KEY NOT NULL, "planingId" integer NOT NULL, "ended" boolean NOT NULL DEFAULT (0), "rapport" varchar NOT NULL DEFAULT (''), "startImg" varchar NOT NULL DEFAULT (''), "start_at" varchar NOT NULL DEFAULT (''), "endImg" varchar NOT NULL DEFAULT (''), "ended_at" varchar NOT NULL DEFAULT (''), "updated_at" datetime NOT NULL DEFAULT (datetime('now')), "created_at" datetime NOT NULL DEFAULT (datetime('now')))`);
        await queryRunner.query(`INSERT INTO "tache"("id", "planingId", "ended", "rapport", "startImg", "start_at", "endImg", "ended_at", "updated_at", "created_at") SELECT "id", "planingId", "ended", "rapport", "startImg", "start_at", "endImg", "ended_at", "updated_at", "created_at" FROM "temporary_tache"`);
        await queryRunner.query(`DROP TABLE "temporary_tache"`);
        await queryRunner.query(`ALTER TABLE "image" RENAME TO "temporary_image"`);
        await queryRunner.query(`CREATE TABLE "image" ("id" varchar PRIMARY KEY NOT NULL, "path" varchar NOT NULL DEFAULT ('default.jpg'), "clientId" integer NOT NULL, "updated_at" datetime NOT NULL DEFAULT (datetime('now')), "created_at" datetime NOT NULL DEFAULT (datetime('now')))`);
        await queryRunner.query(`INSERT INTO "image"("id", "path", "clientId", "updated_at", "created_at") SELECT "id", "path", "clientId", "updated_at", "created_at" FROM "temporary_image"`);
        await queryRunner.query(`DROP TABLE "temporary_image"`);
        await queryRunner.query(`ALTER TABLE "presence" RENAME TO "temporary_presence"`);
        await queryRunner.query(`CREATE TABLE "presence" ("id" varchar PRIMARY KEY NOT NULL, "userId" integer NOT NULL, "ended" boolean NOT NULL DEFAULT (0), "updated_at" datetime NOT NULL DEFAULT (datetime('now')), "created_at" datetime NOT NULL DEFAULT (datetime('now')))`);
        await queryRunner.query(`INSERT INTO "presence"("id", "userId", "ended", "updated_at", "created_at") SELECT "id", "userId", "ended", "updated_at", "created_at" FROM "temporary_presence"`);
        await queryRunner.query(`DROP TABLE "temporary_presence"`);
        await queryRunner.query(`DROP INDEX "IDX_97d8b1a9e7733eabdd2d0d2633"`);
        await queryRunner.query(`DROP INDEX "IDX_5744b483160ee0eaa040dedfed"`);
        await queryRunner.query(`DROP TABLE "tache_employestaches_employetache"`);
        await queryRunner.query(`DROP TABLE "client"`);
        await queryRunner.query(`DROP TABLE "planing"`);
        await queryRunner.query(`DROP TABLE "tache"`);
        await queryRunner.query(`DROP TABLE "employetache"`);
        await queryRunner.query(`DROP TABLE "image"`);
        await queryRunner.query(`DROP TABLE "employe"`);
        await queryRunner.query(`DROP TABLE "presence"`);
    }

}
