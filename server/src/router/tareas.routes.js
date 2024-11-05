import  Router  from "express-promise-router";
import {
  listarTarea,
  listarTareas,
  crearTarea,
  actualizarTarea,
  eliminarTarea,
} from "../controllers/tareas.controller.js";

const router = Router();

router.get("/tareas", listarTarea);

router.get("/tareas/:id", listarTareas);

router.post("/tareas", crearTarea);

router.put("/tareas/:id", actualizarTarea);

router.delete("/tareas/:id", eliminarTarea);

export default router;
