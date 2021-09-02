import {MigrationInterface, QueryRunner} from "typeorm";

export class init1630380396295 implements MigrationInterface {
    name = 'init1630380396295'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "units_available" ("id" SERIAL NOT NULL, "is_available" boolean NOT NULL DEFAULT true, "reason" character varying(100), "reason_comments" character varying(355), "commitment_date" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "created_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "updated_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "available_id" integer, "operator_id" integer, "equipment_id" integer, CONSTRAINT "PK_8e50d628f57bf93bb6f1d49c4df" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "operators" ("id" SERIAL NOT NULL, "operator_name" character varying(255) NOT NULL, "license_number" character varying(255) NOT NULL, "email" character varying(255) NOT NULL, "phone_number" character varying(255) NOT NULL, "docs" character varying(255), "is_enabled" boolean NOT NULL DEFAULT true, "created_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "updated_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "carrier_id" integer, CONSTRAINT "PK_3d02b3692836893720335a79d1b" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "pms" ("id" SERIAL NOT NULL, "start_date" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "end_date" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "evidence" character varying(255) NOT NULL, "comments" character varying(510) NOT NULL, "equipment_id" integer, CONSTRAINT "PK_1f3c9594bb91b77774836d54b1f" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "equipments" ("id" SERIAL NOT NULL, "unit_type" character varying(255) NOT NULL, "capacity" character varying(255) NOT NULL, "model" character varying(255) NOT NULL, "brand" character varying(255) NOT NULL, "kbxl_equipment_number" character varying(255) NOT NULL, "docs" character varying(255) NOT NULL, "is_enabled" boolean NOT NULL DEFAULT true, "created_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "updated_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "carrier_id" integer, CONSTRAINT "PK_250348d5d9ae4946bcd634f3e61" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "users" ("id" SERIAL NOT NULL, "user_name" character varying(100) NOT NULL, "email" character varying(255) NOT NULL, "password" character varying(255) NOT NULL, "role" character varying(100) NOT NULL, "is_enabled" boolean NOT NULL DEFAULT true, "created_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "updated_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "customer_id" integer, "carrier_id" integer, CONSTRAINT "UQ_074a1f262efaca6aba16f7ed920" UNIQUE ("user_name"), CONSTRAINT "PK_a3ffb1c0c8416b9fc6f907b7433" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "customers" ("id" SERIAL NOT NULL, "customer_number" character varying(150) NOT NULL, "customer_name" character varying(255) NOT NULL, "email" character varying(255) NOT NULL, "phone_number" character varying(255) NOT NULL, "main_contact" character varying(255) NOT NULL, "is_enabled" boolean NOT NULL DEFAULT true, "created_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "updated_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), CONSTRAINT "UQ_6fbe8c55d8dd968877d296493e3" UNIQUE ("customer_number"), CONSTRAINT "UQ_a1dded0c9e77a3e62a09d20ed88" UNIQUE ("customer_name"), CONSTRAINT "PK_133ec679a801fab5e070f73d3ea" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "orders" ("id" SERIAL NOT NULL, "order_number" character varying(255) NOT NULL, "header_comments" character varying(255) NOT NULL, "is_enabled" boolean NOT NULL DEFAULT true, "created_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "updated_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "customer_id" integer, CONSTRAINT "PK_710e2d4957aa5878dfe94e4ac2f" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "routes" ("id" SERIAL NOT NULL, "route_number" character varying(255) NOT NULL, "delivery_customer_name" character varying(255) NOT NULL, "city" character varying(255) NOT NULL, "state" character varying(255) NOT NULL, "country" character varying(255) NOT NULL, "kilometers" real NOT NULL DEFAULT '1', "warehouse_load_time" real NOT NULL DEFAULT '1', "time_to_deliver" real NOT NULL DEFAULT '1', "customer_times_discharge" real NOT NULL DEFAULT '1', "total_hours" real NOT NULL DEFAULT '1', "total_days" real NOT NULL DEFAULT '1', "is_enabled" boolean NOT NULL DEFAULT true, "created_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "updated_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), CONSTRAINT "PK_76100511cdfa1d013c859f01d8b" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "shipments_by_orders" ("id" SERIAL NOT NULL, "appointment_date" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "shipment_numner" character varying(255) NOT NULL, "customer_name" character varying(255) NOT NULL, "city" character varying(255) NOT NULL, "state" character varying(255) NOT NULL DEFAULT 'Activo', "delivery_terms" character varying(255), "ligistics_agent" character varying(255), "sr_freight" double precision, "order_freight" double precision, "truck_type" character varying(255) NOT NULL, "delivery_date" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "transport_status" character varying(255), "order_status" character varying(255), "financial_status" character varying(255), "weight" double precision NOT NULL, "tsm" character varying(255), "sr_header_comments" character varying(510), "order_header_comment" character varying(510), "cancelation_reazon" character varying, "is_enabled" boolean NOT NULL DEFAULT true, "created_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "updated_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "carrier_id" integer, "order_id" integer, "route_id" integer, CONSTRAINT "UQ_39e95cb4ecf1ca13a69edf42e82" UNIQUE ("shipment_numner"), CONSTRAINT "PK_0ee855f36f788f27ae22f730d64" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "carriers" ("id" SERIAL NOT NULL, "legal_name" character varying(255) NOT NULL, "comertial_name" character varying(255) NOT NULL, "email" character varying(255) NOT NULL, "docs" character varying(255) NOT NULL, "hire_date" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "is_enabled" boolean NOT NULL DEFAULT true, "created_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "updated_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), CONSTRAINT "PK_fe886e72b3d9f67da3ce70f4368" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "availables" ("id" SERIAL NOT NULL, "available_comments" character varying(510), "available_date_commit" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "created_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "updated_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "carrier_id" integer, CONSTRAINT "PK_d051ea2ea7e0d27032f064c2e98" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "equipments_operators" ("equipment_id" integer NOT NULL, "operator_id" integer NOT NULL, CONSTRAINT "PK_e15a870cde1ff9bf68696ddef94" PRIMARY KEY ("equipment_id", "operator_id"))`);
        await queryRunner.query(`CREATE INDEX "IDX_9ec45e38c31482a62246f5eef3" ON "equipments_operators" ("equipment_id") `);
        await queryRunner.query(`CREATE INDEX "IDX_f06199fe5e54e1994b8f0551ea" ON "equipments_operators" ("operator_id") `);
        await queryRunner.query(`ALTER TABLE "units_available" ADD CONSTRAINT "FK_49af0aa110ed74c0e03d1c63d8d" FOREIGN KEY ("available_id") REFERENCES "availables"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "units_available" ADD CONSTRAINT "FK_ed5f205a46b714010094bedb19d" FOREIGN KEY ("operator_id") REFERENCES "operators"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "units_available" ADD CONSTRAINT "FK_535ef32f43f6235ff3711fb0aa4" FOREIGN KEY ("equipment_id") REFERENCES "equipments"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "operators" ADD CONSTRAINT "FK_b9c17ffda8c65f20a78496c6f74" FOREIGN KEY ("carrier_id") REFERENCES "carriers"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "pms" ADD CONSTRAINT "FK_ab7e40a134ce8c24c094e045991" FOREIGN KEY ("equipment_id") REFERENCES "equipments"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "equipments" ADD CONSTRAINT "FK_3a3f02665a388b31efddc2b56ff" FOREIGN KEY ("carrier_id") REFERENCES "carriers"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "users" ADD CONSTRAINT "FK_c7bc1ffb56c570f42053fa7503b" FOREIGN KEY ("customer_id") REFERENCES "customers"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "users" ADD CONSTRAINT "FK_7c63c0ce4bd7bfc551dec79a2d4" FOREIGN KEY ("carrier_id") REFERENCES "carriers"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "orders" ADD CONSTRAINT "FK_772d0ce0473ac2ccfa26060dbe9" FOREIGN KEY ("customer_id") REFERENCES "customers"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "shipments_by_orders" ADD CONSTRAINT "FK_230d2d67508b9533c877a70dbef" FOREIGN KEY ("carrier_id") REFERENCES "carriers"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "shipments_by_orders" ADD CONSTRAINT "FK_6cedcb8c7f283cd7825955b2f9b" FOREIGN KEY ("order_id") REFERENCES "orders"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "shipments_by_orders" ADD CONSTRAINT "FK_30a4741fc287178c085d0fedb69" FOREIGN KEY ("route_id") REFERENCES "routes"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "availables" ADD CONSTRAINT "FK_12a96613e2718f239469cee13bc" FOREIGN KEY ("carrier_id") REFERENCES "carriers"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "equipments_operators" ADD CONSTRAINT "FK_9ec45e38c31482a62246f5eef39" FOREIGN KEY ("equipment_id") REFERENCES "equipments"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "equipments_operators" ADD CONSTRAINT "FK_f06199fe5e54e1994b8f0551eaf" FOREIGN KEY ("operator_id") REFERENCES "operators"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "equipments_operators" DROP CONSTRAINT "FK_f06199fe5e54e1994b8f0551eaf"`);
        await queryRunner.query(`ALTER TABLE "equipments_operators" DROP CONSTRAINT "FK_9ec45e38c31482a62246f5eef39"`);
        await queryRunner.query(`ALTER TABLE "availables" DROP CONSTRAINT "FK_12a96613e2718f239469cee13bc"`);
        await queryRunner.query(`ALTER TABLE "shipments_by_orders" DROP CONSTRAINT "FK_30a4741fc287178c085d0fedb69"`);
        await queryRunner.query(`ALTER TABLE "shipments_by_orders" DROP CONSTRAINT "FK_6cedcb8c7f283cd7825955b2f9b"`);
        await queryRunner.query(`ALTER TABLE "shipments_by_orders" DROP CONSTRAINT "FK_230d2d67508b9533c877a70dbef"`);
        await queryRunner.query(`ALTER TABLE "orders" DROP CONSTRAINT "FK_772d0ce0473ac2ccfa26060dbe9"`);
        await queryRunner.query(`ALTER TABLE "users" DROP CONSTRAINT "FK_7c63c0ce4bd7bfc551dec79a2d4"`);
        await queryRunner.query(`ALTER TABLE "users" DROP CONSTRAINT "FK_c7bc1ffb56c570f42053fa7503b"`);
        await queryRunner.query(`ALTER TABLE "equipments" DROP CONSTRAINT "FK_3a3f02665a388b31efddc2b56ff"`);
        await queryRunner.query(`ALTER TABLE "pms" DROP CONSTRAINT "FK_ab7e40a134ce8c24c094e045991"`);
        await queryRunner.query(`ALTER TABLE "operators" DROP CONSTRAINT "FK_b9c17ffda8c65f20a78496c6f74"`);
        await queryRunner.query(`ALTER TABLE "units_available" DROP CONSTRAINT "FK_535ef32f43f6235ff3711fb0aa4"`);
        await queryRunner.query(`ALTER TABLE "units_available" DROP CONSTRAINT "FK_ed5f205a46b714010094bedb19d"`);
        await queryRunner.query(`ALTER TABLE "units_available" DROP CONSTRAINT "FK_49af0aa110ed74c0e03d1c63d8d"`);
        await queryRunner.query(`DROP INDEX "IDX_f06199fe5e54e1994b8f0551ea"`);
        await queryRunner.query(`DROP INDEX "IDX_9ec45e38c31482a62246f5eef3"`);
        await queryRunner.query(`DROP TABLE "equipments_operators"`);
        await queryRunner.query(`DROP TABLE "availables"`);
        await queryRunner.query(`DROP TABLE "carriers"`);
        await queryRunner.query(`DROP TABLE "shipments_by_orders"`);
        await queryRunner.query(`DROP TABLE "routes"`);
        await queryRunner.query(`DROP TABLE "orders"`);
        await queryRunner.query(`DROP TABLE "customers"`);
        await queryRunner.query(`DROP TABLE "users"`);
        await queryRunner.query(`DROP TABLE "equipments"`);
        await queryRunner.query(`DROP TABLE "pms"`);
        await queryRunner.query(`DROP TABLE "operators"`);
        await queryRunner.query(`DROP TABLE "units_available"`);
    }

}
