import { useState } from "react";
import {add, validarEmail} from '../utils/utils'
// const add = (a, b) => {
//     return a + b
// }
const Form = ({ nombreDeUsuario, edad}) =>{

    const [result, setResult] = useState('')
    // const [name, setName] = useState('')
    // const [email, setEmail] = useState('')

    const handleClick = () => {
        setResult("Form submitted successfully!")
    }
    return (
        <div>
            <h1>Hola {nombreDeUsuario} ({edad}años) </h1>
            <div>{result}</div>
            <input 
                type="text"
                data-testid="input-name" 
                id="name" 
                name="name"
                // value={name}
                // onChange={(e)=> setName(e.target.value)}
            />
            <input 
                type="text"
                data-testid="input-email" 
                id="email" 
                name="email"
                // value={email}
                // onChange={((e)=> setEmail(e.target.value))}
            />
            
            <button data-testid="submit-btn" onClick={handleClick}>Click</button>
            
        </div>
    )
}

export default Form
