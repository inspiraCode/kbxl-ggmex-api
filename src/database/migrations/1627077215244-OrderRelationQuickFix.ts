import {MigrationInterface, QueryRunner} from "typeorm";

export class OrderRelationQuickFix1627077215244 implements MigrationInterface {
    name = 'OrderRelationQuickFix1627077215244'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "shipments_by_orders" ADD "order_id" integer`);
        await queryRunner.query(`ALTER TABLE "shipments_by_orders" ADD CONSTRAINT "FK_6cedcb8c7f283cd7825955b2f9b" FOREIGN KEY ("order_id") REFERENCES "orders"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "shipments_by_orders" DROP CONSTRAINT "FK_6cedcb8c7f283cd7825955b2f9b"`);
        await queryRunner.query(`ALTER TABLE "shipments_by_orders" DROP COLUMN "order_id"`);
    }

}
