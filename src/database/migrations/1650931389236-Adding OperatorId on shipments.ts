import {MigrationInterface, QueryRunner} from "typeorm";

export class AddingOperatorIdOnShipments1650931389236 implements MigrationInterface {
    name = 'AddingOperatorIdOnShipments1650931389236'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "shipments_by_orders" ADD "operator_id" integer`);
        await queryRunner.query(`ALTER TABLE "shipments_by_orders" ADD CONSTRAINT "FK_bb6a94f2e05c35e51cea18506d6" FOREIGN KEY ("operator_id") REFERENCES "operators"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "shipments_by_orders" DROP CONSTRAINT "FK_bb6a94f2e05c35e51cea18506d6"`);
        await queryRunner.query(`ALTER TABLE "shipments_by_orders" DROP COLUMN "operator_id"`);
    }

}
