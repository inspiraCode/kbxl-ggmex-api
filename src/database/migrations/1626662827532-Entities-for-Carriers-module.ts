import {MigrationInterface, QueryRunner} from "typeorm";

export class EntitiesForCarriersModule1626662827532 implements MigrationInterface {
    name = 'EntitiesForCarriersModule1626662827532'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "carriers" ("id" SERIAL NOT NULL, "legal_name" character varying(255) NOT NULL, "comertial_name" character varying(255) NOT NULL, "email" character varying(255) NOT NULL, "docs" character varying(255) NOT NULL, "hire_date" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "is_enabled" boolean NOT NULL DEFAULT true, "create_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "update_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), CONSTRAINT "PK_fe886e72b3d9f67da3ce70f4368" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "equipments" ("id" SERIAL NOT NULL, "unit_type" character varying(255) NOT NULL, "capacity" character varying(255) NOT NULL, "model" character varying(255) NOT NULL, "brand" character varying(255) NOT NULL, "kbxl_equipment_number" character varying(255) NOT NULL, "docs" character varying(255) NOT NULL, "is_enabled" boolean NOT NULL DEFAULT true, "create_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "update_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), CONSTRAINT "PK_250348d5d9ae4946bcd634f3e61" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "operators" ("id" SERIAL NOT NULL, "operator_name" character varying(255) NOT NULL, "license_number" character varying(255) NOT NULL, "email" character varying(255) NOT NULL, "phone_number" character varying(255) NOT NULL, "docs" character varying(255), "is_enabled" boolean NOT NULL DEFAULT true, "create_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "update_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), CONSTRAINT "PK_3d02b3692836893720335a79d1b" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "pms" ("id" SERIAL NOT NULL, "start_date" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "end_date" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "evidence" character varying(255), "comments" character varying(510) NOT NULL, CONSTRAINT "PK_1f3c9594bb91b77774836d54b1f" PRIMARY KEY ("id"))`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE "pms"`);
        await queryRunner.query(`DROP TABLE "operators"`);
        await queryRunner.query(`DROP TABLE "equipments"`);
        await queryRunner.query(`DROP TABLE "carriers"`);
    }

}
