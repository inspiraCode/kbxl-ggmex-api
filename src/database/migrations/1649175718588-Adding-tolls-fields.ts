import {MigrationInterface, QueryRunner} from "typeorm";

export class AddingTollsFields1649175718588 implements MigrationInterface {
    name = 'AddingTollsFields1649175718588'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "routes" ADD "trip_type" character varying(25)`);
        await queryRunner.query(`ALTER TABLE "routes" ADD "tolls_28_ton" double precision NOT NULL DEFAULT '0'`);
        await queryRunner.query(`ALTER TABLE "routes" ADD "tolls_30_ton" double precision NOT NULL DEFAULT '0'`);
        await queryRunner.query(`ALTER TABLE "routes" ADD "tolls_32_ton" double precision NOT NULL DEFAULT '0'`);
        await queryRunner.query(`ALTER TABLE "routes" ADD "tolls_24_ton" double precision NOT NULL DEFAULT '0'`);
        await queryRunner.query(`ALTER TABLE "routes" ADD "tolls_low_bed_32_ton" double precision NOT NULL DEFAULT '0'`);
        await queryRunner.query(`ALTER TABLE "routes" ADD "tolls_low_bed_28_ton" double precision NOT NULL DEFAULT '0'`);
        await queryRunner.query(`ALTER TABLE "routes" ADD "tolls_16_ton" double precision NOT NULL DEFAULT '0'`);
        await queryRunner.query(`ALTER TABLE "routes" ADD "tolls_18_ton" double precision NOT NULL DEFAULT '0'`);
        await queryRunner.query(`ALTER TABLE "routes" ADD "is_deleted" boolean NOT NULL DEFAULT false`);
        await queryRunner.query(`ALTER TABLE "routes" ADD "created_by" character varying(80)`);
        await queryRunner.query(`ALTER TABLE "routes" ADD "updated_by" character varying(80)`);
        await queryRunner.query(`ALTER TABLE "routes" ADD "deleted_by" character varying(80)`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "routes" DROP COLUMN "deleted_by"`);
        await queryRunner.query(`ALTER TABLE "routes" DROP COLUMN "updated_by"`);
        await queryRunner.query(`ALTER TABLE "routes" DROP COLUMN "created_by"`);
        await queryRunner.query(`ALTER TABLE "routes" DROP COLUMN "is_deleted"`);
        await queryRunner.query(`ALTER TABLE "routes" DROP COLUMN "tolls_18_ton"`);
        await queryRunner.query(`ALTER TABLE "routes" DROP COLUMN "tolls_16_ton"`);
        await queryRunner.query(`ALTER TABLE "routes" DROP COLUMN "tolls_low_bed_28_ton"`);
        await queryRunner.query(`ALTER TABLE "routes" DROP COLUMN "tolls_low_bed_32_ton"`);
        await queryRunner.query(`ALTER TABLE "routes" DROP COLUMN "tolls_24_ton"`);
        await queryRunner.query(`ALTER TABLE "routes" DROP COLUMN "tolls_32_ton"`);
        await queryRunner.query(`ALTER TABLE "routes" DROP COLUMN "tolls_30_ton"`);
        await queryRunner.query(`ALTER TABLE "routes" DROP COLUMN "tolls_28_ton"`);
        await queryRunner.query(`ALTER TABLE "routes" DROP COLUMN "trip_type"`);
    }

}
