/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */
import "./styles.css";
import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { addToCart } from "../../utils/cart"; // Importamos solo addToCart

const ProductPage = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [modalMessage, setModalMessage] = useState("");
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [modalStatus, setModalStatus] = useState("success"); // Estado para determinar el ícono en el modal

  const products = [
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

  useEffect(() => {
    const foundProduct = products.find((p) => p.id === parseInt(id));
    if (foundProduct) {
      setProduct(foundProduct);
    }
  }, [id]);

  // Función para verificar si el producto ya está en el carrito
  const isProductInCart = (product) => {
    const cart = JSON.parse(localStorage.getItem("cart")) || [];
    return cart.some(item => item.id === product.id); // Verifica si el id del producto existe en el carrito
  };

  const handleCart = () => {
    if (product) {
      if (isProductInCart(product)) {
        setModalMessage("El producto ya está en el carrito.");
        setModalStatus("error"); // Mostrar la X roja si ya está en el carrito
      } else {
        addToCart(product);
        setModalMessage("Producto agregado al carrito con éxito.");
        setModalStatus("success"); // Mostrar el tick verde si se agrega con éxito
      }
      setIsModalVisible(true); // Mostrar el modal
    }
  };

  const closeModal = () => {
    setIsModalVisible(false); // Ocultar el modal
  };

  if (!product) {
    return <div>Cargando...</div>;
  }

  return (
    <div className="product-container">
      <header>
        <h1>Página de Producto</h1>
      </header>

      <div className="product">
        <img src={product.url_imagen} alt={product.nombre} />
        <div className="product-details">
          <h1 className="nombre">{product.nombre}</h1>
          <h3>Descripción</h3>
          <p className="description">{product.descripcion}</p>
          <p className="author">Artista: {product.autor}</p>
          <p className="dimensions">Dimensiones: {product.dimensiones}</p>
          <div className="price">$ {product.precio.toFixed(2)}</div>
          <button onClick={handleCart} className="add-to-cart">
            + Añadir al carrito
          </button>
        </div>
      </div>

      {/* Modal */}
      {isModalVisible && (
        <div className="modal">
          <div className="modal-content">
            {/* Icono en el modal */}
            <div className={`modal-icon ${modalStatus}`}>
              {modalStatus === "success" ? (
                <span className="tick">✔</span> // Tick verde
              ) : (
                <span className="error">✖</span> // X roja
              )}
            </div>
            <p>{modalMessage}</p>
            <button className="modal-btn" onClick={closeModal}>Cerrar</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProductPage;
