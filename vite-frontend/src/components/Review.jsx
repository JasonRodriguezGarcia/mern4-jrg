import React, { useState } from 'react';
import generos from '../config/generos';

export default function Review() {
  const [personas, setPersonas] = useState([]);
  const [nombre, setNombre] = useState('');
  const [edad, setEdad] = useState('');
  const [email, setEmail] = useState('')
  const [errorMessage, setErrorMessage] = useState('')
  const [showErrorMessage, setShowErrorMessage] = useState(false)
  const [showPersonas, setShowPersonas] = useState(false)
  const [genero, setGenero] = useState("Hombre")

// LO IMPORTAMOS - MIRAR ARRIBA
//   const generos = [
//     { key: 'h', label: 'Hombre' },
//     { key: 'm', label: 'Mujer' },
//     { key: 'b', label: 'Binario' },
//     { key: 'o', label: 'Otro' }
//     ];
  
const handleAddPersona = () => {
    setShowErrorMessage(false)
    setErrorMessage('')
    if (edad == 0 || edad == null) {
        setErrorMessage("Edad incorrecta")
        return
    }
    if (nombre.length == 0 || nombre == null) {
        setErrorMessage("Introducir nombre")
        return
    }
    if (nombre.startsWith('P')) {
    // if (!nombre || !/^P/.test(nombre)) {
        setErrorMessage("El nombre no puede empezar por P")
        return
    }
    if (errorMessage.length > 0) {
        setTimeout(() => {
            setShowErrorMessage(false)
        }, 3000);
        return
    }
    const persona = {
        nombre, // nombre: nombre, si es el mismo se crea como nombre: nombre
        edad: edad,
        email, //correo: correo
        genero
    }
    setPersonas([...personas, persona]);
    setNombre('')
    setEdad('')
    setEmail('')
}

  const handleShowPersonas = () => {
    setShowPersonas(!showPersonas)
  }

  return (
    <div style={{display: "flex", flexDirection: "column", gap: "20px", padding: '20px' }}>
      <h2>Add a Person</h2>
      <input
        placeholder="Name"
        value={nombre}
        onChange={(e) => setNombre(e.target.value)}
      />
      <input
        placeholder="Edad"
        type="number"
        value={edad}
        onChange={(e) => setEdad(e.target.value)}
      />
      <input
        placeholder="Email"
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      
      <select name="selectGenero" id="selectGenero" onChange={(e) => setGenero(e.target.value)}>
        {generos.map((genero, index) => (
            <option key={index} value={genero.label}>{genero.label}</option>
        ))}
      </select>
      <button onClick={handleAddPersona}>Add</button>

      <button onClick={handleShowPersonas}>{showPersonas ? "Ocultar personas": "Mostrar personas"}</button>
        {errorMessage && errorMessage}
        {showPersonas &&
            <>
                <h3>People List:</h3>
                <ul>
                    {personas.map((persona, index)=> (
                        <li key={index}>{persona.nombre} - {persona.edad} - {persona.email} - {persona.genero}</li>
                    ))}
                </ul>
            </>
        }
    </div>
  );
}

