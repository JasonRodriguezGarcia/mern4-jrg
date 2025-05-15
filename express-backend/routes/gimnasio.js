import { Router} from 'express';
// import dbsqlite from '../dbsqlite.js'; // importamos PouchDB
// import { validateQuery, validateUserId } from '../middleware/users.js';
// import { authenticateToken } from '../middleware/login.js';
// import jwt from 'jsonwebtoken';
import { informe, buscarId } from '../models/gimnasioModel.js';

const router = Router()

router.get('/informes/:tipo', async(req, res) => { // ojo con el order al poner este gues
    const {tipo} = req.params
    const miembros = await informe(tipo == 'activos'? 1 : 0);
    console.log("tipo: ", tipo)
    console.log(miembros);
    res.json (miembros)
})


router.get('/search/:id', async(req, res) => {
    const {id} = req.params
    const respuesta = await buscarId(id);
    res.json ({resultado: respuesta.length})
})



export default router