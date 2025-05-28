import promptSync from 'prompt-sync';


async function deleteProductos(prodId) {

  try {
// El REST endpoint no existe - habrá que implementarlo en el servidor
    const response = await fetch(`http://localhost:5000/api/v1/productos/${prodId}`,
      {
        method: 'DELETE',
        headers: {'Content-type': 'application/json; charset=UTF-8'}
      }
    );
    if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
      const productos = await response.json();
    return productos;
  } catch (error) {
        console.error('Error Deleting products:', error);
  }
  
}

async function insertProductos(producto) {

  try {
// El REST endpoint no existe - habrá que implementarlo en el servidor
    const response = await fetch(`http://localhost:5000/api/v1/productos`,
      {
        method: 'POST',
        headers: {'Content-type': 'application/json; charset=UTF-8'},
        body: JSON.stringify(producto)
      }
    );
    if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
      const productos = await response.json();
    return productos;
  } catch (error) {
        console.error('Error Inserting products:', error);
  }
  
}

async function fetchProductos() {
  try {
    const response = await fetch('http://localhost:5000/api/v1/productos');
    if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
    const productos = await response.json();
    return productos;
  } catch (error) {
        console.error('Error fetching products:', error);
  }
}

async function fetchMinProductos(minPrecio) {
  try {
    // El REST endpoint no existe - habrá que implementarlo en el servidor
    const response = await fetch(`http://localhost:5000/api/v1/productos/search?precio=${minPrecio}`);
    if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
      const productos = await response.json();
    return productos;
  } catch (error) {
        console.error('Error fetching products:', error);
  }
}

const totalInventoryValue = (productos) => {
  // usar reduce()
    let totalInventoryValue = 0
    productos.forEach(producto => {
      totalInventoryValue += producto.precio * producto.cantidad
    });
    return totalInventoryValue
}

const productosActivos = (productos) => {
    // usar filter()
    const productosActivos = productos.filter((producto) => producto.active == true)
    return productosActivos
}

async function main() {
  const prompt = promptSync();

  let running = true;

  while (running) {
    console.log(`\n--- Gestor de productos ---
        1. List productos
        2. Total valor de inventario (precio * cantidad)
        3. Mostrar productos con un precio minimum 
        4. Mostrar productos activos
        5. Mantenimiento productos
        15. Exit`);

    const choice = prompt('Elegir una acción: ').trim();

    if (parseInt(choice)== 1) {
        const productos = await fetchProductos();
        productos.forEach(producto => {
            console.log(producto.prodId, producto.nombreProducto);
        });
        // console.log("Imprimiendo fetchProductos: ", productos)
    }   
    else if (parseInt(choice) == 2) { 
        const productos = await fetchProductos();
        let totalValue = totalInventoryValue(productos);
        console.log(`Total valor de inventario es ${totalValue}`);
    }
    else if (parseInt(choice) == 3) { 
      const min = prompt('Precio minimo: ').trim();

      const productos = await fetchProductos();
      const minimumPriceProductos = await fetchMinProductos(parseInt(min));
      if (minimumPriceProductos.length == 0)
        console.log("\nSIN DATOS")
      else {
        minimumPriceProductos.forEach(producto => {
          console.log(producto.prodId, producto.nombreProducto);
        });
      }
    }
    else if (parseInt(choice) == 4) { 
      const productos = await fetchProductos();
      let soloActivos = productosActivos(productos);
      soloActivos.forEach(producto => {
          console.log(producto.prodId, producto.nombreProducto);
      });
    }

    else if (parseInt(choice) == 5) { 
      console.log(`\n\n--- Mantenimiento de productos ---
        1. Añadir producto
        2. Modificar producto
        3. Borrar producto
        4. Exit`);
      const choiceMantenimiento = prompt('Elegir una acción: ').trim();
      if (parseInt(choiceMantenimiento) == 1)
      {
        const prodId = prompt('Introducir Id producto: ').trim();
        const nombreProducto = prompt('Introducir Nombre producto: ').trim();
        const precio = prompt('Introducir Precio producto: ').trim();
        const cantidad = prompt('Introducir Cantidad producto: ').trim();

        const producto = {
          prodId: parseInt(prodId),
          nombreProducto: nombreProducto,
          precio: parseFloat(precio),
          cantidad: parseInt(cantidad),
          active: true
        }
        const result = await insertProductos(producto)
        console.log(result)
      }
      else if (parseInt(choiceMantenimiento) == 3){
        const prodId = prompt('Introducir Id producto a borrar: ').trim();
        const result = await deleteProductos(parseInt(prodId))
        console.log(result)

      }

    }
    else {
        running = false;
    }

  };
}

// --------------
main();