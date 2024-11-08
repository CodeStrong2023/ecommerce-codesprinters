import Router from "express-promise-router";
import {
  listarProducto,
  listarProductos,
  eliminarProducto,
  crearProducto,
  actualizarProducto,
} from "../controllers/productos.controller.js";
// autentificar usuario -isAuth
import { isAuth } from "../middlewares/auth.middleware.js";

const router = Router();
// Rutas de las tareas
router.get("/productos", listarProductos);

router.get("/producto/:id", listarProducto);

router.post("/productos", crearProducto);

router.put("/productos/:id", isAuth, actualizarProducto);

router.delete("/productos/:id", isAuth, eliminarProducto);

export default router;
