import {MigrationInterface, QueryRunner} from "typeorm";

export class CommentsPlatformWereAdded1632779649817 implements MigrationInterface {
    name = 'CommentsPlatformWereAdded1632779649817'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "units_available" ADD "reason_platform" character varying(100)`);
        await queryRunner.query(`ALTER TABLE "units_available" ADD "reason_comments_platform" character varying(355)`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "units_available" DROP COLUMN "reason_comments_platform"`);
        await queryRunner.query(`ALTER TABLE "units_available" DROP COLUMN "reason_platform"`);
    }

}
