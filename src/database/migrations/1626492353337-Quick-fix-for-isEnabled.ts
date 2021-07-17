import {MigrationInterface, QueryRunner} from "typeorm";

export class QuickFixForIsEnabled1626492353337 implements MigrationInterface {
    name = 'QuickFixForIsEnabled1626492353337'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "users" RENAME COLUMN "isEnabled" TO "is_enabled"`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "users" RENAME COLUMN "is_enabled" TO "isEnabled"`);
    }

}
