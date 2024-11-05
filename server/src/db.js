import pg from "pg";
export const pool = new pg.Pool({
    port:5434,
    hots:"localhost",
    user:"postgres",
    password:"admin",
    database:"PERN",
});
pool.on("Connectado al servidor", () => {
    console.log("Conectado a la base de datos");
});