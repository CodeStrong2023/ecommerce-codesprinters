import express from "express";
import morgan from "morgan";
import productosRoutes from "./router/productos.routes.js";
import authRoutes from "./router/auth.routes.js";
import cookieParser from "cookie-parser";
import cors from "cors";
import { ORIGIN } from "./config.js";
const app = express();
const mercadopago = require('mercadopago');

//Confiuguramos las credenciales de acceso
mercadopago.configure({
  acces_token: 'TU_ACCES_TOKEN',
});

app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(cors());
app.use(express.static(path.join(__dirname, "../client")));

app.get("/", function (req, res) {
  res.sendFile(path.resolve(__dirname, "..", "client", "index.html"));
});

app.post("/create_preference", (req, res) => {
  const preference = {
    items: [
      {
        title: "Compra E-commerce",
        quantity: 1,
        unit_price: parseFloat(req.body.price),
      },
    ],
    back_urls: {
      success: "http://localhost:5173/confirmation",
      failure: "http://localhost:5173/denied",
    },
    auto_return: "approved",
  };

  mercadopago.preferences
    .create(preference)
    .then(function (response) {
      res.json({
        id: response.body.id
      });
    })
    .catch(function (error) {
      console.log(error);
      res.status(500).send("Error al crear la preferencia de pago");
    });
});

app.get("/feedback", function (req, res) {
  res.json({
    Payment: req.query.payment_id,
    Status: req.query.status,
    MerchantOrder: req.query.merchant_order_id,
  });
});

app.listen(5173, () => {
  console.log("The server is now running on Port 5173");
});

//Middlewares
app.use[morgan("dev")]; 
// Para leer las Cookies 
app.use(cookieParser());
//Para ver errores en consola
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(
  cors({
    origin: ORIGIN,
    credentials: true,
  })
);
app.use("/api", productosRoutes);
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
