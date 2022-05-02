import {MigrationInterface, QueryRunner} from "typeorm";

export class addingTariffsFields1648864147081 implements MigrationInterface {
    name = 'addingTariffsFields1648864147081'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "routes" ADD "zip_code" character varying(255)`);
        await queryRunner.query(`ALTER TABLE "routes" ADD "caballete_28_ton" integer NOT NULL DEFAULT '0'`);
        await queryRunner.query(`ALTER TABLE "routes" ADD "caballete_30_ton" integer NOT NULL DEFAULT '0'`);
        await queryRunner.query(`ALTER TABLE "routes" ADD "caballete_32_ton" integer NOT NULL DEFAULT '0'`);
        await queryRunner.query(`ALTER TABLE "routes" ADD "low_boy_24_ton" integer NOT NULL DEFAULT '0'`);
        await queryRunner.query(`ALTER TABLE "routes" ADD "low_bed_32_ton" integer NOT NULL DEFAULT '0'`);
        await queryRunner.query(`ALTER TABLE "routes" ADD "low_bed_28_ton" integer NOT NULL DEFAULT '0'`);
        await queryRunner.query(`ALTER TABLE "routes" ADD "torton_16_ton" integer NOT NULL DEFAULT '0'`);
        await queryRunner.query(`ALTER TABLE "routes" ADD "torton_18_ton" integer NOT NULL DEFAULT '0'`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "routes" DROP COLUMN "torton_18_ton"`);
        await queryRunner.query(`ALTER TABLE "routes" DROP COLUMN "torton_16_ton"`);
        await queryRunner.query(`ALTER TABLE "routes" DROP COLUMN "low_bed_28_ton"`);
        await queryRunner.query(`ALTER TABLE "routes" DROP COLUMN "low_bed_32_ton"`);
        await queryRunner.query(`ALTER TABLE "routes" DROP COLUMN "low_boy_24_ton"`);
        await queryRunner.query(`ALTER TABLE "routes" DROP COLUMN "caballete_32_ton"`);
        await queryRunner.query(`ALTER TABLE "routes" DROP COLUMN "caballete_30_ton"`);
        await queryRunner.query(`ALTER TABLE "routes" DROP COLUMN "caballete_28_ton"`);
        await queryRunner.query(`ALTER TABLE "routes" DROP COLUMN "zip_code"`);
    }

}
