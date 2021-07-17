import { MigrationInterface, QueryRunner } from 'typeorm';

export class userNameFix1626475427689 implements MigrationInterface {
  name = 'userNameFix1626475427689';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "users" RENAME COLUMN "userName" TO "user_name"`,
    );
    await queryRunner.query(
      `ALTER TABLE "users" RENAME CONSTRAINT "UQ_226bb9aa7aa8a69991209d58f59" TO "UQ_074a1f262efaca6aba16f7ed920"`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "users" RENAME CONSTRAINT "UQ_074a1f262efaca6aba16f7ed920" TO "UQ_226bb9aa7aa8a69991209d58f59"`,
    );
    await queryRunner.query(
      `ALTER TABLE "users" RENAME COLUMN "user_name" TO "userName"`,
    );
  }
}
