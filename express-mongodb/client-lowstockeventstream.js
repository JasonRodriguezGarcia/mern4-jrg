import { MongoClient, ObjectId } from "mongodb";
import dotenv from 'dotenv';

dotenv.config();

const uri = process.env.MONGODB_URI;

const client = new MongoClient(uri);

// 1. definir un constante de LOW_STOCK
const LOW_STOCK = 50

console.log("Running ...")


async function run() {
  try {
   
    await client.connect();

    const database = client.db("clase");
    const productos = database.collection("productos");
    const pedidos = database.collection("pedidos")

    // Open a change stream on the collection
    
    // 2. ¿Qué operaciones quieres controlar de MongoDB?
        
    // QUITAMOS DEL CODIGO ORIGINAL POR QUE QUEREMOS EN UN INSERT
    // const changeStream = productos.watch(
    //     [
    //       {
    //         $match: {operationType: {$in : ['delete']}}
    //       }
    //     ],
    //     {
    //       fullDocument: "updateLookup"
    //     }
    //   );
      const changeStream = productos.watch(
        [
          {
            $match: {operationType: {$in : ['insert']}}
          }
        ],
        {
          fullDocument: "updateLookup" // PONER OBLIGATORIO
        }
      );
        // Incluimos fullDocument: "updateLookup" ya que por defecto un update no recibe el documento


    changeStream.on("change", async (change) => {
        const id = change.documentKey._id;
        const producto = change.fullDocument;
      
        // 3. Comprobar que tienes un objecto producto
        if (producto) {
            // 4. Validar si la cantidad es menos o igual que LOW_STOCK
            // Mandar un mensaje al usuario (console.log)
            if (producto.cantidad < LOW_STOCK)
                console.log(`AVISO !! Pedido mínimo 50 has pedido ${producto.cantidad}`)
            else {

                console.log(`Pedido recibido`)
                // hacer insert en mensajes
                const pedido = {
                    producto_id: producto.producto_id,
                    producto: producto.nombreProducto,
                    cantidad: producto.cantidad,
                    fecha_pedido: new Date()
                }
                // db.productos.insertOne(pedido);
                const result = await pedidos.insertOne(pedido);
            }
        }   

    });

    process.stdin.resume();

     // Handle shutdown signals gracefully
    process.on("SIGINT", async () => {
      await client.close();
      process.exit(0);
    });

    process.on("SIGTERM", async () => {
      await client.close();
      process.exit(0);
    });



  } catch (error) {
    console.error("Error connecting to MongoDB or running commands:", error);
  }
}

run();