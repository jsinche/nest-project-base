import { MigrationInterface, QueryRunner } from 'typeorm';

export class AddDeleteDemoImageCasade1734455543897
  implements MigrationInterface
{
  name = 'AddDeleteDemoImageCasade1734455543897';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "demo_image" DROP CONSTRAINT "FK_46bb971dad980d45e590cd72918"`,
    );
    await queryRunner.query(
      `ALTER TABLE "demo_image" ADD CONSTRAINT "FK_46bb971dad980d45e590cd72918" FOREIGN KEY ("demoId") REFERENCES "demo"("id") ON DELETE CASCADE ON UPDATE NO ACTION`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "demo_image" DROP CONSTRAINT "FK_46bb971dad980d45e590cd72918"`,
    );
    await queryRunner.query(
      `ALTER TABLE "demo_image" ADD CONSTRAINT "FK_46bb971dad980d45e590cd72918" FOREIGN KEY ("demoId") REFERENCES "demo"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
  }
}
