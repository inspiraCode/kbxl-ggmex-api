import {MigrationInterface, QueryRunner} from "typeorm";

export class AddingCommetsAndPriorityFlag1651513847216 implements MigrationInterface {
    name = 'AddingCommetsAndPriorityFlag1651513847216'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "routes" ADD "comments" character varying(550)`);
        await queryRunner.query(`ALTER TABLE "routes" ADD "priority_flag" boolean NOT NULL DEFAULT false`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "routes" DROP COLUMN "priority_flag"`);
        await queryRunner.query(`ALTER TABLE "routes" DROP COLUMN "comments"`);
    }

}
