import express from "express";
import morgan from "morgan";
import productosRoutes from "./router/productos.routes.js";
import authRoutes from "./router/auth.routes.js";
import cookieParser from "cookie-parser";
const app = express();

//Middlewares
app.use[morgan("dev")]; 
// Para leer las Cookies 
app.use(cookieParser());
//Para ver errores en consola
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use("/api/productos", productosRoutes);
app.use("/api/auth", authRoutes);

app.get("/", (req, res) => {
  res.json({ message: "Ecomerce CodeSprinters" });
});
app.get("/test", (req, res) => {
  throw new Error("This is a test error");
});

//manejando errores
app.use((err, req, res, next) => {
  res.status(500).json({
    status: "error",
    message: err.message,
  });
});

export default app;
