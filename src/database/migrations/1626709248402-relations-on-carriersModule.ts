import {MigrationInterface, QueryRunner} from "typeorm";

export class relationsOnCarriersModule1626709248402 implements MigrationInterface {
    name = 'relationsOnCarriersModule1626709248402'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "equipments_operators" ("equipment_id" integer NOT NULL, "operator_id" integer NOT NULL, CONSTRAINT "PK_e15a870cde1ff9bf68696ddef94" PRIMARY KEY ("equipment_id", "operator_id"))`);
        await queryRunner.query(`CREATE INDEX "IDX_9ec45e38c31482a62246f5eef3" ON "equipments_operators" ("equipment_id") `);
        await queryRunner.query(`CREATE INDEX "IDX_f06199fe5e54e1994b8f0551ea" ON "equipments_operators" ("operator_id") `);
        await queryRunner.query(`ALTER TABLE "operators" ADD "carrierId" integer`);
        await queryRunner.query(`ALTER TABLE "pms" ADD "equipment_id" integer`);
        await queryRunner.query(`ALTER TABLE "equipments" ADD "carrierId" integer`);
        await queryRunner.query(`ALTER TABLE "operators" ADD CONSTRAINT "FK_892588bca77b6ae1f7edfdb6c67" FOREIGN KEY ("carrierId") REFERENCES "carriers"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "pms" ADD CONSTRAINT "FK_ab7e40a134ce8c24c094e045991" FOREIGN KEY ("equipment_id") REFERENCES "equipments"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "equipments" ADD CONSTRAINT "FK_7dd4df6712e33233933499f7e28" FOREIGN KEY ("carrierId") REFERENCES "carriers"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "equipments_operators" ADD CONSTRAINT "FK_9ec45e38c31482a62246f5eef39" FOREIGN KEY ("equipment_id") REFERENCES "equipments"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "equipments_operators" ADD CONSTRAINT "FK_f06199fe5e54e1994b8f0551eaf" FOREIGN KEY ("operator_id") REFERENCES "operators"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "equipments_operators" DROP CONSTRAINT "FK_f06199fe5e54e1994b8f0551eaf"`);
        await queryRunner.query(`ALTER TABLE "equipments_operators" DROP CONSTRAINT "FK_9ec45e38c31482a62246f5eef39"`);
        await queryRunner.query(`ALTER TABLE "equipments" DROP CONSTRAINT "FK_7dd4df6712e33233933499f7e28"`);
        await queryRunner.query(`ALTER TABLE "pms" DROP CONSTRAINT "FK_ab7e40a134ce8c24c094e045991"`);
        await queryRunner.query(`ALTER TABLE "operators" DROP CONSTRAINT "FK_892588bca77b6ae1f7edfdb6c67"`);
        await queryRunner.query(`ALTER TABLE "equipments" DROP COLUMN "carrierId"`);
        await queryRunner.query(`ALTER TABLE "pms" DROP COLUMN "equipment_id"`);
        await queryRunner.query(`ALTER TABLE "operators" DROP COLUMN "carrierId"`);
        await queryRunner.query(`DROP INDEX "IDX_f06199fe5e54e1994b8f0551ea"`);
        await queryRunner.query(`DROP INDEX "IDX_9ec45e38c31482a62246f5eef3"`);
        await queryRunner.query(`DROP TABLE "equipments_operators"`);
    }

}
