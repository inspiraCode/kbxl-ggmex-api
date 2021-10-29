import {MigrationInterface, QueryRunner} from "typeorm";

export class equipmentsCapacityWereToShipmentbyorder1635363070323 implements MigrationInterface {
    name = 'equipmentsCapacityWereToShipmentbyorder1635363070323'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "shipments_by_orders" ADD "equipment_id" integer`);
        await queryRunner.query(`ALTER TABLE "shipments_by_orders" ADD "equipment_plataform_1_id" integer`);
        await queryRunner.query(`ALTER TABLE "shipments_by_orders" ADD CONSTRAINT "FK_b352bc1d121794f66fe99d27d95" FOREIGN KEY ("equipment_id") REFERENCES "equipments"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "shipments_by_orders" ADD CONSTRAINT "FK_f71ed12c4c2ed98f8c04d7d365a" FOREIGN KEY ("equipment_plataform_1_id") REFERENCES "equipments"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "shipments_by_orders" DROP CONSTRAINT "FK_f71ed12c4c2ed98f8c04d7d365a"`);
        await queryRunner.query(`ALTER TABLE "shipments_by_orders" DROP CONSTRAINT "FK_b352bc1d121794f66fe99d27d95"`);
        await queryRunner.query(`ALTER TABLE "shipments_by_orders" DROP COLUMN "equipment_plataform_1_id"`);
        await queryRunner.query(`ALTER TABLE "shipments_by_orders" DROP COLUMN "equipment_id"`);
    }

}
