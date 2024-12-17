import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreateDemoImageTable1734447938929 implements MigrationInterface {
  name = 'CreateDemoImageTable1734447938929';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "demo_image" ("id" SERIAL NOT NULL, "url" text NOT NULL, "demoId" uuid, CONSTRAINT "PK_af104eea689fbac44ff807cab82" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `ALTER TABLE "demo_image" ADD CONSTRAINT "FK_46bb971dad980d45e590cd72918" FOREIGN KEY ("demoId") REFERENCES "demo"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "demo_image" DROP CONSTRAINT "FK_46bb971dad980d45e590cd72918"`,
    );
    await queryRunner.query(`DROP TABLE "demo_image"`);
  }
}
