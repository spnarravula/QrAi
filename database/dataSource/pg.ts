import "reflect-metadata";
import { DataSource } from "typeorm";

/* Entities */
import { ENTITIES } from "./entities";

/* Types */
import { PSQLOpts } from "../types";

type PgDatabaseOpts = {
  init?: boolean;
  disableMigration?: boolean;
};

const setDefaultOpts = (opts?: PgDatabaseOpts) => {
  const finalOpts: PgDatabaseOpts = {
    ...opts,
    init: opts?.init ?? true,
    disableMigration: opts?.disableMigration ?? false,
  };

  return finalOpts as Required<PgDatabaseOpts>;
};

export class PgDatabase {
  private db: DataSource | null;
  private isReady: boolean = false;
  private opts: Required<PgDatabaseOpts>;

  constructor(config: PSQLOpts, opts?: PgDatabaseOpts) {
    this.opts = setDefaultOpts(opts);

    // Instantiate the database
    this.db = this.generateDataSource(config, this.opts.disableMigration);

    // Initialize the database
    if (this.opts.init)
      this.init(config)
        .then(() => (this.isReady = true))
        .catch((err) => console.log(err));
  }

  public getDatasource() {
    if (!this.db) throw new Error("Database not initialized.");
    return this.db;
  }

  public async getInstance() {
    let tries = 0;

    // If the database is not ready, then try again in 1000ms for three times.
    return new Promise<DataSource>((resolve, reject) => {
      const interval = setInterval(() => {
        if (this.isReady && this.db) {
          clearInterval(interval);
          resolve(this.db);
        }

        if (tries > 3) {
          clearInterval(interval);
          reject("Unable to get instance of database.");
        }

        tries += 1;
      }, 1000);
    });
  }

  private generateDataSource(config: PSQLOpts, disableMigration: boolean) {
    const dataSource = new DataSource({
      ...config,
      logging: true,
      synchronize: false,
      entities: Object.values(ENTITIES),
      migrations: disableMigration ? [] : ["database/migrations/*.ts"],
      subscribers: disableMigration ? [] : ["database/migrations/*.ts"],
      migrationsTableName: "migrations_typeorm",
    });

    return dataSource;
  }

  private async init(config: PSQLOpts) {
    if (!this.db) throw new Error("Database not initialized.");
    await this.db.initialize();
  }
}
