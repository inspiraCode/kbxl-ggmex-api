import {MigrationInterface, QueryRunner} from "typeorm";

export class init21629263571317 implements MigrationInterface {
    name = 'init21629263571317'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "shipments_by_orders" DROP COLUMN "tms"`);
        await queryRunner.query(`ALTER TABLE "shipments_by_orders" ADD "tsm" character varying(255)`);
        await queryRunner.query(`ALTER TABLE "shipments_by_orders" ALTER COLUMN "delivery_terms" DROP NOT NULL`);
        await queryRunner.query(`ALTER TABLE "shipments_by_orders" ALTER COLUMN "ligistics_agent" DROP NOT NULL`);
        await queryRunner.query(`ALTER TABLE "shipments_by_orders" ALTER COLUMN "sr_freight" DROP NOT NULL`);
        await queryRunner.query(`ALTER TABLE "shipments_by_orders" ALTER COLUMN "order_freight" DROP NOT NULL`);
        await queryRunner.query(`ALTER TABLE "shipments_by_orders" ALTER COLUMN "transport_status" DROP NOT NULL`);
        await queryRunner.query(`ALTER TABLE "shipments_by_orders" ALTER COLUMN "order_status" DROP NOT NULL`);
        await queryRunner.query(`ALTER TABLE "shipments_by_orders" ALTER COLUMN "financial_status" DROP NOT NULL`);
        await queryRunner.query(`ALTER TABLE "shipments_by_orders" ALTER COLUMN "sr_header_comments" DROP NOT NULL`);
        await queryRunner.query(`ALTER TABLE "shipments_by_orders" ALTER COLUMN "order_header_comment" DROP NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "shipments_by_orders" ALTER COLUMN "order_header_comment" SET NOT NULL`);
        await queryRunner.query(`ALTER TABLE "shipments_by_orders" ALTER COLUMN "sr_header_comments" SET NOT NULL`);
        await queryRunner.query(`ALTER TABLE "shipments_by_orders" ALTER COLUMN "financial_status" SET NOT NULL`);
        await queryRunner.query(`ALTER TABLE "shipments_by_orders" ALTER COLUMN "order_status" SET NOT NULL`);
        await queryRunner.query(`ALTER TABLE "shipments_by_orders" ALTER COLUMN "transport_status" SET NOT NULL`);
        await queryRunner.query(`ALTER TABLE "shipments_by_orders" ALTER COLUMN "order_freight" SET NOT NULL`);
        await queryRunner.query(`ALTER TABLE "shipments_by_orders" ALTER COLUMN "sr_freight" SET NOT NULL`);
        await queryRunner.query(`ALTER TABLE "shipments_by_orders" ALTER COLUMN "ligistics_agent" SET NOT NULL`);
        await queryRunner.query(`ALTER TABLE "shipments_by_orders" ALTER COLUMN "delivery_terms" SET NOT NULL`);
        await queryRunner.query(`ALTER TABLE "shipments_by_orders" DROP COLUMN "tsm"`);
        await queryRunner.query(`ALTER TABLE "shipments_by_orders" ADD "tms" character varying(255) NOT NULL`);
    }

}
