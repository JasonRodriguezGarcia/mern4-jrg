import { Router} from 'express';
// import dbsqlite from '../dbsqlite.js'; // importamos PouchDB
// import { validateQuery, validateUserId } from '../middleware/users.js';
// import { authenticateToken } from '../middleware/login.js';
// import jwt from 'jsonwebtoken';
import { getVotantes, getVotos, getActuaciones, sendVotos } from '../models/eurovisionModel.js';

const router = Router()

router.get('/votantes', async(req, res) => { // ojo con el order al poner este gues
    const votantes = await getVotantes();
    console.log(votantes);
    res.json (votantes)
})

router.get('/votos', async(req, res) => { // ojo con el order al poner este gues
    const votos = await getVotos();
    console.log(votos);
    res.json (votos)
})

router.get('/actuaciones', async(req, res) => { // ojo con el order al poner este gues
    const actuaciones = await getActuaciones();
    console.log(actuaciones);
    res.json (actuaciones)
})

router.post('/votos', async(req, res) => { // ojo con el order al poner este gues
    const votoEmitido = req.body
    console.log("Recibido en backend: ", votoEmitido)
    const resultVoto = await sendVotos(votoEmitido);
    console.log(resultVoto);
    res.json (resultVoto)
})

// router.get('/informes/:tipo', async(req, res) => { // ojo con el order al poner este gues
//     const {tipo} = req.params
//     const miembros = await informe(tipo == 'activos'? 1 : 0);
//     console.log("tipo: ", tipo)
//     console.log(miembros);
//     res.json (miembros)
// })


// router.get('/search/:id', async(req, res) => {
//     const {id} = req.params
//     const respuesta = await buscarId(id);
//     res.json ({resultado: respuesta.length})
// })

// router.get('/informes/:tipo', async(req, res) => { // ojo con el order al poner este gues
//     const {tipo} = req.params
//     const miembros = await informe(tipo == 'activos'? 1 : 0);
//     console.log("tipo: ", tipo)
//     console.log(miembros);
//     res.json (miembros)
// })


// router.get('/search/:id', async(req, res) => {
//     const {id} = req.params
//     const respuesta = await buscarId(id);
//     res.json ({resultado: respuesta.length})
// })


export default router