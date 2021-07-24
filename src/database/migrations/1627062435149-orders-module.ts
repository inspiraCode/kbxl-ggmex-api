import {MigrationInterface, QueryRunner} from "typeorm";

export class ordersModule1627062435149 implements MigrationInterface {
    name = 'ordersModule1627062435149'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "orders" ("id" SERIAL NOT NULL, "order_number" character varying(255) NOT NULL, "header_comments" character varying(255) NOT NULL, "is_enabled" boolean NOT NULL DEFAULT true, "create_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "update_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), CONSTRAINT "PK_710e2d4957aa5878dfe94e4ac2f" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "routes" ("id" SERIAL NOT NULL, "route_number" character varying(255) NOT NULL, "city" character varying(255) NOT NULL, "state" character varying(255) NOT NULL, "country" character varying(255) NOT NULL, "time_discharge_and_return" integer NOT NULL, "is_enabled" boolean NOT NULL DEFAULT true, "create_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "update_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), CONSTRAINT "PK_76100511cdfa1d013c859f01d8b" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "shipments_by_orders" ("id" SERIAL NOT NULL, "shipment_numner" character varying(255) NOT NULL, "customer_name" character varying(255) NOT NULL, "appointment_date" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "delivery_date" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "weight" integer NOT NULL, "truck_type" character varying(255) NOT NULL, "sr_comments" character varying(255) NOT NULL, "header_comments" character varying(510) NOT NULL, "cancelation_reazon" character varying(510) NOT NULL, "is_enabled" boolean NOT NULL DEFAULT true, "create_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "update_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), CONSTRAINT "PK_0ee855f36f788f27ae22f730d64" PRIMARY KEY ("id"))`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE "shipments_by_orders"`);
        await queryRunner.query(`DROP TABLE "routes"`);
        await queryRunner.query(`DROP TABLE "orders"`);
    }

}
