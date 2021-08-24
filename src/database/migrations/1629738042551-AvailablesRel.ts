import {MigrationInterface, QueryRunner} from "typeorm";

export class AvailablesRel1629738042551 implements MigrationInterface {
    name = 'AvailablesRel1629738042551'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "availables" ADD "carrier_id" integer`);
        await queryRunner.query(`ALTER TABLE "availables" ADD CONSTRAINT "FK_12a96613e2718f239469cee13bc" FOREIGN KEY ("carrier_id") REFERENCES "carriers"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "availables" DROP CONSTRAINT "FK_12a96613e2718f239469cee13bc"`);
        await queryRunner.query(`ALTER TABLE "availables" DROP COLUMN "carrier_id"`);
    }

}
