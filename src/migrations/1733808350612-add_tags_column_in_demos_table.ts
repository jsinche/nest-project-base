import { MigrationInterface, QueryRunner } from 'typeorm';

export class AddTagsColumnInDemosTable1733808350612
  implements MigrationInterface
{
  name = 'AddTagsColumnInDemosTable1733808350612';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "demo" ADD "tags" text array NOT NULL DEFAULT '{}'`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "demo" DROP COLUMN "tags"`);
  }
}
