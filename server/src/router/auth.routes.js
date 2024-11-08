import Router from "express-promise-router";
import {registrarse, ingresar, salir, perfil} from "../controllers/auth.controller.js"

const router = Router();

router.post("/registrarse",registrarse);

router.post("/ingresar", ingresar);

router.post("/salir", salir);

router.get("/perfil", perfil);

export default router;