import type { PSQLOpts } from "../types";

export const databaseConfig: PSQLOpts = {
  type: "postgres",
  host: process.env.DB_HOST,
  port: Number(process.env.PG_PORT) || 5432,
  username: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  ssl: true,
};
