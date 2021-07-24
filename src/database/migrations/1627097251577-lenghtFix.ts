import {MigrationInterface, QueryRunner} from "typeorm";

export class lenghtFix1627097251577 implements MigrationInterface {
    name = 'lenghtFix1627097251577'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "shipments_by_orders" DROP COLUMN "cancelation_reazon"`);
        await queryRunner.query(`ALTER TABLE "shipments_by_orders" ADD "cancelation_reazon" character varying NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "shipments_by_orders" DROP COLUMN "cancelation_reazon"`);
        await queryRunner.query(`ALTER TABLE "shipments_by_orders" ADD "cancelation_reazon" character varying(510) NOT NULL`);
    }

}
