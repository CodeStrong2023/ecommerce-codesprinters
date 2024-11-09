/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from "react";
import "./styles.css";
import { getProductos } from "../../utils/api";

const ProductsPage = () => {
  const [search, setSearch] = useState("");
  const [isSidebarVisible, setIsSidebarVisible] = useState(false);
  const [order, setOrder] = useState("asc");
  const [tipoObra, setTipoObra] = useState("");
  const [priceRange, setPriceRange] = useState([0, 40000]);
  const [dimensiones, setDimensiones] = useState("");
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const response = await getProductos();
      const formattedProducts = response.map((product) => ({
        ...product,
        precio: parseFloat(product.precio),
      }));
      console.log(formattedProducts);
      const availableProducts = formattedProducts.filter(
        (product) => product.estado === "disponible"
      );
      setProducts(availableProducts);
    };
    fetchData();
  }, []);

  useEffect(() => {}, [products]);

  // Función para filtrar y ordenar productos
  const filteredProducts = products
    .filter(
      (product) =>
        // Filtro por búsqueda en nombre y descripción
        product.nombre.toLowerCase().includes(search.toLowerCase()) ||
        product.descripcion.toLowerCase().includes(search.toLowerCase())
    )
    .filter((product) =>
      // Filtro por tipo de obra (categoría)
      tipoObra ? product.tipo_obra === tipoObra : true
    )
    .filter(
      (product) =>
        // Filtro por rango de precio
        product.precio >= priceRange[0] && product.precio <= priceRange[1]
    )
    .filter((product) =>
      // Filtro por dimensiones
      dimensiones ? product.dimensiones === dimensiones : true
    )
    .sort((a, b) =>
      // Ordenar por precio
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
              placeholder="Buscar por nombre o descripción"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>

          {/* Filtro de tipo de obra */}
          <div className="filter-section">
            <label htmlFor="tipoObra" className="filter-label">
              Tipo de Obra
            </label>
            <select
              id="tipoObra"
              className="filter-select"
              onChange={(e) => setTipoObra(e.target.value)}
              value={tipoObra}
            >
              <option value="">Todas</option>
              <option value="Cuadro">Cuadro</option>
              <option value="Escultura">Escultura</option>
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
              max="40000"
              step="500"
              value={priceRange[1]}
              onChange={(e) => setPriceRange([0, parseInt(e.target.value)])}
            />
            <span>
              {priceRange[0]}$ - {priceRange[1]}$
            </span>
          </div>

          {/* Filtro de dimensiones */}
          <div className="filter-section">
            <label htmlFor="dimensiones" className="filter-label">
              Dimensiones
            </label>
            <select
              id="dimensiones"
              className="filter-select"
              onChange={(e) => setDimensiones(e.target.value)}
              value={dimensiones}
            >
              <option value="">Todas</option>
              <option value="120*60">120x60 cm</option>
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
              value={order}
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
                alt={product.nombre}
                className="product-image"
              />
              <h3 className="product-name">{product.nombre}</h3>
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
