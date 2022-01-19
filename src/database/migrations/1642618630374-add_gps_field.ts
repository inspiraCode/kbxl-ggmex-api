import {MigrationInterface, QueryRunner} from "typeorm";

export class addGpsField1642618630374 implements MigrationInterface {
    name = 'addGpsField1642618630374'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "carriers" ADD "gps_provider" character varying(300)`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "carriers" DROP COLUMN "gps_provider"`);
    }

}
