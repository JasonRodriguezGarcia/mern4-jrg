-- Connectar a la base de datos
\c demo

-- Mostrar todas las tablas
\dt

-- Create a table AL NO INDICAR SQUEMA SE COPIA EN SQUEMA PUBLIC DE LA BASE DE DATOS
CREATE TABLE test1 (
    id SERIAL PRIMARY KEY,
    name TEXT NOT NULL,
    joined TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Seed data
INSERT INTO test1 (name) VALUES
  ('Alice'), ('Bob');

-- Verify the rows
SELECT * FROM test1;

-- Show tables again
\dt