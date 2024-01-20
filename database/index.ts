/* Data Source */
import { PgDatabase } from "./dataSource";

/* Config */
import { databaseConfig } from "./config";

export const connection = new PgDatabase(databaseConfig, {
  init: true,
  disableMigration: true,
});

export { ENTITIES as entities } from "./dataSource/entities";
