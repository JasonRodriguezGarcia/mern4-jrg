import { MongoClient } from "mongodb";

// Replace with your actual MongoDB Atlas connection string
// mi pass es mongodb
const uri = "mongodb+srv://mongodb:mongodb@nzcluster-01.ox3d0eu.mongodb.net/?retryWrites=true&w=majority&appName=NZCluster-01";

const client = new MongoClient(uri);

async function run() {
  try {
    await client.connect();

    // Send a ping to confirm a successful connection
    // await client.db("admin").command({ ping: 1 }); // collection admin no se ve per esta por defecto
    // const buildInfo = await client.db("admin").command({ buildInfo: 1 });
    // const roles = await client.db("admin").command({ rolesInfo: 1, showPrivileges: true });

    // console.log("Pinged your deployment. You successfully connected to MongoDB!");
    // // console.log(buildInfo);
    // console.log(roles);
    const buildInfo = await client.db("clase").command({ buildInfo: 1 });
    const roles = await client.db("clase").command({ rolesInfo: 1, showPrivileges: true });

    console.log("Pinged your deployment. You successfully connected to MongoDB!");
    // console.log(buildInfo);
    console.log(roles);


    // const database = client.db("scott");
    // const collection = database.collection("dept");

    // const results = await collection.find().toArray();

    // console.log("Departments:");
    // console.log(results);
    const database = client.db("clase");
    const collection = database.collection("productos");

    // const results = await collection.find().toArray();

    let buscador = "Chaqueta"
    const results = await collection.find({nombreProducto: buscador}).toArray();
    // const results = awayit collection.updateOne(
    //         {nombreProducto: "Zapatos"},
    //         {$set: {cantidad: 82, precio: 17.7}}
    // );

    console.log("Productos:");
    console.log(results);

  } catch (err) {
    console.error("Connection error:", err);
  } finally {
    await client.close();
  }
}

run();
