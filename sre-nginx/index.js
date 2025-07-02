// Version 1.1.0
// generando lógica con keys y values
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

const users = [{id:1, name:'Jon', email:'jon@email.com', pasta: 1000},
  {id:2, name:'Maria', email:'maria@email.com', pasta: 5005} ];

// Define a route for the root path
app.get('/api/v1/users/', (req, res) => {

  // let header = "id,name,email\n";
  let header = Object.keys(users[0])
  header += '\n'

  console.log(header)
  let data = "";

  for (let index = 0; index < users.length; index++) {
    const element = users[index];
    console.log(element)
    // data += `${element.id},${element.name},${element.email}\n`;
    data += Object.values(users[index])
    data += "\n"
  }

  res.set('Content-Type', 'text/plain'); // no 'text/csv' ya que lo toma el navegador como una descarga
  res.send(header + data);
  //res.send('Hello, World!');
});

// Start Server
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});