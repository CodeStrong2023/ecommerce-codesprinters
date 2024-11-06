//Añadir productos al carrito, datos que recibe:
//["nombre", "descripcion", "precio", "dimensiones", "tipo_obra", "url_imagen"];
export const addToCart = (product) => {
  // Obtén el carrito actual de localStorage
  const cart = JSON.parse(localStorage.getItem("cart")) || [];

  // Verifica si el producto ya está en el carrito
  const productExists = cart.some((item) => item.id === product.id);

  if (!productExists) {
    // Si el producto no está en el carrito, agrégalo con cantidad 1
    cart.push({ ...product, cantidad: 1 });
    localStorage.setItem("cart", JSON.stringify(cart));
  } else {
    console.warn("El producto ya está en el carrito");
  }
};
