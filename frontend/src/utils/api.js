import axios from "axios";
const baseURL = import.meta.env.VITE_BACKEND || "http://localhost:3000";
const api = axios.create({
  baseURL: `${baseURL}/api`,
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: true,
});

const handleRequestError = (error) => {
  console.error("Error en la solicitud:", error);
  throw error;
};
//TODAS LAS LLAMADAS A LA API VAN ACA
//AUTH
//register
export const registerUser = async (data) => {
  try {
    const response = await api.post("/auth/registrarse", data);
    return response.data;
  } catch (error) {
    handleRequestError(error);
  }
};
//SignOut
export const signout = async () => {
  const res = await api.post("/auth/salir");
  return res.data;
};
//Login
export const login = async (data) => {
  const res = await api.post("/auth/ingresar", data);
  return res.data;
};
// Todos los productos
export const getProductos = async () => {
  try {
    const response = await api.get("/productos");
    return response.data;
  } catch (error) {
    handleRequestError(error);
  }
};

// Un producto
export const getProducto = async (id) => {
  try {
    const response = await api.get(`/productos/${id}`);
    return response.data;
  } catch (error) {
    handleRequestError(error);
  }
};

// Crear un producto
export const createProducto = async (producto) => {
  try {
    //DATOS QUE HAY QUE ENVIAR EN EL BODY
    //["nombre", "descripcion", "precio", "dimensiones", "tipo_obra", "url_imagen"];
    const response = await api.post("/productos", producto);
    return response.data;
  } catch (error) {
    handleRequestError(error);
  }
};

// Actualizar un producto
export const updateProducto = async (id, producto) => {
  try {
    //DATOS QUE HAY QUE ENVIAR EN EL BODY
    //["nombre", "descripcion", "precio", "dimensiones", "tipo_obra", "url_imagen"];
    const response = await api.put(`/productos/${id}`, producto);
    return response.data;
  } catch (error) {
    handleRequestError(error);
  }
};

// Eliminar un producto
export const deleteProducto = async (id) => {
  try {
    const response = await api.delete(`/productos/${id}`);
    return response.data;
  } catch (error) {
    handleRequestError(error);
  }
};

export default api;
