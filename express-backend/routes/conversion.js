import { Router} from 'express';
// import { validateQuery, validateUserId } from '../middleware/users.js';


const router = Router()

// añadiendo
router.get('/', async (req, res) => {
    const TASA = 0.85 // tasa
    // const {cantidad, tipo} = req.body

    // http://localhost:5000/api/v1/conversion?cantidad=50&tipo=EUR
    const {cantidad, to} = req.query
    console.log(cantidad, to)
    if (to === "EUR") {
        const resultado = parseFloat(cantidad) * TASA
        res.json({resultado: `${cantidad}$ son: ${resultado} ${to}`})
    } else if (to === "USD") {
        const resultado = parseFloat(cantidad) / TASA
        res.json({resultado: `${cantidad}$ son: ${resultado} ${to}`})
    } else {
        res.json({error: "tipo no válido"})
    }

})

router.get('/usd/:cantidad', async (req, res) => {
    const TASA = 0.85 // tasa
    // const {cantidad, tipo} = req.body

    // http://localhost:5000/api/v1/conversion/usd/50
    const {cantidad} = req.params
    console.log(cantidad)
    if (!isNaN(cantidad)) {
        const resultado = parseFloat(parseFloat(cantidad) * TASA).toFixed(2)
        res.json({resultado: `${cantidad}$ son: ${resultado} EUR`})
    } else {
        res.json({error: "tipo no válido"})
    }

})

router.get('/eur/:cantidad', async (req, res) => {
    const TASA = 0.85 // tasa
    // const {cantidad, tipo} = req.body

    // http://localhost:5000/api/v1/conversion/usd/50
    const {cantidad} = req.params
    console.log(cantidad)
    if (!isNaN(cantidad)) {
        const resultado = parseFloat(parseFloat(cantidad) / TASA).toFixed(2)
        res.json({resultado: `${cantidad}€ son: ${resultado} USD`})
    } else {
        res.json({error: "tipo no válido"})
    }

})

export default router