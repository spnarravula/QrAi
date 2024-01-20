import type { DataSource, EntityManager, QueryRunner } from "typeorm";

export class Transaction {
  private dataSource: DataSource | null;
  private queryRunner: QueryRunner;
  public manager: EntityManager;

  constructor() {
    this.dataSource = null;
  }

  public async start(dataSource: DataSource) {
    this.dataSource = dataSource;

    this.queryRunner = this.dataSource.createQueryRunner();
    await this.queryRunner.connect();
    await this.queryRunner.startTransaction();

    console.log("\n\x1b[36m%s\x1b[0m\n", "START TRANSACTION"); // Blue
    this.manager = this.queryRunner.manager;

    return this;
  }

  async commit() {
    if (!this.dataSource) {
      console.warn("Datasource was not provided for transaction.");
      return;
    }
    await this.queryRunner.commitTransaction();
    await this.queryRunner.release();

    console.log("\n\x1b[32m%s\x1b[0m\n", "COMMIT"); // Green
  }

  async rollback() {
    if (!this.dataSource) {
      console.warn("Datasource was not provided for transaction.");
      return;
    }
    await this.queryRunner.rollbackTransaction();
    await this.queryRunner.release();

    console.log("\n\x1b[31m%s\x1b[0m\n", "ROLLBACK"); // Red
  }
}
