import {MigrationInterface, QueryRunner} from "typeorm";

export class AddingDNumberField1650496270352 implements MigrationInterface {
    name = 'AddingDNumberField1650496270352'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "shipments_by_orders" ADD "sh_d_number" character varying(255)`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "shipments_by_orders" DROP COLUMN "sh_d_number"`);
    }

}
