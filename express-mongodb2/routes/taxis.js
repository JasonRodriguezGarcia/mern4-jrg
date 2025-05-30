import { Router } from 'express';
import { ObjectId } from 'mongodb'; // to use _id de mongodb database

const router = Router();
const collectionTable = "users"

// GET /api/v1/taxis
router.get('/', async (req, res) => {
  try {
    const db = req.app.locals.db; // get db instance from app.locals
    const users = await db.collection(collectionTable).find().toArray();
    res.json(users);
  } catch (error) {
    console.error("Error fetching users:", error);
    res.status(500).json({ error: 'Failed to fetch users' });
  }
});

router.get('/:id', async (req, res) => {
  try {
    const db = req.app.locals.db; // get db instance from app.locals
    const id = req.params.id

      // VALIDANDO EL PARAMETRO ID -- IMPORTANTE !! PARA EVITAR HACKEO
    if (!ObjectId.isValid(id))
      res.status(500).json({ error: 'Invalid ID' });

    const user = await db.collection(collectionTable).findOne({_id: new ObjectId(id)});
    console.log("Imprimo user: ", user)
    res.json(user);
  } catch (error) {
    console.error("Error fetching user:", error);
    res.status(500).json({ error: 'Failed to fetch user' });
  }
});

router.post('/viaje/:id', async (req, res) => {
  try {
    const db = req.app.locals.db; // get db instance from app.locals
    const id_usuario = req.params.id
    const viaje = req.body

    // VALIDANDO EL PARAMETRO ID -- IMPORTANTE !! PARA EVITAR HACKEO
    if (!ObjectId.isValid(id_usuario))
      res.status(500).json({ error: 'Invalid ID' });

    const idViaje = new ObjectId();
     // añadiendo dinamicamente propiedad id_viaje a viaje
    viaje.id_viaje = idViaje
    
    const user = await db.collection(collectionTable).updateOne(
      {_id: new ObjectId(id_usuario)},
      {$push: { viajes: viaje}}
    );
    console.log("Imprimo user: ", user)
    res.json({mensaje: "Viaje agregado", id_viaje: idViaje});
    
  } catch (error) {
    console.error("Error fetching user:", error);
    res.status(500).json({ error: 'Failed to fetch user' });
  }
});

router.delete('/viaje/:id', async (req, res) => {
  try {
    const db = req.app.locals.db; // get db instance from app.locals
    const id_usuario = req.params.id
    const {id_viaje} = req.body

        // VALIDANDO EL PARAMETRO ID -- IMPORTANTE !! PARA EVITAR HACKEO
    if (!ObjectId.isValid(id_usuario))
      res.status(500).json({ error: 'Invalid ID' });

    console.log("imprimo id_viaje: ", id_viaje)
    // console.log("imprimo req.params: ", req.params, "imprimo viaje: ", , typeof(body))
    const user = await db.collection(collectionTable).updateOne(
      {_id: new ObjectId(id_usuario)},
      {$pull: { viajes: {id_viaje: new ObjectId(id_viaje)}}}
    );
    console.log("Imprimo user: ", user)
    res.json(user);
  } catch (error) {
    console.error("Error fetching user:", error);
    res.status(500).json({ error: 'Failed to fetch user' });
  }
});

