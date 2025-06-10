/* global use, db */
// MongoDB Playground
// To disable this template go to Settings | MongoDB | Use Default Template For Playground.
// Make sure you are connected to enable completions and to be able to run a playground.
// Use Ctrl+Space inside a snippet or a string literal to trigger completions.
// The result of the last command run in a playground is shown on the results panel.
// By default the first 20 documents will be returned with a cursor.
// Use 'console.log()' to print to the debug output.
// For more documentation on playgrounds please refer to
// https://www.mongodb.com/docs/mongodb-vscode/playgrounds/

import { join } from "path";

// Select the database to use.
use('mongodbVSCodePlaygroundDB');

// Insert a few documents into the sales collection.
db.getCollection('sales').insertMany([
  { 'item': 'abc', 'price': 10, 'quantity': 2, 'date': new Date('2014-03-01T08:00:00Z') },
  { 'item': 'jkl', 'price': 20, 'quantity': 1, 'date': new Date('2014-03-01T09:00:00Z') },
  { 'item': 'xyz', 'price': 5, 'quantity': 10, 'date': new Date('2014-03-15T09:00:00Z') },
  { 'item': 'xyz', 'price': 5, 'quantity': 20, 'date': new Date('2014-04-04T11:21:39.736Z') },
  { 'item': 'abc', 'price': 10, 'quantity': 10, 'date': new Date('2014-04-04T21:23:13.331Z') },
  { 'item': 'def', 'price': 7.5, 'quantity': 5, 'date': new Date('2015-06-04T05:08:13Z') },
  { 'item': 'def', 'price': 7.5, 'quantity': 10, 'date': new Date('2015-09-10T08:43:00Z') },
  { 'item': 'abc', 'price': 10, 'quantity': 5, 'date': new Date('2016-02-06T20:20:13Z') },
]);

// Run a find command to view items sold on April 4th, 2014.
const salesOnApril4th = db.getCollection('sales').find({
  date: { $gte: new Date('2014-04-04'), $lt: new Date('2014-04-05') }
}).count();

// Print a message to the output window.
console.log(`${salesOnApril4th} sales occurred in 2014.`);

// Here we run an aggregation and open a cursor to the results.
// Use '.toArray()' to exhaust the cursor to return the whole result set.
// You can use '.hasNext()/.next()' to iterate through the cursor page by page.
db.getCollection('sales').aggregate([
  // Find all of the sales that occurred in 2014.
  { $match: { date: { $gte: new Date('2014-01-01'), $lt: new Date('2015-01-01') } } },
  // Group the total sales for each product.
  { $group: { _id: '$item', totalSaleAmount: { $sum: { $multiply: [ '$price', '$quantity' ] } } } }
]);


use('scott');
// db.dept.find({'deptNo': 2});
db.dept.find({'emps.name': "Luis"})

db.dept.findOne({"_id": objectId('68263948689')})

use('clase');
db.getCollection("productos").find(
    {"cantidad": {$gt: 9}},
    {"_id": 0, "nombreProducto": 1, "cantidad": 1}
);

use('clase');
db.getCollection("productos").findOne(
    {"cantidad": {$gt: 1}}
);


use('clase');
db.productos.insertOne({
    prodId: 656,
    nombreProducto: 'VSCode',
    precio: 110,
    cantidad: 50
});

use('clase');
db.getCollection("productos").findOne(
    {"nombreProducto": "VSCode"}
);


// db.productos.find({nombreproducto: /apa/i});
// db.productos.find({nombreProducto: /^C/})
sacar 
los productos con pocas cantidades en stock, <55
use('clase');
db.getCollection("productos").find(
    {"cantidad": {$lt: 55}}
);


mostrar el nombre y cantidad solamente de Chaqueta
use('clase');
db.getCollection("productos").find(
  {"nombreProducto": "Chaqueta"},
  {"nombreProducto": 1, "cantidad": 1}
);
mostrar productos con el precio > 20 y cantidad >100
use('clase');
db.getCollection("productos").find(
  {$and: [
      {"precio": {$gt: 20}},
      {"cantidad": {$gt: 100}}
  ]}
)
mostrar el primer producto en la coleccion usando objectId
use('clase');
db.getCollection("productos").find(
  {_id: ObjectId('68347b7f3b6df6545cb51870')}
);

