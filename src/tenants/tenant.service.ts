import { Injectable, Scope } from '@nestjs/common';
import { DataSource, QueryRunner } from 'typeorm';

@Injectable({ scope: Scope.REQUEST })
export class TenantService {
  private queryRunner: QueryRunner;

  constructor(private readonly dataSource: DataSource) {}

  async getQueryRunner(tenant: string): Promise<QueryRunner> {
    console.log(tenant);
    if (!this.queryRunner) {
      this.queryRunner = this.dataSource.createQueryRunner();
      await this.queryRunner.connect();
      await this.queryRunner.query(`SET search_path TO ${tenant}`);
    }
    return this.queryRunner;
  }

  async releaseQueryRunner(): Promise<void> {
    if (this.queryRunner) {
      await this.queryRunner.release();
      this.queryRunner = null;
    }
  }
}
