import {MigrationInterface, QueryRunner} from "typeorm";

export class FirstNameAndLastNameWereAdded1633463128324 implements MigrationInterface {
    name = 'FirstNameAndLastNameWereAdded1633463128324'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "users" ADD "first_name" character varying(100) NOT NULL DEFAULT 'null'`);
        await queryRunner.query(`ALTER TABLE "users" ADD "last_name" character varying(100) NOT NULL DEFAULT 'null'`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "users" DROP COLUMN "last_name"`);
        await queryRunner.query(`ALTER TABLE "users" DROP COLUMN "first_name"`);
    }

}
