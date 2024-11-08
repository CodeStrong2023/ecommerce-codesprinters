import app from "./app.js";
import {
  PORT,
  ORIGIN,
  PG_DATABASE,
  PG_HOST,
  PG_PASSWORD,
  PG_PORT,
  PG_USER,
} from "./config.js";
app.listen(PORT);
console.log("Servidor en el puerto", PORT);
console.log("ORIGIN", ORIGIN);
console.log("PG_DATABASE", PG_DATABASE);
console.log("PG_HOST", PG_HOST);
console.log("PG_PASSWORD", PG_PASSWORD);
console.log("PG_PORT", PG_PORT);
console.log("PG_USER", PG_USER);
