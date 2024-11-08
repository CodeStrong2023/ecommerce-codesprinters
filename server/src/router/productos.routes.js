import  Router  from "express-promise-router";
import {
  listarProducto,
  listarProductos,
  eliminarProducto,
  crearProducto,
  actualizarProducto,
} from "../controllers/productos.controller.js";

const router = Router();

router.get("/productos", listarProductos);

router.get("/producto/:id", listarProducto);

router.post("/productos", crearProducto);

router.put("/productos/:id", actualizarProducto);

router.delete("/productos/:id", eliminarProducto);

export default router;
