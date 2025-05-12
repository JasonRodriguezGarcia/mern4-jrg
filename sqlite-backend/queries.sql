SELECT * FROM productos;

UPDATE productos
SET nombre = 'pantalon'
WHERE id = 2;

INSERT INTO productos (nombre, precio, stock)
VALUES ('Gorra', 2.99, 10);
SELECT * FROM productos;

CREATE TABLE miembros (
  id INTEGER PRIMARY KEY AUTOINCREMENT,  -- ID único para cada miembro
  nombre TEXT NOT NULL,                  -- Nombre del miembro
  email TEXT UNIQUE NOT NULL,            -- Correo electrónico único
  telefono TEXT,                         -- Número de teléfono
  fecha_registro DATE NOT NULL,          -- Fecha de registro del miembro
  tipo_membresia TEXT NOT NULL,          -- Tipo de membresía (Ej: Mensual, Anual)
  fecha_expiracion DATE,                 -- Fecha de expiración de la membresía
  ultima_asistencia DATE,                -- Fecha de la última vez que asistió al gimnasio
  activo BOOLEAN NOT NULL DEFAULT 1      -- Estado si el miembro está activo (1 = activo, 0 = inactivo)
);

SELECT * FROM miembros;

drop table miembros;

INSERT INTO miembros (nombre, email, telefono, fecha_registro, tipo_membresia, ultima_asistencia)
VALUES
('Ixchel', 'i@hotmail.com', '688688688', '2024-01-19', 'Anual', '2024-07-19'),
('Pepe', 'p@hotmail.com', '686999999', '2024-12-01', 'Mensual', '2025-03-01'),
('Jose', 'j@hotmail.com', '688008688', '2024-10-01', 'Anual', '2025-02-09'),
('Maria', 'm@hotmail.com', '633008688', '2025-01-01', 'Mensual', CURRENT_DATE)

SELECT * FROM miembros WHERE ACTIVO = 0;
INSERT INTO miembros (nombre, email, telefono, fecha_registro, tipo_membresia, ultima_asistencia, activo)
VALUES
('Alvaro', 'a@hotmail.com', '688688777', '2024-02-19', 'Anual', '2024-06-19', 0)

SELECT * FROM miembros 
WHERE ultima_asistencia < DATE('now', '-1 month')
    OR ultima_asistencia IS NULL