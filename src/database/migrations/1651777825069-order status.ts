import {MigrationInterface, QueryRunner} from "typeorm";

export class orderStatus1651777825069 implements MigrationInterface {
    name = 'orderStatus1651777825069'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "orders" ADD "order_status" character varying(120) DEFAULT 'PRE-CLOSE'`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "orders" DROP COLUMN "order_status"`);
    }

}
