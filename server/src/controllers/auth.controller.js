import {pool} from "../db.js"
import bcrypt from "bcrypt";
import {creatAccessToken } from "../libs/jwt.js"

// FUNCION REGISTRARSE
export const registrarse = async (req, res) => {
    const { nombre, email, contraseña } = req.body;

    try {
        const hashedContraseña = await bcrypt.hash(contraseña, 10);
        console.log(hashedContraseña);
        
        const result = await pool.query(
            "INSERT INTO usuarios (nombre, email, contraseña) VALUES ($1, $2, $3) RETURNING *",
            [nombre, email, hashedContraseña]
        );

        const token = await creatAccessToken({ id: result.rows[0].id });
        console.log(result);

        //codigo de generacion de cookie 
        res.cookie("token",token,{
            httpOnly:true,
            sameSite: "none",
            maxAge: 60*60*24*1000, })
        return res.json({ token: token });

    } catch (error) {
        if (error.code === "23505") {
            return res.status(400).json({ message: "EL CORREO YA ESTA REGISTRADO" });
        }
        return res.status(500).json({ message: "Error interno del servidor" });
    }
};
// FUNCION INGRESAR
export const ingresar =(req,res) => res.send("INGRESANDO");

// FUNCION SALIR 
export const salir =(req,res) => res.send("SALIENDO");

// FUNCION PERFIL 
export const perfil=(req,res) => res.send("MOSTRANDO PERFIL");