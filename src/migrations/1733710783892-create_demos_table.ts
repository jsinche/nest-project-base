import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreateDemosTable1733710783892 implements MigrationInterface {
  name = 'CreateDemosTable1733710783892';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "demo" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "title" text NOT NULL, "price" numeric NOT NULL DEFAULT '0', "description" text, "slug" text NOT NULL, "stock" integer NOT NULL DEFAULT '0', "sizes" text array NOT NULL, "gender" text NOT NULL, CONSTRAINT "UQ_4429a797ab50960baa3feb5368b" UNIQUE ("title"), CONSTRAINT "UQ_0cd85ad4265b554ae22b4d4ade7" UNIQUE ("slug"), CONSTRAINT "PK_9d8d89f7764de19ec5a40a5f056" PRIMARY KEY ("id"))`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP TABLE "demo"`);
  }
}
