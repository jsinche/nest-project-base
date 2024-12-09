import { MigrationInterface, QueryRunner } from 'typeorm';

export class ChangePriceColumnTypeInDemoTable1733763169125
  implements MigrationInterface
{
  name = 'ChangePriceColumnTypeInDemoTable1733763169125';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "demo" DROP COLUMN "price"`);
    await queryRunner.query(
      `ALTER TABLE "demo" ADD "price" double precision NOT NULL DEFAULT '0'`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "demo" DROP COLUMN "price"`);
    await queryRunner.query(
      `ALTER TABLE "demo" ADD "price" numeric NOT NULL DEFAULT '0'`,
    );
  }
}
