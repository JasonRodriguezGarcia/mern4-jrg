// Colocar este archivo en /routes/ de express

import { Router } from 'express';

const router = Router();

const ALLOWED_API_KEYS = ['abc123', 'def456']; // deberiamos colocar en .env archivo

router.use((req, res, next)=> {
    const apiKey = req.headers['x-api-key'];
    const role = req.headers[`x-api-role`];

    // if (!apiKey || !ALLOWED_API_KEYS.includes(apiKey)) {
    //     return res.status(403).json({message: "Forbidden Access"})
    // }
    
    req.role = role

    next();

});


// GET /api/v1/seguridad
router.get('/', async (req, res) => {

    try {
        console.log("Here express");
        res.json({message: "exito", role: req.role});

    } catch (error) {
        console.error("Error fetching seguridad:", error);
        res.status(500).json({ error: 'Failed to fetch seguridad' });
    }
});

router.use((req, res, next)=> {
    const apiKey = req.headers['x-api-key'];
    const role = req.headers[`x-api-role`];

    if(role != "admin") {
        return res.status(403).json({message: "Acceso Denegado"})
    }

    next();

});

router.get('/admin', async (req, res) => {

    try {
        console.log("Here express");
        res.json({message: "exito", role: req.role});

    } catch (error) {
        console.error("Error fetching seguridad:", error);
        res.status(500).json({ error: 'Failed to fetch seguridad' });
    }
});


export default router;