import React, { useEffect, useState } from 'react';
import initSqlJs from 'sql.js';

const SmartDoor = () => {
  const [db, setDb] = useState(null); // guarda en un estado la base de datos
  const [logs, setLogs] = useState([]);
  const [id, setId] = useState([])
  const [userExist, setUserExist] = useState(0)
  const [errorMessage, setErrorMessage] = useState("")

  useEffect(() => {
    initSqlJs({
      locateFile: file => `https://sql.js.org/dist/${file}` //sql-wasm.wasm = SQLite engine compiled to run in browsers
    }).then(SQL => {
      const db = new SQL.Database(); // Crear db en memoria

  
      db.run(`CREATE TABLE IF NOT EXISTS logs (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        doorId TEXT,
        userId NUMBER,
        status TEXT,
        timestamp DATE
        );`);
        
        // ... // continuar con el resto de la tabla
  
      setDb(db);
    }).catch(err => {
      console.error("Error initializing SQL.js:", err);
    });
  }, []);

  const simulateLockAction = async () => {
    try {
      const response = await fetch (`http://localhost:5000/api/v1/gimnasio/search/${id}`)
      const miembro = await response.json()
      if (!response.ok) {
        throw new Error ("Error en consulta de datos")
      }
      console.log(miembro.resultado)
      if (miembro.resultado == 0) 
        setErrorMessage("Usuario no existente")
      else
        setErrorMessage("")
    }
    catch(error) {
      console.log("Error al buscar Id de miembro: ", error)
    }

    if (!db) return;

    const doorId = 'front_door';
    const userId = 'admin';
    const status = Math.random() > 0.5 ? 'locked' : 'unlocked';
    const timestamp = new Date().toISOString();

    console.log("Imprimiendo valores: ", doorId, userId, status, timestamp)
    db.run(
      'INSERT INTO logs (doorId, userID, status, timestamp) VALUES (?, ?, ?, ?);',
      [doorId, userId, status, timestamp]
    );

    const res = db.exec('SELECT * FROM logs;');
    if (res[0]) {
      const cols = res[0].columns;
      const values = res[0].values;
      const formatted = values.map(row =>
        Object.fromEntries(row.map((val, idx) => [cols[idx], val]))
      );
      setLogs(formatted);
    }
  };

  return (
    <div style={{ padding: '1rem' }}>
      <h2>Smart Door Lock Logs</h2>
      <label name="idUsuario"> Introduce ID usuario</label>
      <input type="number" name="idUsuario" onChange={(e)=> setId(e.target.value)} />
      {errorMessage && <h2>{errorMessage}</h2>}
      <br />
      <button onClick={simulateLockAction}>Simular Lock/Unlock</button>
      
      <ul>
        {logs.map((log, idx) => (
          <li key={idx}>
            <strong>{log.timestamp}</strong> — {log.doorId} / {log.userId} / {log.status}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default SmartDoor;