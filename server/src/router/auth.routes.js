import { Router } from "express";
import {
  registrarse,
  ingresar,
  salir,
  perfil
} from "../controllers/auth.controller.js"

const router = Router();

router.post("/registrarse", (req, res) => {
  res.json({ message: "Signup route" });
});

router.post("/ingresar", (req, res) => {
  res.json({ message: "Signin route" });
});

router.post("/salir", (req, res) => {
  res.json({ message: "Logout route" });
});

router.get("/perfil", (req, res) => {
  res.json({ message: "Profile route" });
});

export default router;
