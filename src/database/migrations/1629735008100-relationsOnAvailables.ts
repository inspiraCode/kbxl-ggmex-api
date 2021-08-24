import {MigrationInterface, QueryRunner} from "typeorm";

export class relationsOnAvailables1629735008100 implements MigrationInterface {
    name = 'relationsOnAvailables1629735008100'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "equipments" DROP CONSTRAINT "FK_7dd4df6712e33233933499f7e28"`);
        await queryRunner.query(`ALTER TABLE "units_available" DROP CONSTRAINT "FK_17916f127128e02918dc95ba5ed"`);
        await queryRunner.query(`ALTER TABLE "equipments" RENAME COLUMN "carrierId" TO "carrier_id"`);
        await queryRunner.query(`ALTER TABLE "units_available" DROP COLUMN "availableId"`);
        await queryRunner.query(`ALTER TABLE "units_available" ADD "available_id" integer`);
        await queryRunner.query(`ALTER TABLE "units_available" ADD "operator_id" integer`);
        await queryRunner.query(`ALTER TABLE "units_available" ADD "equipment_id" integer`);
        await queryRunner.query(`ALTER TABLE "equipments" ADD CONSTRAINT "FK_3a3f02665a388b31efddc2b56ff" FOREIGN KEY ("carrier_id") REFERENCES "carriers"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "units_available" ADD CONSTRAINT "FK_49af0aa110ed74c0e03d1c63d8d" FOREIGN KEY ("available_id") REFERENCES "availables"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "units_available" ADD CONSTRAINT "FK_ed5f205a46b714010094bedb19d" FOREIGN KEY ("operator_id") REFERENCES "operators"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "units_available" ADD CONSTRAINT "FK_535ef32f43f6235ff3711fb0aa4" FOREIGN KEY ("equipment_id") REFERENCES "equipments"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "units_available" DROP CONSTRAINT "FK_535ef32f43f6235ff3711fb0aa4"`);
        await queryRunner.query(`ALTER TABLE "units_available" DROP CONSTRAINT "FK_ed5f205a46b714010094bedb19d"`);
        await queryRunner.query(`ALTER TABLE "units_available" DROP CONSTRAINT "FK_49af0aa110ed74c0e03d1c63d8d"`);
        await queryRunner.query(`ALTER TABLE "equipments" DROP CONSTRAINT "FK_3a3f02665a388b31efddc2b56ff"`);
        await queryRunner.query(`ALTER TABLE "units_available" DROP COLUMN "equipment_id"`);
        await queryRunner.query(`ALTER TABLE "units_available" DROP COLUMN "operator_id"`);
        await queryRunner.query(`ALTER TABLE "units_available" DROP COLUMN "available_id"`);
        await queryRunner.query(`ALTER TABLE "units_available" ADD "availableId" integer`);
        await queryRunner.query(`ALTER TABLE "equipments" RENAME COLUMN "carrier_id" TO "carrierId"`);
        await queryRunner.query(`ALTER TABLE "units_available" ADD CONSTRAINT "FK_17916f127128e02918dc95ba5ed" FOREIGN KEY ("availableId") REFERENCES "availables"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "equipments" ADD CONSTRAINT "FK_7dd4df6712e33233933499f7e28" FOREIGN KEY ("carrierId") REFERENCES "carriers"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

}
