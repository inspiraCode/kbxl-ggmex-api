import {MigrationInterface, QueryRunner} from "typeorm";

export class FloatFix1627097024496 implements MigrationInterface {
    name = 'FloatFix1627097024496'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "shipments_by_orders" DROP COLUMN "weight"`);
        await queryRunner.query(`ALTER TABLE "shipments_by_orders" ADD "weight" double precision NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "shipments_by_orders" DROP COLUMN "weight"`);
        await queryRunner.query(`ALTER TABLE "shipments_by_orders" ADD "weight" integer NOT NULL`);
    }

}
