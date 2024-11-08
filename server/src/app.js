import express from "express";
import morgan from "morgan";
import productosRoutes from "./router/productos.routes.js";
import authRoutes from "./router/auth.routes.js";
import cookieParser from "cookie-parser";
import cors from "cors";
import { ORIGIN } from "./config.js";
import path from "path";
import { MercadoPagoConfig, Preference } from "mercadopago";
const app = express();

// Configuramos las credenciales de acceso para Mercado Pago
const client = new MercadoPagoConfig({
  accessToken:
    "APP_USR-4601492056605716-110813-f822f1bf501479056186a037b4d4396f-2083974841",
});
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(
  cors({
    origin: ORIGIN,
    credentials: true,
  })
);
app.use(morgan("dev"));
app.use(cookieParser());

// Rutas
app.use("/api", productosRoutes);
app.use("/api/auth", authRoutes);

// Rutas de Mercado Pago
app.post("/api/create_preference", async (req, res) => {
  const preference = new Preference(client);
  preference
    .create({
      body: {
        items: [
          {
            title: "Compra E-commerce",
            quantity: 1,
            unit_price: Number(req.body.price),
          },
        ],
        back_urls: {
          success: "http://localhost:5173/success/",
          failure: "http://localhost:5173/failure/",
          pending: "http://localhost:5173/pending/",
        },
        auto_return: "approved",
      },
    })
    .then((response) => {
      console.log(response);
      res.json({
        id: response.id,
      });
    })
    .catch((error) => {
      console.error(error);
      res
        .status(500)
        .json({ error: "Error al crear la preferencia", error: error });
    });
});

app.get("/feedback", (req, res) => {
  res.json({
    Payment: req.query.payment_id,
    Status: req.query.status,
    MerchantOrder: req.query.merchant_order_id,
  });
});

/* // Ruta principal
app.get("/", (req, res) => {
  res.sendFile(path.resolve(__dirname, "..", "client", "index.html"));
}); */

app.get("/test", (req, res) => {
  throw new Error("This is a test error");
});

// Middleware de manejo de errores
app.use((err, req, res, next) => {
  res.status(500).json({
    status: "error",
    message: err.message,
  });
});

export default app;
