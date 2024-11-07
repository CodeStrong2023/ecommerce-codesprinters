import pg from "pg";
import {
  PG_PORT,
  PG_DATABASE,
  PG_HOST,
  PG_PASSWORD,
  PG_USER,
} from "./config.js";
export const pool = new pg.Pool({
  port: PG_PORT,
  hots: PG_HOST,
  user: PG_USER,
  password: PG_PASSWORD,
  database: PG_DATABASE,
});
pool.on("Connectado al servidor", () => {
  console.log("Conectado a la base de datos");
});
