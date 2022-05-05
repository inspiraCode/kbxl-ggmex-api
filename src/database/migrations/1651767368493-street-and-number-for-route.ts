import {MigrationInterface, QueryRunner} from "typeorm";

export class streetAndNumberForRoute1651767368493 implements MigrationInterface {
    name = 'streetAndNumberForRoute1651767368493'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "routes" ADD "street_and_number" character varying(255)`);
        await queryRunner.query(`ALTER TABLE "routes" ADD "asentamiento" character varying(255)`);
        await queryRunner.query(`ALTER TABLE "routes" ADD "municipio" character varying(255)`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "routes" DROP COLUMN "municipio"`);
        await queryRunner.query(`ALTER TABLE "routes" DROP COLUMN "asentamiento"`);
        await queryRunner.query(`ALTER TABLE "routes" DROP COLUMN "street_and_number"`);
    }

}
