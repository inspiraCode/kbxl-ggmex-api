import {MigrationInterface, QueryRunner} from "typeorm";

export class NewEquipmentField1632161528575 implements MigrationInterface {
    name = 'NewEquipmentField1632161528575'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "units_available" ADD "equipment_plataform_1_id" integer`);
        await queryRunner.query(`ALTER TABLE "availables" ALTER COLUMN "available_status" SET DEFAULT false`);
        await queryRunner.query(`ALTER TABLE "units_available" ADD CONSTRAINT "FK_51d4e31e737e00cd0b4cf89a6f2" FOREIGN KEY ("equipment_plataform_1_id") REFERENCES "equipments"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "units_available" DROP CONSTRAINT "FK_51d4e31e737e00cd0b4cf89a6f2"`);
        await queryRunner.query(`ALTER TABLE "availables" ALTER COLUMN "available_status" SET DEFAULT true`);
        await queryRunner.query(`ALTER TABLE "units_available" DROP COLUMN "equipment_plataform_1_id"`);
    }

}
