import { Router } from 'express';

const router = Router();

// GET /api/v1/productos
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

router.post('/', async (req, res) => {
    try {
      // You can implement your delete logic here, example:
      const db = req.app.locals.db;
      const body = req.params.body;
      db.libros.insertOne({
        "prodId": 900,
        "nombreProducto": "Balon de furgol",
        "precio": 45,
        "cantidad": 44,
        "active": true,
        "precio": NumberDecimal("15.00")
      });
      // If your id is ObjectId, import ObjectId from mongodb and convert
      // import { ObjectId } from 'mongodb';
      const productos = await db.collection('productos').insertOne({
        "prodId": 900,
        "nombreProducto": "Balon de furgol",
        "precio": 45,
        "cantidad": 44,
        "active": true
        // "precio": NumberDecimal("15.00")
      });
      console.log("Producto Creado", productos)
    //   console.log("Producto Creado", productos)
  
      // For now, just dummy response:
      res.json(productos);
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
  
      // If your id is ObjectId, import ObjectId from mongodb and convert
      // import { ObjectId } from 'mongodb';
      // const result = await db.collection('productos').deleteOne({ _id: new ObjectId(id) });
  
      // For now, just dummy response:
      res.json({ message: `DELETE producto with id: ${id}` });
    } catch (error) {
      console.error("Error deleting producto:", error);
      res.status(500).json({ error: 'Failed to delete producto' });
    }
});
  
router.get('/search', async (req, res) => {
    try {
      // You can implement your delete logic here, example:
      const db = req.app.locals.db;
      const precio = req.query.precio;
  
      // If your id is ObjectId, import ObjectId from mongodb and convert
      // import { ObjectId } from 'mongodb';
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