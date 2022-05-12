import {MigrationInterface, QueryRunner} from "typeorm";

export class SATMaterialComments1652126100011 implements MigrationInterface {
    name = 'SATMaterialComments1652126100011'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "shipments_by_orders" ADD "kbx_comments" character varying(510)`);
        await queryRunner.query(`ALTER TABLE "shipments_by_orders" ADD "sat_comments" character varying(510)`);
        await queryRunner.query(`ALTER TABLE "shipments_by_orders" DROP COLUMN "cancelation_reazon"`);
        await queryRunner.query(`ALTER TABLE "shipments_by_orders" ADD "cancelation_reazon" character varying(255)`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "shipments_by_orders" DROP COLUMN "cancelation_reazon"`);
        await queryRunner.query(`ALTER TABLE "shipments_by_orders" ADD "cancelation_reazon" character varying`);
        await queryRunner.query(`ALTER TABLE "shipments_by_orders" DROP COLUMN "sat_comments"`);
        await queryRunner.query(`ALTER TABLE "shipments_by_orders" DROP COLUMN "kbx_comments"`);
    }

}
