import {MigrationInterface, QueryRunner} from "typeorm";

export class fix1627087873312 implements MigrationInterface {
    name = 'fix1627087873312'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "shipments_by_orders" DROP COLUMN "cancelation_reazon"`);
        await queryRunner.query(`ALTER TABLE "shipments_by_orders" ADD "cancelation_reazon" character varying(100) NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "shipments_by_orders" DROP COLUMN "cancelation_reazon"`);
        await queryRunner.query(`ALTER TABLE "shipments_by_orders" ADD "cancelation_reazon" character varying(510) NOT NULL`);
    }

}