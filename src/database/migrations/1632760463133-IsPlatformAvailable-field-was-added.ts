import {MigrationInterface, QueryRunner} from "typeorm";

export class IsPlatformAvailableFieldWasAdded1632760463133 implements MigrationInterface {
    name = 'IsPlatformAvailableFieldWasAdded1632760463133'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "units_available" ADD "is_platform_available" boolean NOT NULL DEFAULT false`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "units_available" DROP COLUMN "is_platform_available"`);
    }

}
