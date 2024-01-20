import type { TlsOptions } from "tls";

export type PSQLOpts = {
  type: "postgres";
  url?: string;
  host?: string;
  port?: number;
  username?: string;
  password?: string | (() => string) | (() => Promise<string>);
  database?: string;
  ssl?: boolean | TlsOptions;
};
