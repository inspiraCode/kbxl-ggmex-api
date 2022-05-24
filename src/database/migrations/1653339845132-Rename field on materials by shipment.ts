import {MigrationInterface, QueryRunner} from "typeorm";

export class RenameFieldOnMaterialsByShipment1653339845132 implements MigrationInterface {
    name = 'RenameFieldOnMaterialsByShipment1653339845132'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "materials_by_shipment" DROP CONSTRAINT "FK_a0e9dd3fdccb63b0f3ab68c0d34"`);
        await queryRunner.query(`ALTER TABLE "materials_by_shipment" RENAME COLUMN "shipmentByOrderId" TO "shipment_by_order_id"`);
        await queryRunner.query(`ALTER TABLE "materials_by_shipment" ADD CONSTRAINT "FK_c271d8a409d1ee802cfc38feb97" FOREIGN KEY ("shipment_by_order_id") REFERENCES "shipments_by_orders"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "materials_by_shipment" DROP CONSTRAINT "FK_c271d8a409d1ee802cfc38feb97"`);
        await queryRunner.query(`ALTER TABLE "materials_by_shipment" RENAME COLUMN "shipment_by_order_id" TO "shipmentByOrderId"`);
        await queryRunner.query(`ALTER TABLE "materials_by_shipment" ADD CONSTRAINT "FK_a0e9dd3fdccb63b0f3ab68c0d34" FOREIGN KEY ("shipmentByOrderId") REFERENCES "shipments_by_orders"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

}
