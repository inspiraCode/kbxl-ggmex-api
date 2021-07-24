import {MigrationInterface, QueryRunner} from "typeorm";

export class relationsBetweenModules1627076585012 implements MigrationInterface {
    name = 'relationsBetweenModules1627076585012'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "orders" ADD "customerId" integer`);
        await queryRunner.query(`ALTER TABLE "shipments_by_orders" ADD "carrier_id" integer`);
        await queryRunner.query(`ALTER TABLE "shipments_by_orders" ADD "route_id" integer`);
        await queryRunner.query(`ALTER TABLE "orders" ADD CONSTRAINT "FK_e5de51ca888d8b1f5ac25799dd1" FOREIGN KEY ("customerId") REFERENCES "customers"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "shipments_by_orders" ADD CONSTRAINT "FK_230d2d67508b9533c877a70dbef" FOREIGN KEY ("carrier_id") REFERENCES "carriers"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "shipments_by_orders" ADD CONSTRAINT "FK_30a4741fc287178c085d0fedb69" FOREIGN KEY ("route_id") REFERENCES "routes"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "shipments_by_orders" DROP CONSTRAINT "FK_30a4741fc287178c085d0fedb69"`);
        await queryRunner.query(`ALTER TABLE "shipments_by_orders" DROP CONSTRAINT "FK_230d2d67508b9533c877a70dbef"`);
        await queryRunner.query(`ALTER TABLE "orders" DROP CONSTRAINT "FK_e5de51ca888d8b1f5ac25799dd1"`);
        await queryRunner.query(`ALTER TABLE "shipments_by_orders" DROP COLUMN "route_id"`);
        await queryRunner.query(`ALTER TABLE "shipments_by_orders" DROP COLUMN "carrier_id"`);
        await queryRunner.query(`ALTER TABLE "orders" DROP COLUMN "customerId"`);
    }

}
