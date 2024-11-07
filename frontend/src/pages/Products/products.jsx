/* eslint-disable no-unused-vars */
import React, { useState } from "react";
import "./styles.css";

const ProductsPage = () => {
  // Estados de los filtros
  const [search, setSearch] = useState("");
  const [isSidebarVisible, setIsSidebarVisible] = useState(false);
  const [order, setOrder] = useState("asc");
  const [category, setCategory] = useState("");
  const [priceRange, setPriceRange] = useState([0, 4000]); // Rango de precio ajustado
  const [size, setSize] = useState(""); // Tamaño de la obra

  const products = [
    {
      id: 8,
      name: "Cuadro surrealista",
      descripcion: "Cuadro surrealista inspirado en sueños.",
      autor: "Artista 8",
      precio: 2500.0,
      size: "110x90 cm",
      category: "cuadro",
      url_imagen: "https://via.placeholder.com/150",
    },
    {
      id: 9,
      name: "Escultura en madera",
      descripcion: "Escultura tallada en madera natural.",
      autor: "Artista 9",
      precio: 3500.0,
      size: "75x40x35 cm",
      category: "escultura",
      url_imagen: "https://via.placeholder.com/150",
    },
    {
      id: 10,
      name: "Pintura floral",
      descripcion: "Cuadro de flores al óleo.",
      autor: "Artista 10",
      precio: 1300.0,
      size: "100x50 cm",
      category: "cuadro",
      url_imagen: "https://via.placeholder.com/150",
    },
  ];

  // Función para filtrar y ordenar productos
  const filteredProducts = [...products]
    .filter(
      (product) =>
        product.name.toLowerCase().includes(search.toLowerCase()) &&
        (category ? product.category === category : true) &&
        product.precio >= priceRange[0] &&
        product.precio <= priceRange[1] &&
        (size ? product.size === size : true)
    )
    .sort((a, b) =>
      order === "asc" ? a.precio - b.precio : b.precio - a.precio
    );

  // Función para alternar la visibilidad de la barra lateral
  const toggleSidebar = () => setIsSidebarVisible(!isSidebarVisible);

  return (
    <div className="min-h-screen bg-white">
      {/* Botón para mostrar/ocultar la barra lateral */}
      <button className="toggle-sidebar-button" onClick={toggleSidebar}>
        {isSidebarVisible ? "Ocultar Filtros" : "Mostrar Filtros"}
      </button>

      {/* Barra lateral de filtros */}
      <aside className={`filters-sidebar ${isSidebarVisible ? "visible" : ""}`}>
        <div className="filters-content">
          <h3 className="filter-title">Filtros</h3>

          {/* Filtro de búsqueda */}
          <div className="filter-section">
            <label htmlFor="search" className="filter-label">
              Buscar Producto
            </label>
            <input
              type="text"
              id="search"
              className="filter-input"
              placeholder="Buscar por nombre"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>

          {/* Filtro de categoría */}
          <div className="filter-section">
            <label htmlFor="category" className="filter-label">
              Categoría de Arte
            </label>
            <select
              id="category"
              className="filter-select"
              onChange={(e) => setCategory(e.target.value)}
              value={category}
            >
              <option value="">Todas</option>
              <option value="cuadro">Cuadro</option>
              <option value="escultura">Escultura</option>
            </select>
          </div>

          {/* Filtro de rango de precios */}
          <div className="filter-section">
            <label htmlFor="priceRange" className="filter-label">
              Rango de Precio ($)
            </label>
            <input
              type="range"
              id="priceRange"
              className="filter-range"
              min="0"
              max="4000"
              step="100"
              value={priceRange[1]}
              onChange={(e) => setPriceRange([0, parseInt(e.target.value)])}
            />
            <span>
              {priceRange[0]}$ - {priceRange[1]}$
            </span>
          </div>

          {/* Filtro de tamaño */}
          <div className="filter-section">
            <label htmlFor="size" className="filter-label">
              Tamaño
            </label>
            <select
              id="size"
              className="filter-select"
              onChange={(e) => setSize(e.target.value)}
              value={size}
            >
              <option value="">Todos</option>
              <option value="110x90 cm">110x90 cm</option>
              <option value="75x40x35 cm">75x40x35 cm</option>
              <option value="100x50 cm">100x50 cm</option>
            </select>
          </div>

          {/* Filtro de orden por precio */}
          <div className="filter-section">
            <label htmlFor="sortPrice" className="filter-label">
              Ordenar por precio
            </label>
            <select
              id="sortPrice"
              className="filter-select"
              onChange={(e) => setOrder(e.target.value)}
            >
              <option value="asc">Menor a Mayor</option>
              <option value="desc">Mayor a Menor</option>
            </select>
          </div>
        </div>
      </aside>

      {/* Sección de productos */}
      <section
        className={`products-section ${isSidebarVisible ? "with-sidebar" : ""}`}
      >
        <h1 className="products-title">Obras de Arte</h1>
        <div className="product-grid">
          {filteredProducts.map((product) => (
            <div key={product.id} className="product-card">
              <img
                src={product.url_imagen}
                alt={product.name}
                className="product-image"
              />
              <h3 className="product-name">{product.name}</h3>
              <p className="product-price">$ {product.precio.toFixed(2)}</p>
              <a href={`/product/${product.id}`} className="button">
                Ver Producto
              </a>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default ProductsPage;
