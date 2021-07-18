import {MigrationInterface, QueryRunner} from "typeorm";

export class customers1626555884256 implements MigrationInterface {
    name = 'customers1626555884256'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "customers" ("id" SERIAL NOT NULL, "customer_number" character varying(150) NOT NULL, "customer_name" character varying(255) NOT NULL, "email" character varying(255) NOT NULL, "phone_number" character varying(255) NOT NULL, "main_contact" character varying(255) NOT NULL, "is_enabled" boolean NOT NULL DEFAULT true, "create_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "update_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), CONSTRAINT "UQ_6fbe8c55d8dd968877d296493e3" UNIQUE ("customer_number"), CONSTRAINT "UQ_a1dded0c9e77a3e62a09d20ed88" UNIQUE ("customer_name"), CONSTRAINT "PK_133ec679a801fab5e070f73d3ea" PRIMARY KEY ("id"))`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE "customers"`);
    }

}
