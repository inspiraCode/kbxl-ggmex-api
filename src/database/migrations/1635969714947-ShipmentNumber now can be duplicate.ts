import {MigrationInterface, QueryRunner} from "typeorm";

export class ShipmentNumberNowCanBeDuplicate1635969714947 implements MigrationInterface {
    name = 'ShipmentNumberNowCanBeDuplicate1635969714947'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "shipments_by_orders" DROP CONSTRAINT "UQ_39e95cb4ecf1ca13a69edf42e82"`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "shipments_by_orders" ADD CONSTRAINT "UQ_39e95cb4ecf1ca13a69edf42e82" UNIQUE ("shipment_numner")`);
    }

}
