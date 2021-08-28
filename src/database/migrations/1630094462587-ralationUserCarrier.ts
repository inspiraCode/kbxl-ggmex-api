import {MigrationInterface, QueryRunner} from "typeorm";

export class ralationUserCarrier1630094462587 implements MigrationInterface {
    name = 'ralationUserCarrier1630094462587'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "users" ADD "carrier_id" integer`);
        await queryRunner.query(`ALTER TABLE "users" ADD CONSTRAINT "FK_7c63c0ce4bd7bfc551dec79a2d4" FOREIGN KEY ("carrier_id") REFERENCES "carriers"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "users" DROP CONSTRAINT "FK_7c63c0ce4bd7bfc551dec79a2d4"`);
        await queryRunner.query(`ALTER TABLE "users" DROP COLUMN "carrier_id"`);
    }

}
