import { Router} from 'express';
// import dbsqlite from '../dbsqlite.js'; // importamos PouchDB
// import { validateQuery, validateUserId } from '../middleware/users.js';
// import { authenticateToken } from '../middleware/login.js';
// import jwt from 'jsonwebtoken';
import { informeActivos } from '../models/gimnasioModel.js';

const router = Router()

router.get('/informes', async(req, res) => { // ojo con el order al poner este gues
    const miembros = await informeActivos();
    console.log(miembros);

    res.json (miembros)
})


router.get('/search', async(req, res) => { // ojo con el order al poner este gues
    const {nombre, edad} = req.query
    try {
        // const selector = {} // creamos datos para luego consultar con el find, ESTO PARA UN AND
        
        // esto para el OR, OJO tienen que existir los campos nombre y edad en el querystring
        const selector = {
            $or: [
                {nombre: nombre},
                {edad: {$gt: parseInt(edad)}}

            ]
        }
// https://pouchdb.com/guides/mango-queries.html // mirar !!!
        // // {nombre: 'Maria', edad: { $gt:12} }    //gt para greater than,  gte lte lt
        // if (nombre) {  // si tenemos el selector nombre lo añadimos al selector
        //     selector.nombre = nombre
        // }
        // // ojo del querystring viene string, para edad hay que hacer un parseInt
        // // esto sería un AND POR DEFECTO
        // if (edad) {
        //     selector.edad = {$gt: parseInt(edad)}
        // }

        console.log(selector)

        // OJO--- NUEVA FORMA DE BUSCAR CON .FIND, NO CON .ALLDOCS EN EL EJEMPLO DE CARS
        const result = await db.find({
            selector,
            fields: ['_id', '_rev', 'nombre', 'edad'],
            limit: 10
        })
        res.json(result)
    }
    catch (error) {
        console.log(error)
    }
    // res.json(nombre)
})


// GET /api/v1/users
router.get('/', async (req, res) => {
// http://localhost:5000/api/v1/users?summary=average
// http://localhost:5000/api/v1/users?summary=count
    const {summary} = req.query

    console.log("imprimo summary: ", summary)
    try {
        // Fetch all documents from the 'users_db'
        const result = await db.allDocs({ include_docs: true });
        console.log(result);
        
        // Extract user data from the documents
        // const users = result.rows.map(row => row.doc);
        
        
        // Filter the users if 'type' is used in the document
        const users = result.rows
            .filter(row => row.doc.type === 'user')  // Ensure the document type is 'user'
            .map(row => row.doc);  // Map to get the document content
        
        let cuenta = users.length

        if (summary === "count"){
            res.status(200).json({resultado: cuenta})
        }
        if (summary === "average") {
            // const media = users.reduce((suma, user) => suma + user.edad,0) / users.length

            let suma = 0
            users.forEach(user => {
                // Por si no hay algún dato y evitar errores
                if (element.edad != null)
                    suma += user.edad  
            });
            let resultado = suma / cuenta
            res.status(200).json({resultado: resultado})
        }
        console.log(users)
 
        // Send the users as JSON response
        res.json(users);
    } catch (error) {
        res.status(500).json({ error: 'Failed to retrieve users' });
    }
});

// POST /api/v1/users
router.post('/', async (req, res) => {
    try {
        const user = req.body; // User data from request body
        user.type = "user" // crear un usuario, tipo usuario user (como una tabla users)
        console.log(user)
        
        // Insert new user into the database
        const response = await db.post(user);
        console.log(response)
        
        // Respond with success
        res.status(201).json({ id: response.id, ...user });
    } catch (error) {
        res.status(500).json({ error: 'Failed to add user' });
    }
});

// POST /api/v1/users/:id
router.delete('/:id', async (req, res) => {

    const {id} = req.params
    try {
        const user = await db.get(id)   // cogemos documento (user)
        await db.remove(user)   // borra documento
        res.status(200).json({message: "OK"})

    } catch (error) {
        res.status(500).json({ error: 'Failed to delete user' });
    }
});

// router.get('/:id', async (req, res) => {

//     const {id} = req.params
//     try {
//         const car = await db.get(id)   // cogemos documento (user)
//         // await db.remove(user)   // borra documento
//         res.status(200).json({message: "OK"})

//     } catch (error) {
//         res.status(500).json({ ...car });
//     }
// });

router.put('/:id', async (req, res) => {
    try {
        const { id } = req.params;  // Get the user ID from the URL
        const updatedUser = req.body;  // The updated user data from the request body

        // Fetch the current user data using the ID
        const existingUser = await db.get(id);
        
        // Update the existing user's data with the new data
        const updatedDoc = {
            ...existingUser,
            ...updatedUser, // This will overwrite any matching fields
        };

        // Save the updated document back to the database
        const response = await db.put(updatedDoc);

        // Send back the updated user data
        res.status(200).json({
            id: response.id,
            rev: response.rev,
            ...updatedUser,  // The updated fields from the request
        });
    } catch (error) {
        res.status(500).json({ error: 'Failed to update user' });
    }
});

export default router