import {MigrationInterface, QueryRunner} from "typeorm";

export class nulleableFix1627152014309 implements MigrationInterface {
    name = 'nulleableFix1627152014309'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "shipments_by_orders" ALTER COLUMN "cancelation_reazon" DROP NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "shipments_by_orders" ALTER COLUMN "cancelation_reazon" SET NOT NULL`);
    }

}
