/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from "react";
import "./App.css";
import {
  createProducto,
  updateProducto,
  deleteProducto,
  getProductos,
} from "../../utils/api";
import Cookies from "js-cookie";
import { AuthContext } from "../../context/AuthContext";
import { useContext } from "react";
import { useNavigate } from "react-router-dom";
function Apps() {
  const navigate = useNavigate();
  const { isAuth } = useContext(AuthContext);
  const initialProductState = {
    nombre: "",
    precio: "",
    url_imagen: "",
    descripcion: "",
    dimensiones: "",
    tipo_obra: "",
  };
  const [products, setProducts] = useState([]);
  const [newProduct, setNewProduct] = useState(initialProductState);
  const [editingProductId, setEditingProductId] = useState(null);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const products = await getProductos();
        setProducts(products);
      } catch (error) {
        alert("Error al cargar los productos.");
      }
    };

    fetchProducts();
  }, []);
  useEffect(() => {
    if (!isAuth) {
      navigate("/");
    }
  }, []);
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewProduct({ ...newProduct, [name]: value });
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();

    const { nombre, precio, url_imagen, descripcion, dimensiones, tipo_obra } =
      newProduct;

    if (
      nombre &&
      precio &&
      url_imagen &&
      descripcion &&
      dimensiones &&
      tipo_obra
    ) {
      try {
        if (editingProductId) {
          // Actualizar producto existente
          const updatedProduct = await updateProducto(
            editingProductId,
            newProduct
          );
          setProducts(
            products.map((product) =>
              product.id === editingProductId ? updatedProduct : product
            )
          );
          setEditingProductId(null);
          setNewProduct(initialProductState);
          alert("Producto actualizado con éxito.");
        } else {
          // Crear nuevo producto
          const createdProduct = await createProducto(newProduct);
          setNewProduct(initialProductState);
          alert("Producto creado con éxito.");
        }
      } catch (error) {
        alert("Ocurrió un error al procesar la solicitud.");
      }
    } else {
      alert("Por favor, completa todos los campos.");
    }
  };

  const editProduct = (product) => {
    setEditingProductId(product.id);
    setNewProduct({
      nombre: product.nombre,
      precio: product.precio,
      url_imagen: product.url_imagen,
      descripcion: product.descripcion,
      dimensiones: product.dimensiones,
      tipo_obra: product.tipo_obra,
      estado: product.estado,
    });
  };

  const cancelEdit = () => {
    setEditingProductId(null);
    setNewProduct(initialProductState);
  };

  const deleteProduct = async (id) => {
    if (window.confirm("¿Estás seguro de que deseas eliminar este producto?")) {
      try {
        await deleteProducto(id);
        setProducts(products.filter((product) => product.id !== id));
        alert("Producto eliminado con éxito.");
      } catch (error) {
        alert("Ocurrió un error al eliminar el producto.");
      }
    }
  };

  return (
    <div className="admin-container">
      <div className="add-product-form appear-slide-up">
        <h2>{editingProductId ? "EDITAR OBRA" : "AÑADIR UNA NUEVA OBRA"}</h2>
        <form onSubmit={handleFormSubmit}>
          <input
            type="text"
            name="nombre"
            placeholder="Nombre de la obra"
            value={newProduct.nombre}
            onChange={handleInputChange}
            required
          />
          <input
            type="number"
            name="precio"
            placeholder="Precio de la obra"
            value={newProduct.precio}
            onChange={handleInputChange}
            required
          />
          <input
            type="text"
            name="url_imagen"
            placeholder="URL de la imagen"
            value={newProduct.url_imagen}
            onChange={handleInputChange}
            required
          />
          <textarea
            name="descripcion"
            placeholder="Descripción de la obra"
            value={newProduct.descripcion}
            onChange={handleInputChange}
            className="description-textarea"
            required
          ></textarea>
          <input
            type="text"
            name="dimensiones"
            placeholder="Dimensiones (e.g., 50x70 cm)"
            value={newProduct.dimensiones}
            onChange={handleInputChange}
            required
          />
          <input
            type="text"
            name="tipo_obra"
            placeholder="Tipo de obra (e.g., Pintura, Escultura)"
            value={newProduct.tipo_obra}
            onChange={handleInputChange}
            required
          />
          <button type="submit">
            {editingProductId ? "Actualizar Obra" : "Añadir Obra"}
          </button>
          {editingProductId && (
            <button type="button" onClick={cancelEdit}>
              Cancelar
            </button>
          )}
        </form>
      </div>

      <table>
        <thead>
          <tr>
            <th>Imagen</th>
            <th>Nombre</th>
            <th>Precio</th>
            <th>Descripción</th>
            <th>Dimensiones</th>
            <th>Tipo</th>
            <th>Estado</th>
            <th>Acción</th>
          </tr>
        </thead>
        <tbody>
          {products.map((product) => (
            <tr key={product.id} className="appear-fade-in">
              <td>
                <img src={product.url_imagen} alt={product.nombre} />
              </td>
              <td>{product.nombre}</td>
              <td>${product.precio}</td>
              <td>{product.descripcion}</td>
              <td>{product.dimensiones}</td>
              <td>{product.tipo_obra}</td>
              <td>{product.estado}</td>
              <td>
                <button
                  className="btn-edit"
                  onClick={() => editProduct(product)}
                >
                  Editar
                </button>
                <button
                  className="btn-delete"
                  onClick={() => deleteProduct(product.id)}
                >
                  Eliminar
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default Apps;
