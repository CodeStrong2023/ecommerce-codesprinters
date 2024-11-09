import { useState, useEffect } from "react";
import "./styles.css";
import { initMercadoPago, Wallet } from "@mercadopago/sdk-react";
import api from "../../utils/api";

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
    JSON.parse(localStorage.getItem("cart") || "[]")
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
    .reduce((acc, product) => acc + Number(product.precio), 0)
    .toFixed(2);
  const handleGetPreference = async () => {
    const producstIds = productsCart.map((product) => product.id);
    const response = await api.post("/create_preference", {
      price: subtotal,
      ids: producstIds,
    });
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
              ${Number(product.precio).toFixed(2)}
            </div>
            <div className="total-cell" data-label="Total">
              ${Number(product.precio).toFixed(2)}
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
