import {MigrationInterface, QueryRunner} from "typeorm";

export class OrderCommentsNullable1646976426685 implements MigrationInterface {
    name = 'OrderCommentsNullable1646976426685'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "orders" ALTER COLUMN "header_comments" DROP NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "orders" ALTER COLUMN "header_comments" SET NOT NULL`);
    }

}
