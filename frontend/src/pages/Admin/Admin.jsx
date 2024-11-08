/* eslint-disable no-unused-vars */
// App.js
import React, { useState } from 'react';
import "./App.css"

function Apps() {
  const [products, setProducts] = useState([]);
  const [newProduct, setNewProduct] = useState({ name: '', price: '', imageUrl: '', description: '', dimensions: '', type: '' });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewProduct({ ...newProduct, [name]: value });
  };

  const addProduct = (e) => {
    e.preventDefault();
    const { name, price, imageUrl, description, dimensions, type } = newProduct;
    if (name && price && imageUrl && description && dimensions && type) {
      setProducts([...products, { ...newProduct, id: Date.now() }]);
      setNewProduct({ name: '', price: '', imageUrl: '', description: '', dimensions: '', type: '' });
    } else {
      alert("Por favor, completa todos los campos.");
    }
  };

  const editProduct = (id) => {
    const updatedProducts = products.map(product => {
      if (product.id === id) {
        const newName = prompt("Editar nombre del producto:", product.name);
        const newPrice = prompt("Editar precio del producto:", product.price);
        const newDescription = prompt("Editar descripción del producto:", product.description);
        const newDimensions = prompt("Editar dimensiones del producto:", product.dimensions);
        const newType = prompt("Editar tipo de obra:", product.type);
        const newImageUrl = prompt("Editar URL de la imagen:", product.imageUrl);
        return {
          ...product,
          name: newName !== null ? newName : product.name,
          price: newPrice !== null ? newPrice : product.price,
          description: newDescription !== null ? newDescription : product.description,
          dimensions: newDimensions !== null ? newDimensions : product.dimensions,
          type: newType !== null ? newType : product.type,
          imageUrl: newImageUrl !== null ? newImageUrl : product.imageUrl,
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
        <h2>AÑADIR UNA NUEVA OBRA</h2>
        <form onSubmit={addProduct}>
          <input
            type="text"
            name="name"
            placeholder="Nombre de la obra"
            value={newProduct.name}
            onChange={handleInputChange}
            required
          />
          <input
            type="number"
            name="price"
            placeholder="Precio de la obra"
            value={newProduct.price}
            onChange={handleInputChange}
            required
          />
          <input
            type="text"
            name="imageUrl"
            placeholder="URL de la imagen"
            value={newProduct.imageUrl}
            onChange={handleInputChange}
            required
          />
    <textarea
  name="description"
  placeholder="Descripción de la obra"
  value={newProduct.description}
  onChange={handleInputChange}
  className="description-textarea"
  required
></textarea>

          <input
            type="text"
            name="dimensions"
            placeholder="Dimensiones (e.g., 50x70 cm)"
            value={newProduct.dimensions}
            onChange={handleInputChange}
            required
          />
          <input
            type="text"
            name="type"
            placeholder="Tipo de obra (e.g., Pintura, Escultura)"
            value={newProduct.type}
            onChange={handleInputChange}
            required
          />
          <button type="submit">Añadir Obra</button>
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
            <th>Acción</th>
          </tr>
        </thead>
        <tbody>
          {products.map((product) => (
            <tr key={product.id}>
              <td><img src={product.imageUrl} alt={product.name} /></td>
              <td>{product.name}</td>
              <td>${product.price}/-</td>
              <td>{product.description}</td>
              <td>{product.dimensions}</td>
              <td>{product.type}</td>
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
