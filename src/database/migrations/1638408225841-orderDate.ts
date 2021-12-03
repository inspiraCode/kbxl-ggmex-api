import {MigrationInterface, QueryRunner} from "typeorm";

export class orderDate1638408225841 implements MigrationInterface {
    name = 'orderDate1638408225841'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "orders" ADD "order_date" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "orders" DROP COLUMN "order_date"`);
    }

}
