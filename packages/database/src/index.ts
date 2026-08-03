import mysql from "mysql2/promise";

function requireEnv(key: string): string {
  const value = process.env[key];
  if (!value) throw new Error(`Missing required environment variable: ${key}`);
  return value;
}

const useSSL = process.env.DB_SSL === "true";

export const pool = mysql.createPool({
  host: requireEnv("DB_HOST"),
  port: Number(requireEnv("DB_PORT")),
  user: requireEnv("DB_USER"),
  password: requireEnv("DB_PASSWORD"),
  database: requireEnv("DB_NAME"),
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
  dateStrings: true,
  ...(useSSL && {
    ssl: {
      rejectUnauthorized: false,
    },
  }),
});

export type { QueryError } from "mysql2";
export * from "./types";
