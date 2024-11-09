
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
    url_imagen VARCHAR(255),
);

CREATE TABLE usuarios(
    id SERIAL PRIMARY KEY,
    nombre VARCHAR(255) UNIQUE NOT NULL,
    email VARCHAR(255)  UNIQUE NOT NULL,
    contrasena VARCHAR(255) NOT NULL,
    fecha_registro TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    fecha_actualizacion TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

ALTER TABLE usuarios
RENAME COLUMN "password" TO contrasena;

ALTER TABLE productos_arte
ADD estado VARCHAR(50) DEFAULT 'disponible';