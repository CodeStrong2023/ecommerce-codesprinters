import {pool} from "../db.js"
export const registrarse =(req,res) => {
    const{nombre,email,contraseña} =req.body;
    res.send("REGISTRANDO");
    pool.query("INSERT INTO usuarios {nombre,email,contraseña} VALUES (1$, 2$, 3$)",[nombre,email,contraseña])
};

export const ingresar =(req,res) => res.send("INGRESANDO");

export const salir =(req,res) => res.send("SALIENDO");

export const perfil=(req,res) => res.send("MOSTRANDO PERFIL");