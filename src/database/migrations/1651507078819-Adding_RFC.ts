import {MigrationInterface, QueryRunner} from "typeorm";

export class AddingRFC1651507078819 implements MigrationInterface {
    name = 'AddingRFC1651507078819'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "routes" ADD "razon_social" character varying(255)`);
        await queryRunner.query(`ALTER TABLE "routes" ADD "rfc" character varying(255)`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "routes" DROP COLUMN "rfc"`);
        await queryRunner.query(`ALTER TABLE "routes" DROP COLUMN "razon_social"`);
    }

}
