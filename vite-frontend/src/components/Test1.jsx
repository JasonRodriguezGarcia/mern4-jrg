import { useState } from "react";
import {add, validarEmail} from '../utils/utils'
// const add = (a, b) => {
//     return a + b
// }
const Test1 = ({nombreDeUsuario, edad}) =>{

    const [numero1, setNumero1] = useState(0)
    const [numero2, setNumero2] = useState(0)
    const [suma, setSuma] = useState(null)
    const [email, setEmail] = useState('')
    const [errorMessage, setErrorMessage] = useState('')
    

    const handleSumar = () => {
        const resultado = add(parseInt(numero1), parseInt(numero2))
        setSuma(resultado)
    }

    // const handleEmailCheck = (e) => {

    //     const resultado = validarEmail(email)
    //     if (!resultado)
    //         setErrorMessage("Email incorrecto")
    //         setTimeout(() => {
    //             setErrorMessage('')
    //         }, 3000);
        
    // }

    const handleResult = () => {
        const resultado = validarEmail(email)
        if (!resultado) {
            setErrorMessage("Email incorrecto")
            setTimeout(() => {
                setErrorMessage('')
            }, 3000);
        }
        handleSumar()
    }

    return (
        <div>
            <h1>Hola {nombreDeUsuario} ({edad}años) </h1>
            <input 
                type="number"
                id="numero1" 
                name="numero1"
                value={numero1}
                onChange={(e)=> setNumero1(e.target.value)}
            /> <br/>
            <input 
                type="number"
                id="numero2" 
                name="numero2"
                value={numero2}
                onChange={(e)=> setNumero2(e.target.value)}
            /> <br/>
            <input 
                type="text"
                id="email" 
                name="email"
                value={email}
                onChange={((e)=> setEmail(e.target.value))}
            /> <br/>
            
            <button type="button" onClick={handleResult}>Pulsar</button> <br/>
            SUMA: {suma && suma} <br/>
            {errorMessage}
        </div>
    )
}

export default Test1
