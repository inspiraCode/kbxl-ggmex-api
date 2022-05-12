import {MigrationInterface, QueryRunner} from "typeorm";

export class SATMaterialData1652122547543 implements MigrationInterface {
    name = 'SATMaterialData1652122547543'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "shipments_by_orders" ADD "clave_SAT" character varying(255)`);
        await queryRunner.query(`ALTER TABLE "shipments_by_orders" ADD "descripcion_SAT" character varying(255)`);
        await queryRunner.query(`ALTER TABLE "shipments_by_orders" ADD "paquetes" integer`);
        await queryRunner.query(`ALTER TABLE "shipments_by_orders" ADD "laminas" integer`);
        await queryRunner.query(`ALTER TABLE "shipments_by_orders" ADD "peso_neto" double precision`);
        await queryRunner.query(`ALTER TABLE "shipments_by_orders" ADD "peso_bruto" double precision`);
        await queryRunner.query(`ALTER TABLE "shipments_by_orders" ADD "is_cancel" boolean NOT NULL DEFAULT false`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "shipments_by_orders" DROP COLUMN "is_cancel"`);
        await queryRunner.query(`ALTER TABLE "shipments_by_orders" DROP COLUMN "peso_bruto"`);
        await queryRunner.query(`ALTER TABLE "shipments_by_orders" DROP COLUMN "peso_neto"`);
        await queryRunner.query(`ALTER TABLE "shipments_by_orders" DROP COLUMN "laminas"`);
        await queryRunner.query(`ALTER TABLE "shipments_by_orders" DROP COLUMN "paquetes"`);
        await queryRunner.query(`ALTER TABLE "shipments_by_orders" DROP COLUMN "descripcion_SAT"`);
        await queryRunner.query(`ALTER TABLE "shipments_by_orders" DROP COLUMN "clave_SAT"`);
    }

}
