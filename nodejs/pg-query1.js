import pool from './db-pg.js';


async function getUsers() {
  try {
    // const result = await pool.query("SELECT now();");
    // const result = await pool.query("SELECT * FROM scott.emp;");
    // const result = await pool.query("SELECT * FROM scott.emp WHERE empno = $1;", [7698]);
    const result = await pool.query("SELECT * FROM scott.emp WHERE empno = $1 OR empno = $2;", [7698, 7844]);
    
    //const result = await pool.query("SELECT * FROM scott.get_employee($1);", [1234]);
    //const result = await pool.query("SELECT scott.get_employee_count() AS total;");

    return result.rows;
    //return result.rows[0].total;

  } catch (err) {
    console.error('Error:', err.message);
    throw err;
  }
  // NO pool.end() here!
//   client.end(); si usamos client()
}

// Call the function to insert a user
const users = await getUsers();
console.log(users);

// abría que cerrarlo para que no termine el servidor
await pool.end();  // simulate app termination - pool.end() closes all connections in the pool
