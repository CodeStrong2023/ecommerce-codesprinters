import { useState, useEffect } from "react";
import "./styles.css";
import { initMercadoPago, Wallet } from "@mercadopago/sdk-react";
import api from "../../utils/api";

const Cart = () => {
  // Estado para guardar el ID de preferencia de pago
  const [preferenceId, setPreferenceId] = useState(null);

  // Inicializar Mercado Pago con una clave de API pública
  initMercadoPago("APP_USR-14a92e02-1b94-4bdb-bae0-64fbaf316a3c");

  // Configuración inicial de Wallet con el ID de preferencia
  const initialization = {
    preferenceId: preferenceId,
  };

  // Personalización de Wallet (botón de pago de Mercado Pago)
  const customization = {
    texts: {
      valueProp: "smart_option", // Texto en el botón de pago
    },
  };

  // Función que se ejecuta al hacer clic en el botón Wallet
  // eslint-disable-next-line no-unused-vars
  const onSubmit = async (formData) => {
    // Aquí podrías manejar la información del pago o seguir un flujo posterior al pago
  };

  // Función que maneja los errores de Wallet
  const onError = async (error) => {
    // Muestra el error en consola (útil para debugging)
    console.log(error);
  };

  // Función que se ejecuta cuando Wallet está listo para ser mostrado
  const onReady = async () => {
    // Aquí podrías ocultar una animación de carga o mostrar el botón
  };

  // Estado para manejar los productos en el carrito de compras
  const [productsCart, setProductsCart] = useState(
    JSON.parse(localStorage.getItem("cart") || "[]") // Inicializa con productos almacenados en localStorage
  );

  // Actualiza el localStorage cada vez que cambia el carrito
  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(productsCart));
  }, [productsCart]);

  // Función para eliminar un producto del carrito
  const handleRemoveProduct = (id) => {
    const updatedCart = productsCart.filter((product) => product.id !== id);
    setProductsCart(updatedCart); // Actualiza el estado del carrito
  };

  // Calcular el subtotal sumando los precios de cada producto en el carrito
  const subtotal = productsCart
    .reduce((acc, product) => acc + Number(product.precio), 0)
    .toFixed(2); // Formatea el subtotal con 2 decimales

  // Función para crear una preferencia de pago y obtener su ID
  const handleGetPreference = async () => {
    // Recopila los IDs de los productos en el carrito
    const producstIds = productsCart.map((product) => product.id);

    // Hace una solicitud a la API para crear la preferencia de pago
    const response = await api.post("/create_preference", {
      price: subtotal, // Envía el subtotal
      ids: producstIds, // Envía los IDs de productos
    });

    console.log(response); // Muestra la respuesta en consola (útil para debugging)
    setPreferenceId(response.data.id); // Guarda el ID de preferencia para usarlo en Wallet
  };

  return (
    <div className="cart-container">
      <div className="cart-header">
        <h1>CARRITO</h1>
        <a href="#" className="back-link">
          Volver a productos
        </a>
      </div>

      {/* Encabezado de la tabla del carrito */}
      <div className="cart-grid-header">
        <div>Producto</div>
        <div>Precio</div>
        <div>Total</div>
      </div>

      {/* Lista de productos en el carrito */}
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

      {/* Resumen del carrito y botón para comprar */}
      <div className="cart-summary">
        <div className="cart-summary-left">
          <div className="subtotal">Sub-total: ${subtotal}</div>
          <p className="shipping-note">
            *Precio sin impuestos, ni costos de envío.
          </p>
        </div>

        {/* Botón que genera la preferencia de pago al hacer clic */}
        <button
          className="checkout-button"
          disabled={productsCart.length === 0}
          onClick={handleGetPreference}
        >
          Comprar
        </button>

        {/* Contenedor para el componente Wallet de Mercado Pago */}
        <div id="wallet_container"></div>

        {/* Renderiza Wallet solo si hay un ID de preferencia */}
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

