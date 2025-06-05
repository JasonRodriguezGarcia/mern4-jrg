import { Router } from 'express';

const router = Router();

// GET /api/v1/productos
/**
 * @swagger
 * /productos:
 *   get:
 *     summary: Obtener todos los productos
 *     description: Devuelve una lista de todos los productos disponibles.
 *     responses:
 *       200:
 *         description: Lista de productos
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   _id:
 *                     type: string
 *                     example: '664f173bd4e2b36c50ac9b1a'
 *                   nombre:
 *                     type: string
 *                     example: 'Guitarra eléctrica'
 *                   precio:
 *                     type: number
 *                     example: 499.99
 *                   enStock:
 *                     type: boolean
 *                     example: true
 *       500:
 *         description: Error del servidor
 */
router.get('/', async (req, res) => {
  try {
    const db = req.app.locals.db; // get db instance from app.locals
    const productos = await db.collection('productos').find().toArray();
    res.json(productos);
  } catch (error) {
    console.error("Error fetching productos:", error);
    res.status(500).json({ error: 'Failed to fetch productos' });
  }
});

/**
* @swagger
* /productos:
*   post:
*     summary: Crear un nuevo producto
*     description: Inserta un nuevo producto en la base de datos.
*     requestBody:
*       required: true
*       content:
*         application/json:
*           schema:
*             $ref: '#/components/schemas/Producto'
*     responses:
*       '200':
*         description: Producto creado exitosamente
*         content:
*           application/json:
*             schema:
*               type: object
*               properties:
*                 message:
*                   type: string
*                   example: INSERTED producto with id: P001
*       '500':
*         description: Error al insertar producto
*         content:
*           application/json:
*             schema:
*               $ref: '#/components/schemas/Error'
*/

router.post('/', async (req, res) => {
    try {
      // You can implement your delete logic here, example:
      const db = req.app.locals.db;
      const body = req.body
      await db.collection("productos").insertOne(body);

      console.log("Producto Creado", body)
      // res.json(body);
      res.json({ message: `INSERTED producto with id: ${body.prodId}` });

    } catch (error) {
      console.error("Error finding productos:", error);
      res.status(500).json({ error: 'Failed finding productos' });
    }
});


router.delete('/:id', async (req, res) => {
  try {
    // You can implement your delete logic here, example:
    const db = req.app.locals.db;
    const id = req.params.id;
    console.log("imprimo id: ", id)
    console.log("imprimo type id: ", typeof(id))

    const productos = await db.collection("productos").deleteOne(
      { prodId: parseInt(id)}
      // { _id: Objetid(id)}
    );
    console.log(productos)
    res.json({ message: `DELETED producto with id: ${id}` });

  } catch (error) {
    console.error("Error deleting producto:", error);
    res.status(500).json({ error: 'Failed to delete producto' });
  }
});
  
router.put('/:id', async (req, res) => {
    console.log("entro en put")

//   try {
//     // You can implement your delete logic here, example:
//     const db = req.app.locals.db;
//     const id = req.params.id;
//     console.log("imprimo id: ", id)
//     console.log("imprimo type id: ", typeof(id))

//     const productos = await db.collection("productos").deleteOne(
//       { prodId: parseInt(id)}
//       // { _id: Objetid(id)}
//     );
//     console.log(productos)
    res.json({ message: `DELETED producto with id: ${id}` });

//   } catch (error) {
//     console.error("Error deleting producto:", error);
//     res.status(500).json({ error: 'Failed to delete producto' });
//   }
});
  
router.get('/search', async (req, res) => {
    try {
      // You can implement your delete logic here, example:
      const db = req.app.locals.db;
      const precio = req.query.precio;
  
      // If your id is ObjectId, import ObjectId from mongodb and convert
      // import { ObjectId } from 'mongodb';
      // PENDING HACER UN AGGREGATE
      const productos = await db.collection('productos').find(
        { precio: {$gte: parseFloat(precio)}}
      ).toArray();
      console.log("imprimo productos: ", productos)
  
      // For now, just dummy response:
      res.json(productos);
    } catch (error) {
      console.error("Error finding productos:", error);
      res.status(500).json({ error: 'Failed finding productos' });
    }
});
  
  // /search?precio=${minPrecio}

export default router;