// Colocar este archivo en /routes/ de express

import { Router } from 'express';
import { authorise, authoriseOwnership } from '../middleware/authorise.js'; // ojo poner .js no lo pone automaticamente
import { ObjectId } from 'mongodb'; // to use _id de mongodb database
const router = Router();

const ALLOWED_API_KEYS = ['abc123', 'def456']; // deberiamos colocar en .env archivo

router.use((req, res, next)=> {
    const apiKey = req.headers['x-api-key'];
    // const role = req.headers[`x-api-role`];
    const role = req.headers[`x-user-role`];
    const userId = req.headers['x-user-id']

    req.role = role;        //aunque esta disponble en la funcion centralizamos aqui, disponibles globalmente
    req.userId = userId;
    
    // if (!apiKey || !ALLOWED_API_KEYS.includes(apiKey)) {
        //     return res.status(403).json({message: "Forbidden Access"})
        // }
        
    req.role = role
    
    next();
});
    
// GET /api/v1/seguridad
router.get('/', authorise('read:any'), async (req, res) => {
    
    try {
        console.log("Here express");
        res.json({message: "exito", role: req.role});
        
    } catch (error) {
        console.error("Error fetching seguridad:", error);
        res.status(500).json({ error: 'Failed to fetch seguridad' });
    }
});

// GET /api/v1/seguridad/23490872390472987 id de MongoDB
router.get('/:id', authoriseOwnership(), async (req, res) => {
    const db = req.app.locals.db
    try {

        // new ObjetId es para versiones MongoDB inferiores a la 5, AUNQUE POR AHORA FUNCIONAN
        // const user = await db.collection("usuarios").findOne({"_id": new ObjectId(req.userId)})
        // para versiones MongoDB >= 5 podemos poner
        const user = await db.collection("usuarios").findOne({_id: ObjectId.createFromHexString(req.userId)})
        console.log("imprimo user: ", user)
        res.json({message: "exito", role: req.role, });

    } catch (error) {
        console.error("Error fetching seguridad:", error);
        res.status(500).json({ error: 'Failed to fetch seguridad' });
    }
});

export default router;