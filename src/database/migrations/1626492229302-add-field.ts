import {MigrationInterface, QueryRunner} from "typeorm";

export class addField1626492229302 implements MigrationInterface {
    name = 'addField1626492229302'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "users" ADD "isEnabled" boolean NOT NULL DEFAULT true`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "users" DROP COLUMN "isEnabled"`);
    }

}