hacemos un update
use('clase');
db.productos.updateOne(
  {_id: ObjectId('6834ade0292041c8fd0adbaf')},
  {$set: {cantidad: 8, nombreProducto: "Camisetas"}}
);

use('clase');
db.getCollection("productos").find(
  {_id: ObjectId('6834ade0292041c8fd0adbaf')}
);

hacer un insert
use('clase');
db.productos.insertOne({
    prodId: 333,
    nombreProducto: 'Pistachos',
    precio: 100,
    cantidad: 20
});

use('clase');
db.productos.insertOne({
    prodId: 100,
    nombreProducto: 'Pistachos',
    precio: 20,
    cantidad: 120
});


hacer un delete de un id que no exista (devolverá un deletedCount: 0)
use('clase');
db.productos.deleteOne(
  {_id: ObjectId('68347b7f3b6df6545cb51811')}
);


****************************
****************************
https://www.mongodb.com/docs/manual/reference/method/js-collection/

27Mayo2025
ir a nodejs
{genres: "Comedy", cast: "Gregor Clegane"}

use('sample_mflix');
db.embedded_movies.find({genres: "Comedy"}).limit(3);

Andre Moreau
use('sample_mflix');
db.embedded_movies.find({plot: {$regex: "Andre Moreau"}}).limit(3);
use('sample_mflix');
db.embedded_movies.find({plot: /Andre Moreau/i}).limit(3);

votos > 1000 mostrando directores
use('sample_mflix');
db.embedded_movies.find({"imdb.votes": {$gt: 1000}}).limit(3);

use('sample_mflix');
db.embedded_movies.find(
  {"imdb.votes": {$gt: 1000}},
  {_id: 0, directors: 1}
).limit(3);

use('sample_mflix');
db.embedded_movies.find(
  {year: {$gte: 1914, $lte: 1915}},
  {year: 1, title: 1, directors: 1}
).limit(3);

use('sample_mflix');
db.embedded_movies.find({
  {{$year: "$date"}: {$gte: 1914, $lte: 1915}}
});

use('sample_mflix');
db.embedded_movies.find(
  {released: {$gte: ISODate('1914-03-23T00:00:00.000+00:00'),
    $gte: ISODate('1915-12-31T00:00:00.000+00:00')
  }}
);

añadimos a clase coleccion (tabla) songs
use("clase");
db.songs.insertMany( [
   { _id: 0, "artist" : "Blue Öyster Cult", "title": "The Reaper" },
   { _id: 1, "artist": "Blue Öyster Cult", "title": "Godzilla" },
   { _id: 2, "artist" : "Blue Oyster Cult", "title": "Take Me Away" }
]);

artista: que empieze en blue y acabe en cult, lo de enmedio no importa
use("clase");
db.songs.find({
  artist: { $regex: /blue.*oyster.*cult/i }
});

que title contenga en cualquier parte del title god
use("clase");
db.songs.find({
  title: { $regex: /god/i }
});

use("clase");
db.songs.find({
  artist: { $regex: /^Blue/, $options: 'i' }
});

use("clase");
db.songs.find({
  title: { $regex: /Away$/, $options: 'i' }
});

use("clase");
db.songs.find({
  artist: { $regex: /[üö]/i }
});


// con exactamente 2 palabras w=word, s=space
use("clase");
db.songs.find({
  title: { $regex: /^\w+\s\w+$/ }
});

// si contiene un número d=dígito
use("clase");
db.songs.find({
  title: { $regex: /\d/ }
});

********************

