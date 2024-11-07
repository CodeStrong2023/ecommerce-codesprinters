/* eslint-disable no-unused-vars */
// App.js
import React, { useState } from 'react';
import "./App.css"
function Apps() {
  const [products, setProducts] = useState([]);
  const [newProduct, setNewProduct] = useState({ name: '', price: '', image: null });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewProduct({ ...newProduct, [name]: value });
  };

  const handleFileChange = (e) => {
    setNewProduct({ ...newProduct, image: URL.createObjectURL(e.target.files[0]) });
  };

  const addProduct = (e) => {
    e.preventDefault();
    if (newProduct.name && newProduct.price && newProduct.image) {
      setProducts([...products, { ...newProduct, id: Date.now() }]);
      setNewProduct({ name: '', price: '', image: null });
    } else {
      alert("Por favor, completa todos los campos.");
    }
  };

  const editProduct = (id) => {
    const updatedProducts = products.map(product => {
      if (product.id === id) {
        const newName = prompt("Editar nombre del producto:", product.name);
        const newPrice = prompt("Editar precio del producto:", product.price);
        return {
          ...product,
          name: newName !== null ? newName : product.name,
          price: newPrice !== null ? newPrice : product.price,
        };
      }
      return product;
    });
    setProducts(updatedProducts);
  };

  const deleteProduct = (id) => {
    if (window.confirm("¿Estás seguro de que deseas eliminar este producto?")) {
      setProducts(products.filter(product => product.id !== id));
    }
  };

  return (
    <div className="container">
      <div className="add-product-form">
        <h2>AÑADIR UN NUEVO PRODUCTO</h2>
        <form onSubmit={addProduct}>
          <input
            type="text"
            name="name"
            placeholder="Ingresa el nombre del producto"
            value={newProduct.name}
            onChange={handleInputChange}
            required
          />
          <input
            type="number"
            name="price"
            placeholder="Ingresa el precio del producto"
            value={newProduct.price}
            onChange={handleInputChange}
            required
          />
          <input type="file" accept="image/*" onChange={handleFileChange} />
          <button type="submit">Añadir Producto</button>
        </form>
      </div>

      <table>
        <thead>
          <tr>
            <th>Imagen del Producto</th>
            <th>Nombre del Producto</th>
            <th>Precio del Producto</th>
            <th>Acción</th>
          </tr>
        </thead>
        <tbody>
          {products.map((product) => (
            <tr key={product.id}>
              <td><img src={product.image} alt={product.name} /></td>
              <td>{product.name}</td>
              <td>${product.price}/-</td>
              <td>
                <button onClick={() => editProduct(product.id)}>Editar</button>
                <button onClick={() => deleteProduct(product.id)}>Eliminar</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default Apps;
