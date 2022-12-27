"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CreateFileMigration1672050204466 = void 0;
class CreateFileMigration1672050204466 {
    constructor() {
        this.name = 'CreateFileMigration1672050204466';
    }
    async up(queryRunner) {
        await queryRunner.query(`CREATE TABLE "presence" ("id" varchar PRIMARY KEY NOT NULL, "userId" integer NOT NULL, "ended" boolean NOT NULL DEFAULT (0), "updated_at" datetime NOT NULL DEFAULT (datetime('now')), "created_at" datetime NOT NULL DEFAULT (datetime('now')), CONSTRAINT "REL_6c0fa00ffa14c9eaf62cc32a60" UNIQUE ("userId"))`);
        await queryRunner.query(`CREATE TABLE "employe" ("id" varchar PRIMARY KEY NOT NULL, "nom" varchar NOT NULL, "prenom" varchar NOT NULL, "cni" varchar NOT NULL DEFAULT ('tetttttt'), "email" varchar NOT NULL, "tel" varchar NOT NULL, "avatar" varchar NOT NULL DEFAULT ('Avatar.jpg'), "basesalary" varchar NOT NULL DEFAULT ('50000'), "secret" varchar NOT NULL DEFAULT ('0000'), "isAdmin" boolean NOT NULL DEFAULT (0), "isSecretary" boolean NOT NULL DEFAULT (0), "token" varchar NOT NULL DEFAULT (''), "refreshToken" varchar NOT NULL DEFAULT (''), "updated_at" datetime NOT NULL DEFAULT (datetime('now')), "created_at" datetime NOT NULL DEFAULT (datetime('now')))`);
        await queryRunner.query(`CREATE TABLE "image" ("id" varchar PRIMARY KEY NOT NULL, "path" varchar NOT NULL DEFAULT ('default.jpg'), "clientId" integer NOT NULL, "updated_at" datetime NOT NULL DEFAULT (datetime('now')), "created_at" datetime NOT NULL DEFAULT (datetime('now')))`);
        await queryRunner.query(`CREATE TABLE "client" ("id" varchar PRIMARY KEY NOT NULL, "nom" varchar NOT NULL, "prenom" varchar NOT NULL, "email" varchar NOT NULL DEFAULT ('noemail@test.com'), "tel" varchar NOT NULL, "avatar" varchar NOT NULL DEFAULT ('Default.jpg'), "lieux" varchar NOT NULL DEFAULT ('Douala'), "updated_at" datetime NOT NULL DEFAULT (datetime('now')), "created_at" datetime NOT NULL DEFAULT (datetime('now')))`);
        await queryRunner.query(`CREATE TABLE "temporary_presence" ("id" varchar PRIMARY KEY NOT NULL, "userId" integer NOT NULL, "ended" boolean NOT NULL DEFAULT (0), "updated_at" datetime NOT NULL DEFAULT (datetime('now')), "created_at" datetime NOT NULL DEFAULT (datetime('now')), CONSTRAINT "REL_6c0fa00ffa14c9eaf62cc32a60" UNIQUE ("userId"), CONSTRAINT "FK_6c0fa00ffa14c9eaf62cc32a600" FOREIGN KEY ("userId") REFERENCES "employe" ("id") ON DELETE NO ACTION ON UPDATE NO ACTION)`);
        await queryRunner.query(`INSERT INTO "temporary_presence"("id", "userId", "ended", "updated_at", "created_at") SELECT "id", "userId", "ended", "updated_at", "created_at" FROM "presence"`);
        await queryRunner.query(`DROP TABLE "presence"`);
        await queryRunner.query(`ALTER TABLE "temporary_presence" RENAME TO "presence"`);
        await queryRunner.query(`CREATE TABLE "temporary_image" ("id" varchar PRIMARY KEY NOT NULL, "path" varchar NOT NULL DEFAULT ('default.jpg'), "clientId" integer NOT NULL, "updated_at" datetime NOT NULL DEFAULT (datetime('now')), "created_at" datetime NOT NULL DEFAULT (datetime('now')), CONSTRAINT "FK_fc6e33aad6b408dbbf64e8cc6ea" FOREIGN KEY ("clientId") REFERENCES "client" ("id") ON DELETE NO ACTION ON UPDATE NO ACTION)`);
        await queryRunner.query(`INSERT INTO "temporary_image"("id", "path", "clientId", "updated_at", "created_at") SELECT "id", "path", "clientId", "updated_at", "created_at" FROM "image"`);
        await queryRunner.query(`DROP TABLE "image"`);
        await queryRunner.query(`ALTER TABLE "temporary_image" RENAME TO "image"`);
    }
    async down(queryRunner) {
        await queryRunner.query(`ALTER TABLE "image" RENAME TO "temporary_image"`);
        await queryRunner.query(`CREATE TABLE "image" ("id" varchar PRIMARY KEY NOT NULL, "path" varchar NOT NULL DEFAULT ('default.jpg'), "clientId" integer NOT NULL, "updated_at" datetime NOT NULL DEFAULT (datetime('now')), "created_at" datetime NOT NULL DEFAULT (datetime('now')))`);
        await queryRunner.query(`INSERT INTO "image"("id", "path", "clientId", "updated_at", "created_at") SELECT "id", "path", "clientId", "updated_at", "created_at" FROM "temporary_image"`);
        await queryRunner.query(`DROP TABLE "temporary_image"`);
        await queryRunner.query(`ALTER TABLE "presence" RENAME TO "temporary_presence"`);
        await queryRunner.query(`CREATE TABLE "presence" ("id" varchar PRIMARY KEY NOT NULL, "userId" integer NOT NULL, "ended" boolean NOT NULL DEFAULT (0), "updated_at" datetime NOT NULL DEFAULT (datetime('now')), "created_at" datetime NOT NULL DEFAULT (datetime('now')), CONSTRAINT "REL_6c0fa00ffa14c9eaf62cc32a60" UNIQUE ("userId"))`);
        await queryRunner.query(`INSERT INTO "presence"("id", "userId", "ended", "updated_at", "created_at") SELECT "id", "userId", "ended", "updated_at", "created_at" FROM "temporary_presence"`);
        await queryRunner.query(`DROP TABLE "temporary_presence"`);
        await queryRunner.query(`DROP TABLE "client"`);
        await queryRunner.query(`DROP TABLE "image"`);
        await queryRunner.query(`DROP TABLE "employe"`);
        await queryRunner.query(`DROP TABLE "presence"`);
    }
}
exports.CreateFileMigration1672050204466 = CreateFileMigration1672050204466;
//# sourceMappingURL=1672050204466-CreateFileMigration.js.map