// ojo antes ponía scott segun la web
use("clase");
db.createCollection("usuarios", {
  validator: {
    $jsonSchema: {
      bsonType: "object",
      required: ["usuario", "nombre", "apellido", "correo", "tipo_usuario", "activo"],
      additionalProperties: false, // OJO IMPORTANTE
      properties: {
        _id: {
          bsonType: "objectId",
          description: "Debe ser un ObjectId generado automáticamente"
        },
        usuario: {
          bsonType: "string",
          description: "Debe ser una cadena de texto y es obligatorio"
        },
        nombre: {
          bsonType: "string",
          description: "Debe ser una cadena de texto y es obligatorio"
        },
        apellido: {
          bsonType: "string",
          description: "Debe ser una cadena de texto y es obligatorio"
        },
        correo: {
          bsonType: "string",
          pattern: "^.+@.+\\..+$",
          description: "Debe ser una cadena con formato de correo electrónico válido y es obligatorio"
        },
        pais: {
          bsonType: ["string", "null"],
          description: "Puede ser una cadena de texto o null, y es opcional"
        },
        tipo_usuario: {
          bsonType: "string",
          enum: ["Admin", "Cliente", "Proveedor"],
          description: "Solo puede ser 'Admin', 'Cliente', 'Proveedor'"
        },
        fecha_nacimiento: {
          bsonType: ["date", "null"],
          description: "Puede ser una fecha o null, y es opcional"
        },
        activo: {
          bsonType: "bool",
          description: "Debe ser un valor booleano y es obligatorio"
        }
      }
    }
  }
});
db.usuarios.createIndex({ usuario: 1 }, { unique: true });
db.usuarios.createIndex({ correo: 1 }, { unique: true });

******************
// Documento 1: Correcto (debería insertarse sin problemas)

use("clase");
db.usuarios.insertOne({
  "usuario": "juanperez",
  "nombre": "Juan",
  "apellido": "Pérez",
  "correo": "juan.perez@example.com",
  "pais": "España",
  "tipo_usuario": "Cliente",
  "fecha_nacimiento": ISODate("1990-05-20T00:00:00Z"),
  "activo": true
});

use("clase");
db.usuarios.insertOne({
  "usuario": "juanperez2",
  "nombre": "Juan2",
  "apellido": "Pérez2",
  "correo": "juan.perez2@example.com",
  "pais": "España",
  "tipo_usuario": "Cliente",
  "fecha_nacimiento": ISODate("1990-05-20T00:00:00Z"),
  "activo": true
});

*******************
*******************

use("clase");
db.createCollection("libros", {
  validator: {
    $jsonSchema: {
      bsonType: "object",
      required: ["titulo", "autor", "genero", "fecha_publicacion", "paginas", "disponible", "precio"],
      additionalProperties: false, // NO PERMITE AÑADIR MAS CAMPOS
      properties: {
        _id: {
          bsonType: "objectId",
          description: "Debe ser un ObjectId generado automáticamente"
        },
        titulo: {
          bsonType: "string",
          description: "Debe ser una cadena de texto y es obligatorio"
        },
        autor: {
          bsonType: "string",
          description: "Debe ser una cadena de texto y es obligatorio"
        },
        genero: {
          bsonType: "string",
          enum: [
            "Ficción", "No Ficción", "Misterio", "Romance", "Terror", "Drama",
            "Acción", "Aventura", "Comedia"
          ],
          description: "Solo puede ser 'Ficción', 'No Ficción', 'Misterio', 'Romance', 'Terror', 'Drama', 'Acción', 'Aventura', 'Comedia'"
        },
        fecha_publicacion: {
          bsonType: "date",
          description: "Debe ser una fecha y es obligatorio"
        },
        paginas: {
          bsonType: "int",
          minimum: 1, 
          description: "Debe ser un número y es obligatorio"
        },
        disponible: {
          bsonType: "bool",
          description: "Debe ser un valor booleano y es obligatorio"
        },
        precio: {
          bsonType: "double",
          minimum: 0.01, 
          maximum: 10000,
          description: "Debe ser un número y es obligatorio"
        }
      }
    }
  }
});
db.libros.createIndex({ genero: 1 });

*****************************

use('clase');
db.libros.insertOne({
  "titulo": "Como hacerser rico en 2 semanas",
  "autor": "Ronaldo Trumps",
  "genero": "Comedia",
  "fecha_publicacion": ISODate("1990-05-20T00:00:00Z"),
  "paginas": 50,
  "disponible": true,
  "precio": NumberDecimal("15.00")
});


