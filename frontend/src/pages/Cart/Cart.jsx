import react, { useState } from 'react';
import './styles.css';

const initialProductsCart = [
  {
    id: 8,
    nombre: "Cuadro surrealista",
    descripcion: "Cuadro surrealista inspirado en sueños.",
    autor: "Artista 8",
    precio: 2500.00,
    dimensiones: "110x90 cm",
    tipo_obra: "cuadro",
    url_imagen: "https://via.placeholder.com/150",
  },
  {
    id: 9,
    nombre: "Escultura en madera",
    descripcion: "Escultura tallada en madera natural.",
    autor: "Artista 9",
    precio: 3500.00,
    dimensiones: "75x40x35 cm",
    tipo_obra: "escultura",
    url_imagen: "https://via.placeholder.com/150",
  },
  {
    id: 10,
    nombre: "Pintura floral",
    descripcion: "Cuadro de flores al óleo.",
    autor: "Artista 10",
    precio: 1300.00,
    dimensiones: "100x50 cm",
    tipo_obra: "cuadro",
    url_imagen: "https://via.placeholder.com/150",
  }
];

const Cart = () => {
  // Estado para manejar los productos en el carrito
  const [productsCart, setProductsCart] = useState(initialProductsCart);

  // Función para eliminar un producto del carrito
  const handleRemoveProduct = (id) => {
    const updatedCart = productsCart.filter((product) => product.id !== id);
    setProductsCart(updatedCart);
  };

  // Calcular el subtotal sumando los precios de cada producto
  const subtotal = productsCart.reduce((acc, product) => acc + product.precio, 0).toFixed(2);

  return (
    <div className="container">
      <div className="cart-header">
        <h1>CARRITO</h1>
        <a href="#" className="back-link">Volver a productos</a>
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
              <img src={product.url_imagen} alt={product.nombre} className="product-image" />
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
            <div className="price-cell" data-label="Precio">${product.precio.toFixed(2)}</div>
            <div className="total-cell" data-label="Total">${product.precio.toFixed(2)}</div>
          </div>
        ))
      ) : (
        <p className="empty-cart-message">El carrito está vacío.</p>
      )}

      <div className="cart-summary">
        <div className="cart-summary-left">
          <div className="subtotal">Sub-total: ${subtotal}</div>
          <p className="shipping-note">*Precio sin impuestos, ni costos de envío.</p>
        </div>
        <button className="checkout-button" disabled={productsCart.length === 0}>
          Comprar
        </button>
      </div>

      <footer className="footer">
        <div className="footer-logo">Obra viva</div>
        <div className="footer-nav">
          <div>
            <strong className="footer-titles">Descubrimiento</strong>
            <a href="#">Nueva temporada</a>
            <a href="#">Más buscados</a>
            <a href="#">Más vendidos</a>
          </div>
          <div>
            <strong className="footer-titles">Acerca de</strong>
            <a href="#">Ayuda</a>
            <a href="#">Envío</a>
            <a href="#">Afiliados</a>
          </div>
          <div>
            <strong className="footer-titles">Información</strong>
            <a href="#">Contáctanos</a>
            <a href="#">Políticas de privacidad</a>
            <a href="#">Términos y condiciones</a>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Cart;
