import {MigrationInterface, QueryRunner} from "typeorm";

export class MaterialsByShipment1653334966537 implements MigrationInterface {
    name = 'MaterialsByShipment1653334966537'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "materials_by_shipment" ("id" SERIAL NOT NULL, "clave_SAT" character varying(255), "descripcion_SAT" character varying(255), "paquetes" integer, "laminas" integer, "peso_neto" double precision, "peso_bruto" double precision, "shipmentByOrderId" integer, CONSTRAINT "PK_cd068d232e4de12096cd4e4d71f" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "materials_by_shipment" ADD CONSTRAINT "FK_a0e9dd3fdccb63b0f3ab68c0d34" FOREIGN KEY ("shipmentByOrderId") REFERENCES "shipments_by_orders"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "materials_by_shipment" DROP CONSTRAINT "FK_a0e9dd3fdccb63b0f3ab68c0d34"`);
        await queryRunner.query(`DROP TABLE "materials_by_shipment"`);
    }

}
