import { pool } from "../db.js";
//LISTAR UN SOLO PRODUCTO
export const listarProducto = async (req, res) => {
  const resultado = await pool.query(
    "SELECT * FROM productos_arte WHERE id = $1",
    [req.params.id]
  );

  if (resultado.rowCount === 0) {
    return res.status(404).json({ message: "El Producto no existe" });
  }
  return res.json(resultado.rows[0]);
};
// LISTAR TODOS LOS PRODUCTOS
export const listarProductos = async (req, res) => {
  const resultado = await pool.query("SELECT* FROM productos_arte");
  return res.json(resultado.rows);
};

export const crearProducto = async (req, res, next) => {
  const {
    nombre,
    descripcion,
    autor,
    precio,
    dimensiones,
    tipo_obra,
    url_imagen,
  } = req.body;

  // Lista de campos requeridos
  const requiredFields = [
    "nombre",
    "descripcion",
    "precio",
    "dimensiones",
    "tipo_obra",
    "url_imagen",
  ];
  const missingFields = requiredFields.filter((field) => !req.body[field]);

  // Aviso si faltan campos
  const warningMessage = missingFields.length
    ? `Los siguientes campos están ausentes y deberían considerarse: ${missingFields.join(
        ", "
      )}`
    : null;

  try {
    // Intento de inserción en la base de datos (con valores faltantes como `null` si no se proporcionan)
    const resultado = await pool.query(
      `INSERT INTO productos_arte (nombre, descripcion, autor, precio, dimensiones, tipo_obra, url_imagen) 
      VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING *`,
      [
        nombre || null,
        descripcion || null,
        autor || null,
        precio || null,
        dimensiones || null,
        tipo_obra || null,
        url_imagen || null,
      ]
    );

    // Respuesta con el producto creado y un mensaje de advertencia, si corresponde
    res.status(201).json({
      producto: resultado.rows[0],
      warning: warningMessage,
    });
  } catch (error) {
    if (error.code === "23505") {
      // Error de restricción de unicidad
      return res
        .status(400)
        .json({ message: "Ya existe un Producto con ese nombre" });
    }
    console.log("Fallo el servidor", error);
    next(error); // Pasar el error al middleware de manejo de errores
  }
};
// ACTUALIZAR PRODUCTO
export const actualizarProducto = async (req, res) => {
  const { id } = req.params;
  const {
    nombre,
    descripcion,
    autor,
    precio,
    dimensiones,
    tipo_obra,
    url_imagen,
  } = req.body;

  // Verificamos si el producto existe antes de intentar actualizarlo
  const consultaProducto = await pool.query(
    "SELECT * FROM productos_arte WHERE id = $1",
    [id]
  );

  if (consultaProducto.rowCount === 0) {
    // Si el producto no existe, devolvemos un aviso sin intentar la actualización
    return res.status(404).json({
      message: "El producto no existe",
      warning: `No se encontró un producto con el id ${id}. Verifique el id ingresado.`,
    });
  }

  // Lista de campos que deberían estar en el request body para la actualización
  const requiredFields = [
    "nombre",
    "descripcion",
    "autor",
    "precio",
    "dimensiones",
    "tipo_obra",
    "url_imagen",
  ];
  const missingFields = requiredFields.filter(
    (field) => req.body[field] === undefined
  );

  // Actualización de los campos proporcionados
  const result = await pool.query(
    `UPDATE productos_arte SET 
      nombre = COALESCE($1, nombre), 
      descripcion = COALESCE($2, descripcion), 
      autor = COALESCE($3, autor), 
      precio = COALESCE($4, precio), 
      dimensiones = COALESCE($5, dimensiones), 
      tipo_obra = COALESCE($6, tipo_obra), 
      url_imagen = COALESCE($7, url_imagen), 
      updated_at = CURRENT_TIMESTAMP 
    WHERE id = $8 RETURNING *`,
    [nombre, descripcion, autor, precio, dimensiones, tipo_obra, url_imagen, id]
  );

  if (result.rowCount > 0) {
    // Confirmación de actualización y aviso sobre los campos que faltaron
    return res.status(200).json({
      message: "Producto actualizado correctamente",
      producto: result.rows[0],
      warning:
        missingFields.length > 0
          ? `Los siguientes campos no se proporcionaron y no se actualizaron: ${missingFields.join(
              ", "
            )}`
          : null,
    });
  } else {
    // Si hubo algún problema en la actualización, respondemos con un error general
    return res.status(500).json({
      message: "Error al actualizar el producto. Inténtelo nuevamente.",
    });
  }
};

// ELIMINAR PRODUCTO
export const eliminarProducto = async (req, res, next) => {
  try {
    const resultado = await pool.query(
      "DELETE FROM productos_arte WHERE id = $1",
      [req.params.id]
    );

    if (resultado.rowCount === 0) {
      return res.status(404).json({
        message: "No existe un Producto con ese id",
      });
    }

    return res
      .status(200)
      .json({ message: "Producto eliminado correctamente" });
  } catch (error) {
    console.log("Error al intentar eliminar el producto:", error);
    next(error); // Pasar el error al middleware de manejo de errores
  }
};
