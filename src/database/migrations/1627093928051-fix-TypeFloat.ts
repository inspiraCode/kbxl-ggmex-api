import {MigrationInterface, QueryRunner} from "typeorm";

export class fixTypeFloat1627093928051 implements MigrationInterface {
    name = 'fixTypeFloat1627093928051'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "routes" DROP COLUMN "time_discharge_and_return"`);
        await queryRunner.query(`ALTER TABLE "routes" ADD "time_discharge_and_return" real NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "routes" DROP COLUMN "time_discharge_and_return"`);
        await queryRunner.query(`ALTER TABLE "routes" ADD "time_discharge_and_return" integer NOT NULL`);
    }

}
