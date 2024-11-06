/* eslint-disable no-unused-vars */
// ProductPage.js
import "./styles.css"
import React, { useState } from 'react';
const product = {
    id: 1,
    nombre: "Pintura abstracta 1",
    "descripcion": "Obra de arte abstracta en colores vibrantes.",
    "autor": "Artista 1",
    "precio": 1500.00,
    "created_at": "2024-01-01T10:00:00Z",
    "updated_at": "2024-01-01T10:00:00Z",
    "dimensiones": "100x100 cm",
    "tipo_obra": "cuadro",
    "url_imagen": "https://via.placeholder.com/150"
}
const ProductPage = () => {
const [quantity, setQuantity] = useState(1);

const decreaseQuantity = () => {
    if (quantity > 1) {
    setQuantity(quantity - 1);
    }
};

const increaseQuantity = () => {
    setQuantity(quantity + 1);
};

return (
    <div className="container">
    <header>
        <h1>Página de Producto</h1>
    </header>
    
    <div className="product">
    <img src={ '/img/descarga.jpeg'} alt="Producto" />
        <div className="product-details">
        <h1 className="nombre">{product.nombre}</h1>
        <h3>Descripción</h3>
        <p className="description">
            {product.descripcion}
        </p>
        <div className="price">$ {product.precio} </div>
        <div className="quantity-cart">
            <div className="quantity">
            <label htmlFor="quantity">Cantidad</label>
            <div className="quantity-controls">
                <button className="quantity-btn" onClick={decreaseQuantity}>-</button>
                <input
                type="number"
                id="quantity"
                value={quantity}
                onChange={(e) => setQuantity(parseInt(e.target.value) || 1)}
                />
                <button className="quantity-btn" onClick={increaseQuantity}>+</button>
            </div>
            </div>
            <button className="add-to-cart">+ Añadir al carrito</button>
        </div>
        </div>
    </div>
    </div>
);
};
export default ProductPage;