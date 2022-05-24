import {MigrationInterface, QueryRunner} from "typeorm";

export class AddingHTSAndPedimentoFields1653412634039 implements MigrationInterface {
    name = 'AddingHTSAndPedimentoFields1653412634039'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "materials_by_shipment" ADD "HTS" character varying(255)`);
        await queryRunner.query(`ALTER TABLE "materials_by_shipment" ADD "pedimento" character varying(255)`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "materials_by_shipment" DROP COLUMN "pedimento"`);
        await queryRunner.query(`ALTER TABLE "materials_by_shipment" DROP COLUMN "HTS"`);
    }

}
