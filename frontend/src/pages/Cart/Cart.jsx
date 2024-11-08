import { useState, useEffect } from "react";
import "./styles.css";
import { initMercadoPago, Wallet } from "@mercadopago/sdk-react";
import api from "../../utils/api";
const initialProductsCart = [
  {
    id: 8,
    nombre: "Cuadro surrealista",
    descripcion: "Cuadro surrealista inspirado en sueños.",
    autor: "Artista 8",
    precio: 2500.0,
    dimensiones: "110x90 cm",
    tipo_obra: "cuadro",
    url_imagen: "https://via.placeholder.com/150",
  },
  {
    id: 9,
    nombre: "Escultura en madera",
    descripcion: "Escultura tallada en madera natural.",
    autor: "Artista 9",
    precio: 3500.0,
    dimensiones: "75x40x35 cm",
    tipo_obra: "escultura",
    url_imagen: "https://via.placeholder.com/150",
  },
  {
    id: 10,
    nombre: "Pintura floral",
    descripcion: "Cuadro de flores al óleo.",
    autor: "Artista 10",
    precio: 1300.0,
    dimensiones: "100x50 cm",
    tipo_obra: "cuadro",
    url_imagen: "https://via.placeholder.com/150",
  },
];

const Cart = () => {
  const [preferenceId, setPreferenceId] = useState(null);

  initMercadoPago("APP_USR-14a92e02-1b94-4bdb-bae0-64fbaf316a3c");
  const initialization = {
    preferenceId: preferenceId,
  };

  const customization = {
    texts: {
      valueProp: "smart_option",
    },
  };

  const onSubmit = async (formData) => {
    // callback llamado al hacer clic en Wallet Brick
    // esto es posible porque Brick es un botón
  };

  const onError = async (error) => {
    // callback llamado para todos los casos de error de Brick
    console.log(error);
  };

  const onReady = async () => {
    // Callback llamado cuando Brick esté listo.
    // Aquí puedes ocultar loadings en tu sitio, por ejemplo.
  };
  // Estado para manejar los productos en el carrito
  const [productsCart, setProductsCart] = useState(
    JSON.parse(localStorage.getItem("cart")) || initialProductsCart
  );
  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(productsCart));
  }, [productsCart]);
  // Función para eliminar un producto del carrito
  const handleRemoveProduct = (id) => {
    const updatedCart = productsCart.filter((product) => product.id !== id);
    setProductsCart(updatedCart);
  };

  // Calcular el subtotal sumando los precios de cada producto
  const subtotal = productsCart
    .reduce((acc, product) => acc + product.precio, 0)
    .toFixed(2);
  const handleGetPreference = async () => {
    const response = await api.post("/create_preference", { price: subtotal });
    console.log(response);
    setPreferenceId(response.data.id);
  };
  return (
    <div className="cart-container">
      <div className="cart-header">
        <h1>CARRITO</h1>
        <a href="#" className="back-link">
          Volver a productos
        </a>
      </div>

      <div className="cart-grid-header">
        <div>Producto</div>
        <div>Precio</div>
        <div>Total</div>
      </div>

      {productsCart.length > 0 ? (
        productsCart.map((product) => (
          <div key={product.id} className="cart-item">
            <div className="product-cell">
              <img
                src={product.url_imagen}
                alt={product.nombre}
                className="product-image"
              />
              <div className="product-info">
                <div className="product-title">{product.nombre}</div>
                <button
                  className="remove-link"
                  onClick={() => handleRemoveProduct(product.id)}
                >
                  Eliminar
                </button>
              </div>
            </div>
            <div className="price-cell" data-label="Precio">
              ${product.precio.toFixed(2)}
            </div>
            <div className="total-cell" data-label="Total">
              ${product.precio.toFixed(2)}
            </div>
          </div>
        ))
      ) : (
        <p className="empty-cart-message">El carrito está vacío.</p>
      )}

      <div className="cart-summary">
        <div className="cart-summary-left">
          <div className="subtotal">Sub-total: ${subtotal}</div>
          <p className="shipping-note">
            *Precio sin impuestos, ni costos de envío.
          </p>
        </div>
        <button
          className="checkout-button"
          disabled={productsCart.length === 0}
          onClick={handleGetPreference}
        >
          Comprar
        </button>
        <div id="wallet_container"></div>
        {preferenceId && (
          <Wallet
            initialization={initialization}
            customization={customization}
            onSubmit={onSubmit}
            onReady={onReady}
            onError={onError}
          />
        )}
      </div>
    </div>
  );
};

export default Cart;
