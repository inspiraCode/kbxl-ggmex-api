import {MigrationInterface, QueryRunner} from "typeorm";

export class usersRelCustomers1626555949390 implements MigrationInterface {
    name = 'usersRelCustomers1626555949390'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "users" ADD "customer_id" integer`);
        await queryRunner.query(`ALTER TABLE "users" ADD CONSTRAINT "FK_c7bc1ffb56c570f42053fa7503b" FOREIGN KEY ("customer_id") REFERENCES "customers"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "users" DROP CONSTRAINT "FK_c7bc1ffb56c570f42053fa7503b"`);
        await queryRunner.query(`ALTER TABLE "users" DROP COLUMN "customer_id"`);
    }

}
