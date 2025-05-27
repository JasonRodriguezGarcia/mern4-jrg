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

https://www.mongodb.com/docs/manual/reference/method/js-collection/


ir a nodejs
