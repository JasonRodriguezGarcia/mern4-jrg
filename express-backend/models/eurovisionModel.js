// import db from '../db-pg.js';
import pool from '../db-pg.js';
// export function createTable() {
  //   db.run(`CREATE TABLE IF NOT EXISTS productos (
    //     id INTEGER PRIMARY KEY AUTOINCREMENT,
    //     nombre TEXT NOT NULL,
    //     precio REAL NOT NULL,
    //     stock INTEGER DEFAULT 0,
    //     fecha_agregado TEXT DEFAULT CURRENT_DATE
    //   )`);
    // }
    
export async function getVotantes() {
  try {
    // const result = await pool.query("SELECT now();");
    const result = await pool.query("SELECT * FROM eurovision.votantes;");
    // const result = await pool.query("SELECT * FROM scott.emp;");
    // const result = await pool.query("SELECT * FROM scott.emp WHERE empno = $1;", [7698]);
    // const result = await pool.query("SELECT * FROM scott.emp WHERE empno = $1 OR empno = $2;", [7698, 7844]);
    
    //const result = await pool.query("SELECT * FROM scott.get_employee($1);", [1234]);
    //const result = await pool.query("SELECT scott.get_employee_count() AS total;");

    return result.rows;
    //return result.rows[0].total;

  } catch (err) {
    console.error('Error:', err.message);
    throw err;
  }
}

export async function getVotos() {
  try {
    const result = await pool.query("SELECT * FROM eurovision.votos;");
    return result.rows;
    //return result.rows[0].total;

  } catch (err) {
    console.error('Error:', err.message);
    throw err;
  }
}

export async function getActuaciones() {
  try {
    const result = await pool.query("SELECT * FROM eurovision.actuaciones;");
    return result.rows;
    //return result.rows[0].total;

  } catch (err) {
    console.error('Error:', err.message);
    throw err;
  }
}


export async function sendVotos(votoEmitido) {
  try {
    // const result = await pool.query("SELECT * FROM eurovision.votantes;");
    const {idVotante, idActuacion, fechaVoto, voto} = votoEmitido
    const result = await pool.query(`INSERT INTO eurovision.votos 
        ("idVotante", "idActuacion", "fechaVoto", voto)
        VALUES ($1, $2, $3, $4);`, [idVotante, idActuacion, fechaVoto, voto])
    // console.log("imprimo result: ", result)
    // return result;
    return {success: true, message: "OK"}

  } catch (err) {
    console.error('Error:', err.message);
    throw err;
  }
}
// export function getVotantes(tipo) {
//   return new Promise((resolve, reject) => {
//     db.all(`SELECT * FROM miembros WHERE activo = ?`, [tipo], (err, rows) => {
//       if (err) return reject(err);
//       resolve(rows);
//     });
//   });
// }

// export function buscarId(id) {
//   return new Promise((resolve, reject) => {
//     db.all(`SELECT * FROM miembros WHERE id = ?`, [id], (err, rows) => {
//       if (err) return reject(err);
//       resolve(rows);
//     });
//   });
// }


// export function addProducto(nombre, precio, stock) {
//   return new Promise((resolve, reject) => {
//     db.run(`INSERT INTO productos(nombre, precio, stock) VALUES (?, ?, ?)`,
//       [nombre, precio, stock],
//       function (err) {
//         if (err) return reject(err);
//         resolve(this.lastID);
//       }
//     );
//   });
// }

// export function listProductos() {
//   return new Promise((resolve, reject) => {
//     db.all(`SELECT * FROM productos`, [], (err, rows) => {
//       if (err) return reject(err);
//       resolve(rows);
//     });
//   });
// }

// export function updateProducto(id, nombre, precio, stock) {
//   return new Promise((resolve, reject) => {
//     db.run(`UPDATE productos SET nombre = ?, precio = ?, stock = ? WHERE id = ?`,
//       [nombre, precio, stock, id],
//       function (err) {
//         if (err) return reject(err);
//         resolve(this.changes);
//       }
//     );
//   });
// }

// export function deleteProducto(id) {
//   return new Promise((resolve, reject) => {
//     db.run(`DELETE FROM productos WHERE id = ?`, [id], function (err) {
//       if (err) return reject(err);
//       resolve(this.changes);
//     });
//   });
// }


// export function lowStock(quantity) {
//   return new Promise((resolve, reject) => {
//     // db.run(`SELECT * FROM productos WHERE nombre = ?`, [nombre], function (err) {
//     db.all(`SELECT * FROM productos WHERE stock < ?`, [quantity], (err, rows) => {
//       if (err) return reject(err);
//       resolve(rows);
//     });
//   });
// }

