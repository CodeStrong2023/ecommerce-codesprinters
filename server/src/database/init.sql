
CREATE TABLE productos_arte (
    id SERIAL PRIMARY KEY,
    nombre VARCHAR(255) NOT NULL,
    descripcion TEXT,
    autor VARCHAR(255),
    precio DECIMAL(10, 2) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    dimensiones VARCHAR(255),
    tipo_obra VARCHAR(50),
    url_imagen VARCHAR(255),)
