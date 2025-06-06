import { Router } from 'express';

const router = Router();
/**
 * @swagger
 * components:
 *   schemas:
 *     Producto:
 *       type: object
 *       required:
 *         - prodId
 *         - nombre
 *         - precio
 *         - enStock
 *       properties:
 *         prodId:
 *           type: integer
 *           example: 123
 *         nombre:
 *           type: string
 *           example: "Guitarra eléctrica"
 *         precio:
 *           type: number
 *           format: float
 *           example: 499.99
 *         enStock:
 *           type: boolean
 *           example: true
 *     Error:
 *       type: object
 *       properties:
 *         error:
 *           type: string
 *           example: "Internal Server Error"
 */

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
 *                 $ref: '#/components/schemas/Producto'
 *             examples:
 *               ejemplo1:
 *                 value:
 *                   - prodId: 123
 *                     nombre: "Guitarra eléctrica"
 *                     precio: 499.99
 *                     enStock: true
 *                   - prodId: 124
 *                     nombre: "Bajo eléctrico"
 *                     precio: 399.99
 *                     enStock: false
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
 *           example:
 *             prodId: 125
 *             nombre: "Teclado MIDI"
 *             precio: 199.99
 *             enStock: true
 *     responses:
 *       200:
 *         description: Producto creado exitosamente
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "INSERTED producto with id: 125"
 *       500:
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

/**
 * @swagger
 * /productos/{id}:
 *   delete:
 *     summary: Eliminar un producto por ID
 *     description: Elimina un producto de la base de datos usando su ID.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID del producto a eliminar
 *     responses:
 *       200:
 *         description: Producto eliminado exitosamente
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "DELETED producto with id: 123"
 *       500:
 *         description: Error al eliminar el producto
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 */
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

/**
 * @swagger
 * /productos/{id}:
 *   put:
 *     summary: Actualizar un producto por ID
 *     description: Actualiza los datos de un producto existente.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID del producto a actualizar
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Producto'
 *           example:
 *             prodId: 123
 *             nombre: "Guitarra acústica"
 *             precio: 299.99
 *             enStock: false
 *     responses:
 *       200:
 *         description: Producto actualizado exitosamente
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "UPDATED producto with id: 123"
 *       500:
 *         description: Error al actualizar el producto
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 */
router.put('/:id', async (req, res) => {
    console.log("entro en put")
    res.json({ message: `DELETED producto with id: ${id}` });

});

/**
 * @swagger
 * /productos/search:
 *   get:
 *     summary: Buscar productos por precio mínimo
 *     description: Devuelve una lista de productos cuyo precio es mayor o igual al valor proporcionado.
 *     parameters:
 *       - in: query
 *         name: precio
 *         required: true
 *         schema:
 *           type: number
 *         description: Precio mínimo para filtrar productos
 *     responses:
 *       200:
 *         description: Lista de productos que cumplen con el filtro
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Producto'
 *             examples:
 *               resultadoBusqueda:
 *                 value:
 *                   - prodId: 150
 *                     nombre: "Amplificador"
 *                     precio: 799.99
 *                     enStock: true
 *       500:
 *         description: Error en la búsqueda de productos
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 */

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