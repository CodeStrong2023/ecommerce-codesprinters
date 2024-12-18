import { pool } from "../db.js";
import bcrypt from "bcrypt";
import { createAccessToken } from "../libs/jwt.js";

// FUNCION REGISTRARSE
export const registrarse = async (req, res, next) => {
  const { nombre, email, contrasena } = req.body;

  try {
    const hashedcontrasena = await bcrypt.hash(contrasena, 10);

    const result = await pool.query(
      "INSERT INTO usuarios (nombre, email, contrasena) VALUES ($1, $2, $3) RETURNING *",
      [nombre, email, hashedcontrasena]
    );

    const token = await createAccessToken({ id: result.rows[0].id });

    //codigo de generacion de cookie
    res.cookie("token", token, {
      //httpOnly: true, //SOLO ACTIVARLO EN PRODUCCION
      secure: true,
      sameSite: "none",
      maxAge: 60 * 60 * 24 * 1000,
    });
    return res.json(result.rows[0]);
  } catch (error) {
    if (error.code === "23505") {
      return res.status(400).json({ message: "EL CORREO YA ESTA REGISTRADO" });
    }
    return res
      .status(500)
      .json({ message: "Error interno del servidor", error: error });
  }
};
// FUNCION INGRESAR
export const ingresar = async (req, res) => {
  const { email, contrasena } = req.body;

  try {
    // Verificar si el usuario existe
    const result = await pool.query("SELECT * FROM usuarios WHERE email = $1", [
      email,
    ]);
    if (result.rowCount === 0) {
      return res.status(400).json({ message: "El correo no está registrado" });
    }

    // Validar la contraseña
    const validContrasena = await bcrypt.compare(
      contrasena,
      result.rows[0].contrasena
    );
    if (!validContrasena) {
      return res.status(400).json({ message: "La contraseña es incorrecta" });
    }

    // Generar token
    const token = await createAccessToken({ id: result.rows[0].id });
    res.cookie("token", token, {
      //httpOnly: true,
      secure: true,
      sameSite: "none",
      maxAge: 60 * 60 * 24 * 1000, // 1 día
    });

    // Enviar respuesta
    return res.status(200).json(result.rows[0]);
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Error interno del servidor", error: error });
  }
};

// FUNCION SALIR
export const salir = (req, res) => {
  res.clearCookie("token");
  return res.json({ message: "Sesion cerrada" });
};

// FUNCION PERFIL
export const perfil = async (req, res) => {
  try {
    const result = await pool.query(
      "SELECT id,nombre,email FROM usuarios WHERE id = $1",
      [req.usuarioId]
    );

    if (result.rowCount === 0) {
      return res.status(404).json({ message: "Usuario no encontrado" });
    }

    return res.json(result.rows[0]);
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Error interno del servidor", error: error });
  }
};
