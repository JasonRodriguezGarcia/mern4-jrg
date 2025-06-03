import React, { useEffect, useState } from 'react';
import { io } from 'socket.io-client';

// Connect to the backend WebSocket
const socket = io('http://localhost:5000'); // Change to your backend port

function ProductosSocket() {
  const [productos, setProductos] = useState([]);

  useEffect(() => {

    // No hace falta un fetch al iniciar, ya que podemos captar el evento conexion

    // Listen for initial full list
    socket.on('productosLista', (data) => {
      setProductos([...data].sort((datoa, datob) => datoa.prodId - datob.prodId));
    });

    // Listen for new product added
    socket.on('productoNuevo', (producto) => {
      setProductos((prev) => [...prev, producto]);
    });

    // Listen for updated product
    socket.on('productoModificado', (updated) => {
      setProductos((prev) =>
        prev.map((p) => (p._id === updated._id ? updated : p))
      );
    });

     // Listen for deleted product
    socket.on('productoEliminado', ({ _id }) => {
        setProductos((prev) => prev.filter((p) => p._id !== _id));
    });

    return () => { // Cerrando los eventos abiertos
      socket.off('productoModificado');
      socket.off('productoNuevo');
      socket.off('productosLista');
      socket.off('productoEliminado');
    };
  }, []);

  return (
    <div>
      <h2>📡 Productos (en tiempo real)</h2>
      <ul>
        {productos.map((p) => (
          <li key={p._id} style={{textAlign: "left"}}>
            {/* precio*cantidad total 03Junio.txt ejercicio*/}
            {/* 🆔{p.prodId} = 📦{p.nombreProducto} — 💲${p.precio} — 📋{p.cantidad} unid. — {p.precio*p.cantidad}💲 */}
            {/* total des */}
            🆔{p.prodId} = 📦{p.nombreProducto} — 💲${p.precio} — 📋{p.cantidad} unid. — {p.importe}💲
            {/* 🆔{p.prodId} = 📦{p.nombreProducto} — 💲${p.precio} — 📋{p.cantidad} unid. */}
            </li>
        ))}
      </ul>
    </div>
  );
}

export default ProductosSocket;