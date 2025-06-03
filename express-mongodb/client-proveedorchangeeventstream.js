import { MongoClient } from "mongodb";
import dotenv from 'dotenv';

dotenv.config();


// Replace with your actual MongoDB Atlas connection string
const uri = process.env.MONGODB_URI;

const client = new MongoClient(uri);

console.log("Listening ...")

async function run() {
  try {
    // Connect the client to the server
    await client.connect();

    const database = client.db("clase");
    const productos = database.collection("pedidos");

    // Open a change stream on the collection
    const changeStream = productos.watch(); // conexion directa escuchando todo el rato a la base datos


    changeStream.on("change", (change) => { // se recive un change formato json
      console.log("Change detected:");
    //   console.log(JSON.stringify(change, null, 2)); // mostramos en formato json más legible
      console.log(change, null, 2);

      if (change.operationType === "insert") {
        console.log("New document inserted:", change.fullDocument);
        console.log(`Nuevo pedido: ${change.fullDocument._id}`)
        // aqui se puedría hacer más codigo para por ejempl cuando se cree o añada productos
        // para que actualice a una nueva tabla de pedidos
      }

      if (change.operationType === "update") {
        console.log("Document updated with _id:", change.documentKey._id);
      }

      if (change.operationType === "delete") {
        console.log("Document deleted with _id:", change.documentKey._id);
      }

      // Add other operationType handlers as needed
    });

    process.stdin.resume(); // esto es para que salga info en la consola

     // Handle shutdown signals gracefully
    process.on("SIGINT", async () => {
      console.log("SIGINT received, closing connection...");
      await client.close();
      console.log("Connection closed. Exiting...");
      process.exit(0);
    });

    process.on("SIGTERM", async () => {
      console.log("SIGTERM received, closing connection...");
      await client.close();
      console.log("Connection closed. Exiting...");
      process.exit(0);
    });



  } catch (error) {
    console.error("Error connecting to MongoDB or running commands:", error);
  }
}

run();




/*
changeStream.on("error", (error) => {
  console.error("Change stream error:", error);
});

changeStream.on("close", () => {
  console.log("Change stream closed.");
});*/