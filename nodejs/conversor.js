import prompt from 'prompt-sync';

function conversor (cantidad, tasa) {
    return cantidad * tasa
}

const TASA = 0.85
const input= prompt();

const cantidad = parseFloat(input("Introduce USD: "))

if (isNaN(resultado))
    console.log("Introducido valor erróneo")
else {
    const resultado = conversor(cantidad, TASA)
    console.log(`${resultado} EUR.`)
}
