import {MigrationInterface, QueryRunner} from "typeorm";

export class CancelationVariable1652319402558 implements MigrationInterface {
    name = 'CancelationVariable1652319402558'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "shipments_by_orders" DROP COLUMN "cancelation_reazon"`);
        await queryRunner.query(`ALTER TABLE "shipments_by_orders" ADD "cancelation_reason" character varying(255)`);
        await queryRunner.query(`ALTER TABLE "shipments_by_orders" ADD "cancelation_variable" character varying(255)`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "shipments_by_orders" DROP COLUMN "cancelation_variable"`);
        await queryRunner.query(`ALTER TABLE "shipments_by_orders" DROP COLUMN "cancelation_reason"`);
        await queryRunner.query(`ALTER TABLE "shipments_by_orders" ADD "cancelation_reazon" character varying(255)`);
    }

}
