import {MigrationInterface, QueryRunner} from "typeorm";

export class UniqueFix1627095238768 implements MigrationInterface {
    name = 'UniqueFix1627095238768'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "shipments_by_orders" ADD CONSTRAINT "UQ_39e95cb4ecf1ca13a69edf42e82" UNIQUE ("shipment_numner")`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "shipments_by_orders" DROP CONSTRAINT "UQ_39e95cb4ecf1ca13a69edf42e82"`);
    }

}