router.get('/viaje/:id/query', async (req, res) => {
  try {
    const db = req.app.locals.db; // get db instance from app.locals
    const id_usuario = req.params.id
    const {operacion} = req.query
    console.log("Imprimo operacion: ", operacion)

        // VALIDANDO EL PARAMETRO ID -- IMPORTANTE !! PARA EVITAR HACKEO
    if (!ObjectId.isValid(id_usuario))
      res.status(500).json({ error: 'Invalid ID' });

    if (operacion == "cuenta")
        console.log("Operacion es cuenta")
    else if (operacion == "gasto")
        console.log("Operacion es gasto")
    else
        console.log("Error en queryString")

    const resultado = await db.collection(collectionTable).aggregate(
    [
        {
            '$match': {
                '_id': new ObjectId('68388263680b993ece24c2d7')
            }
        }, {
            '$unwind': {
                'path': '$viajes', 
                'includeArrayIndex': 'viajesIndex', 
                'preserveNullAndEmptyArrays': true
            }
        }, {
            '$group': {
                '_id': '$_id', 
                'cuenta_viajes': {
                    '$sum': 1
                }
            }
        }
    ]).toArray()

    console.log("imprimo resultado: ", resultado)
    // // console.log("imprimo req.params: ", req.params, "imprimo viaje: ", , typeof(body))
    // const user = await db.collection(collectionTable).updateOne(
    //   {_id: new ObjectId(id_usuario)},
    //   {$pull: { viajes: {id_viaje: new ObjectId(id_viaje)}}}
    // );
    // console.log("Imprimo user: ", user)
    // res.json(user);
    res.json({operacion: operacion, resultado: resultado[0].cuenta_viajes});
  } catch (error) {
    console.error("Error fetching operation:", error);
    res.status(500).json({ error: 'Failed to fetch operation' });
  }
});

// [
//     {
//         '$match': {
//             '_id': ObjectId('68388263680b993ece24c2d7')
//         }
//     }, {
//         '$unwind': {
//             'path': '$viajes', 
//             'includeArrayIndex': 'viajesIndex', 
//             'preserveNullAndEmptyArrays': True
//         }
//     }, {
//         '$group': {
//             '_id': '$_id', 
//             'cuenta_viajes': {
//                 '$sum': 1
//             }
//         }
//     }
// ]



// router.post('/', async (req, res) => {
//     try {
//       // You can implement your delete logic here, example:
//       const db = req.app.locals.db;
//       const body = req.body
//       await db.collection(collectionTable).insertOne(body);

//       console.log("Producto Creado", body)
//       // res.json(body);
//       res.json({ message: `INSERTED producto with id: ${body.prodId}` });

//     } catch (error) {
//       console.error("Error finding productos:", error);
//       res.status(500).json({ error: 'Failed finding productos' });
//     }
// });


// router.delete('/:id', async (req, res) => {
//   try {
//     // You can implement your delete logic here, example:
//     const db = req.app.locals.db;
//     const id = req.params.id;
//     console.log("imprimo id: ", id)
//     console.log("imprimo type id: ", typeof(id))

//     const productos = await db.collection(collectionTable).deleteOne(
//       { prodId: parseInt(id)}
//       // { _id: Objetid(id)}
//     );
//     console.log(productos)
//     res.json({ message: `DELETED producto with id: ${id}` });

//   } catch (error) {
//     console.error("Error deleting producto:", error);
//     res.status(500).json({ error: 'Failed to delete producto' });
//   }
// });
  
// router.put('/:id', async (req, res) => {
//     console.log("entro en put")

// //   try {
// //     // You can implement your delete logic here, example:
// //     const db = req.app.locals.db;
// //     const id = req.params.id;
// //     console.log("imprimo id: ", id)
// //     console.log("imprimo type id: ", typeof(id))

// //     const productos = await db.collection(collectionTable).deleteOne(
// //       { prodId: parseInt(id)}
// //       // { _id: Objetid(id)}
// //     );
// //     console.log(productos)
//     res.json({ message: `DELETED producto with id: ${id}` });

// //   } catch (error) {
// //     console.error("Error deleting producto:", error);
// //     res.status(500).json({ error: 'Failed to delete producto' });
// //   }
// });
  
// router.get('/search', async (req, res) => {
//     try {
//       // You can implement your delete logic here, example:
//       const db = req.app.locals.db;
//       const precio = req.query.precio;
  
//       // If your id is ObjectId, import ObjectId from mongodb and convert
//       // import { ObjectId } from 'mongodb';
//       // PENDING HACER UN AGGREGATE
//       const productos = await db.collection(collectionTable).find(
//         { precio: {$gte: parseFloat(precio)}}
//       ).toArray();
//       console.log("imprimo productos: ", productos)
  
//       // For now, just dummy response:
//       res.json(productos);
//     } catch (error) {
//       console.error("Error finding productos:", error);
//       res.status(500).json({ error: 'Failed finding productos' });
//     }
// });
  
//   // /search?precio=${minPrecio}

export default router;