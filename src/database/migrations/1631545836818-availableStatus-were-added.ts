import {MigrationInterface, QueryRunner} from "typeorm";

export class availableStatusWereAdded1631545836818 implements MigrationInterface {
    name = 'availableStatusWereAdded1631545836818'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "availables" ADD "available_status" boolean NOT NULL DEFAULT true`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "availables" DROP COLUMN "available_status"`);
    }

}
