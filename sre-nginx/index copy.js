// Version 1.0.0
import express from "express";
import path from "path";
import cors from 'cors';
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors()); // para tener acceso desde React, ya que React y Express no están en el mismo directorio
app.use(express.json());

const users = [{id:1, name:'Jon', email:'jon@email.com'},
  {id:2, name:'Maria', email:'maria@email.com'} ];

// Define a route for the root path
app.get('/api/v1/users/', (req, res) => {

  let header = "id,name,email\n";
  let data = "";
  for (let index = 0; index < users.length; index++) {
    const element = users[index];
    data += `${element.id},${element.name},${element.email}\n`;
  }

  res.set('Content-Type', 'text/plain'); // no 'text/csv' ya que lo toma el navegador como una descarga
  res.send(header + data);
  //res.send('Hello, World!');
});

// Start Server
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});