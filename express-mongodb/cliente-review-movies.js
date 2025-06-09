import promptSync from 'prompt-sync';
import connectDB from './db-mongodb.js';
import { ObjectId } from 'mongodb';

const prompt = promptSync();
// const DB_NAME = 'sample_mflix';

async function main() {
  const db = await connectDB();
  const collection = db.collection('movies'); 

  while (true) {
    const action = prompt('¿Qué quieres hacer? BUSCAR - BORRAR - INSERTAR :').toLowerCase();

    if (action === 'exit') {
      console.log('Exiting...');
      process.exit(0);
    } else if (action === 'buscar') {
        const titulo = prompt('Introduce titulo: ')
        // buscar por algun datos de la pelicula
        const movies = await collection.find({title: {$regex:`${titulo}`, $options: 'i'}}).toArray()
        console.log("peliculas: ", movies)
    } else if (action === 'insertar') {
      // insertar un nueva pelicula - preguntar al usuario por los datos para insertar
      console.log("\nCrear Pelicula\n")
        const title = prompt('Introduce titulo: ')
        const plot = prompt('Introduce breve descripcion: ')
        const year = prompt('Introduce año: ')
        const newPeli = {
            title,
            plot,
            year: parseInt(year),
            type: "movie"
        }
        const resultado = await collection.insertOne({ newPeli })
        console.log("Resultado: ", resultado)
    }  else if (action === 'borrar') {

    // Borrar
    // Borrar una pelicula basado en el criterio de busqueda. 
    //    Solo puedes borrar uno, asi que se se devuelve mas de uno, mostrar un mensaje
        const title = prompt('Introduce titulo a borrar: ')
        const datosPeli = await collection.find({title: {$regex:`${title}`}}).toArray()
        console.log("datospeli: ", datosPeli)
        const id = Array.isArray(datosPeli) ? datosPeli[0]._id : datosPeli._id
        const peliBorrada = await collection.deleteOne({_id: new ObjectId(id)})

    }
  }
// actualizar el plot (argumento) y el rating (rated) de una pelicula. 
// Actualizar

}

main();
