import { MigrationInterface, QueryRunner } from "typeorm";

export class CreateFileMigration1671965518327 implements MigrationInterface {
    name = 'CreateFileMigration1671965518327'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "temporary_employe" ("id" varchar PRIMARY KEY NOT NULL, "nom" varchar NOT NULL, "prenom" varchar NOT NULL, "cni" varchar NOT NULL DEFAULT ('tetttttt'), "email" varchar NOT NULL, "tel" varchar NOT NULL, "avatar" varchar NOT NULL DEFAULT ('Avatar.jpg'), "basesalary" varchar NOT NULL DEFAULT ('50000'), "secret" varchar NOT NULL DEFAULT ('0000'), "isAdmin" boolean NOT NULL DEFAULT (0), "isSecretary" boolean NOT NULL DEFAULT (0), "updated_at" datetime NOT NULL DEFAULT (datetime('now')), "created_at" datetime NOT NULL DEFAULT (datetime('now')), "token" varchar NOT NULL, "refreshToken" varchar NOT NULL)`);
        await queryRunner.query(`INSERT INTO "temporary_employe"("id", "nom", "prenom", "cni", "email", "tel", "avatar", "basesalary", "secret", "isAdmin", "isSecretary", "updated_at", "created_at") SELECT "id", "nom", "prenom", "cni", "email", "tel", "avatar", "basesalary", "secret", "isAdmin", "isSecretary", "updated_at", "created_at" FROM "employe"`);
        await queryRunner.query(`DROP TABLE "employe"`);
        await queryRunner.query(`ALTER TABLE "temporary_employe" RENAME TO "employe"`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "employe" RENAME TO "temporary_employe"`);
        await queryRunner.query(`CREATE TABLE "employe" ("id" varchar PRIMARY KEY NOT NULL, "nom" varchar NOT NULL, "prenom" varchar NOT NULL, "cni" varchar NOT NULL DEFAULT ('tetttttt'), "email" varchar NOT NULL, "tel" varchar NOT NULL, "avatar" varchar NOT NULL DEFAULT ('Avatar.jpg'), "basesalary" varchar NOT NULL DEFAULT ('50000'), "secret" varchar NOT NULL DEFAULT ('0000'), "isAdmin" boolean NOT NULL DEFAULT (0), "isSecretary" boolean NOT NULL DEFAULT (0), "updated_at" datetime NOT NULL DEFAULT (datetime('now')), "created_at" datetime NOT NULL DEFAULT (datetime('now')))`);
        await queryRunner.query(`INSERT INTO "employe"("id", "nom", "prenom", "cni", "email", "tel", "avatar", "basesalary", "secret", "isAdmin", "isSecretary", "updated_at", "created_at") SELECT "id", "nom", "prenom", "cni", "email", "tel", "avatar", "basesalary", "secret", "isAdmin", "isSecretary", "updated_at", "created_at" FROM "temporary_employe"`);
        await queryRunner.query(`DROP TABLE "temporary_employe"`);
    }

}
