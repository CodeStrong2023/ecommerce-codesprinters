/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */
import "./styles.css";
import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { addToCart } from "../../utils/cart";
import { getProducto } from "../../utils/api"; // Importamos getProducto

const ProductPage = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [modalMessage, setModalMessage] = useState("");
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [modalStatus, setModalStatus] = useState("success");
  const [loading, setLoading] = useState(true); // Estado de carga
  const [error, setError] = useState(null); // Estado de error

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const fetchedProduct = await getProducto(id);
        if (fetchedProduct) {
          setProduct(fetchedProduct);
        } else {
          setError("Producto no encontrado.");
        }
      } catch (error) {
        setError("Error al cargar el producto.");
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [id]);

  // Función para verificar si el producto ya está en el carrito
  const isProductInCart = (product) => {
    const cart = JSON.parse(localStorage.getItem("cart")) || [];
    return cart.some((item) => item.id === product.id);
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

  if (loading) {
    return <div>Cargando...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  if (!product) {
    return <div>No se encontró el producto.</div>;
  }

  return (
    <div className="product-container">
      <div className="product-title">
        <h1>{product.nombre}</h1>
      </div>

      <div className="product">
        <img src={product.url_imagen} alt={product.nombre} />
        <div className="product-details">
          <h1 className="nombre">{product.nombre}</h1>
          <h3>Descripción</h3>
          <p className="description">{product.descripcion}</p>
          {product.autor && <p className="author">Artista: {product.autor}</p>}
          <p className="dimensions">Dimensiones: {product.dimensiones}</p>
          <div className="price">$ {parseFloat(product.precio).toFixed(2)}</div>
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
            <button className="modal-btn" onClick={closeModal}>
              Cerrar
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProductPage;
