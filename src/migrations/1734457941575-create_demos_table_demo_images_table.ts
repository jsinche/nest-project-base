import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreateDemosTableDemoImagesTable1734457941575
  implements MigrationInterface
{
  name = 'CreateDemosTableDemoImagesTable1734457941575';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "demos" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "title" text NOT NULL, "price" double precision NOT NULL DEFAULT '0', "description" text, "slug" text NOT NULL, "stock" integer NOT NULL DEFAULT '0', "sizes" text array NOT NULL, "gender" text NOT NULL, "tags" text array NOT NULL DEFAULT '{}', CONSTRAINT "UQ_89ff2c7e211cfe75c5e69d64daf" UNIQUE ("title"), CONSTRAINT "UQ_b9f38ce74cafac0eef5a4ad6b15" UNIQUE ("slug"), CONSTRAINT "PK_a0918b73a3bd78c313e0e085f5c" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "demo_images" ("id" SERIAL NOT NULL, "url" text NOT NULL, "demoId" uuid, CONSTRAINT "PK_dbe76e145400d62b39efd374347" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `ALTER TABLE "demo_images" ADD CONSTRAINT "FK_d9767976dc92eae53e4239aca3f" FOREIGN KEY ("demoId") REFERENCES "demos"("id") ON DELETE CASCADE ON UPDATE NO ACTION`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "demo_images" DROP CONSTRAINT "FK_d9767976dc92eae53e4239aca3f"`,
    );
    await queryRunner.query(`DROP TABLE "demo_images"`);
    await queryRunner.query(`DROP TABLE "demos"`);
  }
}