use('clase');
db.libros.insertOne({
  "titulo": "Como hacerse rico en 2 semanas",
  "autor": "Ronaldo Trumps",
  "genero": "Comedia",
  "fecha_publicacion": ISODate("1990-05-20T00:00:00Z"),
  "paginas": 50,
  "disponible": true,
  "precio": 15.00  // Cambié NumberDecimal("15.00") por 15.00 que es un número de tipo double
});


************
*************
añadiendo campo activo en una coleccion productos

use('clase');
db.productos.updateMany(
  {},
  {$set: {active: true}}
);

use('clase');
db.productos.update(
  {prodId: 102},
  {$set: {active: false}}
);


**********************
**********************
**********************
dia 28 Mayo

creamos coleccion (tabla) en bbdd clase
ya que no existe peliculas SE CREA !!!
use('clase');
use('Clase');
db.peliculas.insertMany([
  { titulo: "Volver al Futuro", director: "Robert Zemeckis", año: 1985 },
  { titulo: "The Matrix", director: "Lana Wachowski", año: 1999 },
  { titulo: "Matrix Reloaded", director: "Lana Wachowski", año: 2003 },
  { titulo: "Amores Perros", director: "Alejandro González Iñárritu", año: 2000 },
  { titulo: "Misión Imposible", director: "Brian De Palma", año: 1996 },
  { titulo: "Misión Imposible 2", director: "John Woo", año: 2000 },
  { titulo: "Mi Villano Favorito", director: "Pierre Coffin", año: 2010 },
  { titulo: "Mi Pobre Angelito", director: "Chris Columbus", año: 1990 },
  { titulo: "Interestelar", director: "Christopher Nolan", año: 2014 },
  { titulo: "Interstellar", director: "Christopher Nolan", año: 2014 }
]);

use('clase');
db.peliculas.find(
  {titulo: {$regex: /Misión Imposible/i} },
  {titulo: 1, año: 1}
);

use('clase');
db.peliculas.find(
  {titulo: {$regex: /^Mi/} },
  {titulo: 1, año: 1}
);


use('clase');
db.peliculas.find(
  {titulo: {$regex: /\d$/} },
  {titulo: 1, año: 1}
);

use('clase'); // ojo regex con i es case insensitive
db.peliculas.find(
  // {director: {$regex: /christopher.*nolan/i} },
  {director: {$regex: /christopher.*nolan/, $options: 'i'} },
  {titulo: 1, director: 1, año: 1}
);

Encuentra las películas cuyo título contiene la palabra "Inter" (como parte del nombre).
use('clase'); // ojo regex con i es case insensitive
db.peliculas.find(
  {nombre: {$regex: /.*Inter.*/i} },
  {titulo: 1, director: 1, año: 1}
);

use('clase'); // ojo regex con i es case insensitive
db.peliculas.find(
  {titulo:  {$or: [{$regex: /Mision Imposible/i},
                  {$regex: /Matrix/i}]
            }
  },
  {titulo: 1, director: 1, año: 1}
);

use('clase'); // ojo regex con i es case insensitive
db.peliculas.find(
  {$or:  [{titulo: /Misión Imposible/i},
          {titulo: /Matrix/i}]
        
  },
  {titulo: 1, director: 1, año: 1}
);

************************
************************
************************
29Mayo
https://github.com/chekulhan/Desarrollo-Web/blob/main/UF1845-Acceso-a-Datos/mongodb/07-aggregations.md
Actividades de repaso
Usando la base de datos movies:
Contar el número de peliculas con el año 1903 o 1914 (year).
use("sample_mflix");
db.movies.


Para cada año (year), queremos mostrar el número de películas que han sacado, ordenado por mayor a menor.

Encontrar los top 5 peliculas (limit: 5) por genero (genres). Seguir los pasos:

Empezar con $unwind para producir un documento por cada genre. Fijate en el indice 'genreIndex' añadido
 al final de cada documento. 
 { path: '$genres', includeArrayIndex: 'genreIndex', preserveNullAndEmptyArrays: true }

