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
