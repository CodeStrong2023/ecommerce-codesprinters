/* eslint-disable react/prop-types */
/* eslint-disable react-refresh/only-export-components */
import React, { createContext, useState, useEffect } from "react";
import { getProductos } from "../utils/api";
export const ProductosContext = createContext();

export const ProductosProvider = ({ children }) => {
  const [productos, setProductos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProductos = async () => {
      try {
        const data = await getProductos();
        setProductos(data);
      } catch (err) {
        setError("Error al cargar los productos");
      } finally {
        setLoading(false);
      }
    };
    fetchProductos();
  }, []);

  return (
    <ProductosContext.Provider value={{ productos, loading, error }}>
      {children}
    </ProductosContext.Provider>
  );
};