Llevar a cabo un $group by en genre, para conseguir la suma de todos los documentos por genero.

Ordenar por mayor

Sacar los primero 5 ($limit)

¿Podrias llevar a cabo lo mismo en countries para sacar una lista única de valores? Probarlo también 
con db.movies.distinct("countries");


***************
***************
// // Pasar {sesion} como tercer argumento en las operaciones de actualización
// const res2 = accounts.updateOne({ name: "NonExistent" }, { $inc: { balance: 50 } },  { session });



use("clase");
// db.accounts.insertMany([
//   { name: "Jon", balance: 100 },
//   { name: "Maria", balance: 100 }
// ]);
db.accounts.find({});

use("clase");
// se tiene que crear una sesion para una transaccion
const session = db.getMongo().startSession();

try {
  session.startTransaction();

  const accounts = session.getDatabase(db.getName()).accounts;

  // Decrease Jon's balance by 50
  const res1 = accounts.updateOne(
    { name: "Jon", balance: { $gte: 25 } },
    { $inc: { balance: -25 } }
    
  );

  console.log(res1);

  if (res1.matchedCount === 0) {
    throw new Error("Saldo insuficiente o usuario no encontrado, abortando transacción");
  }

  // Increase Maria's balance by 50
  const res2 = accounts.updateOne({ name: "Maria" }, { $inc: { balance: 50 } });
  
  // This will fail because user "NonExistent" does not exist
  // const res2 = accounts.updateOne({ name: "NonExistent" }, { $inc: { balance: 50 } });
  console.log(res2);

  if (res2.matchedCount === 0) {
    throw new Error("User to credit not found, aborting transaction");
  }

  // Commit the transaction if both updates succeeded
  session.commitTransaction();
  print("Transaction committed successfully.");

} catch (error) {
  // If an error occurred, abort the transaction
    session.abortTransaction();
    print("Transaction aborted due to an error:", error);
} finally {
  session.endSession();
}

***********
modificamos el ejercicio para que quite 25
incremento a maria comentamos
descomentamos "NoNExist"
***********
hacer que pase de maria a join

use("clase");
// se tiene que crear una sesion para una transaccion
const session = db.getMongo().startSession();

try {
  session.startTransaction();

  const accounts = session.getDatabase(db.getName()).accounts;

  // Decrease Jon's balance by 50
  const res1 = accounts.updateOne(
    { name: "Maria", balance: { $gte: 50 } },
    { $inc: { balance: -100 } }
    
  );

  console.log(res1);

  if (res1.matchedCount === 0) {
    throw new Error("Saldo insuficiente o usuario no encontrado, abortando transacción");
  }

  // Increase Maria's balance by 50
  const res2 = accounts.updateOne({ name: "Jon" }, { $inc: { balance: 100 } });
  
  // This will fail because user "NonExistent" does not exist
  // const res2 = accounts.updateOne({ name: "NonExistent" }, { $inc: { balance: 50 } });

  console.log(res2);

  if (res2.matchedCount === 0) {
    throw new Error("User to credit not found, aborting transaction");
  }

  // Commit the transaction if both updates succeeded
  session.commitTransaction();
  print("Transaction committed successfully.");

} catch (error) {
  // If an error occurred, abort the transaction
    session.abortTransaction();
    print("Transaction aborted due to an error:", error);
} finally {
  session.endSession();
}


*******************
use('taxis');
db.users.insertOne(
{
  _id: ObjectId(),
  nombre: "Alice Smith",
  correo_electronico: "alice@email.com",
  saldo: 80,

  viajes: [
    {
      id_viaje: ObjectId(),
      lugar_recogida: "Calle Principal",
      lugar_destino: "Avenida del Parque",
      estado: "completado", // "reservado", "en curso", "completado", "cancelado"
      costo: 15,
      fecha_hora: ISODate("2025-05-27T14:00:00Z")
    },
    {
      id_viaje: ObjectId(),
      lugar_recogida: "Biblioteca",
      lugar_destino: "Museo",
      estado: "en curso",
      costo: 9,
      fecha_hora: ISODate("2025-05-27T15:00:00Z")
    }
  ]
});