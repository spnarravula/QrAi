/* 
    NOTE: Only run this file for migrations 
    Do not use for running the application
*/

import dotenv from "dotenv";
dotenv.config();

/* Other Import statements */
import { databaseConfig } from "./config";
import { PgDatabase } from "./dataSource";

const db = new PgDatabase(databaseConfig, {
  disableMigration: false,
  init: true,
});

export const AppDataSource = db.getDatasource();
