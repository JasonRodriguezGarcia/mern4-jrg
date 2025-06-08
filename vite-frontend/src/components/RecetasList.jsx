import React, { useEffect, useState } from 'react';

export default function RecetasList() {
  const [recetas, setRecetas] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [nombreReceta, setNombreReceta] = useState('')
  const [dificultad, setDificultad] = useState('')
  const [tiempo, setTiempo] = useState('')
  const [errorMessage, setErrorMessage] = useState('')
  const [showRecetas, setShowRecetas] = useState(false)
  const [actionGraphql, setActionGraphql] = useState([
    `query {
      recetas {
        _id
        nombreReceta
        dificultad
        tiempo
      }
    }`,
    `mutation($nombreReceta: String!, $dificultad: Int!, $tiempo: Int!) {
      addReceta (input: {
          nombreReceta: $nombreReceta,
          dificultad: $dificultad,
          tiempo: $tiempo
      })
      {
        _id
        nombreReceta
        dificultad
        tiempo
      }
    }
    `
  ])

  async function fetchRecetas(action) {
    console.log("fetchRecetas: ", actionGraphql[action])
    setLoading(true);
    setError(null);
    try {
      const response = await fetch('http://localhost:5000/graphql', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            query: actionGraphql[action],
            variables: {
              nombreReceta,
              dificultad: parseInt(dificultad),
              tiempo: parseInt(tiempo)
            }
          }),
      });
      const json = await response.json();
      if (json.errors) {
        setError(json.errors[0].message);
      } else {
        if (action == 0)
            setRecetas(json.data.recetas);
        else if (action == 1)
            fetchRecetas(0)
      }
    } catch (err) {
      setError('Error fetching data');
    }
    setLoading(false);
  }
  
  useEffect(() => {

    fetchRecetas(0);
  }, []);

  if (loading) return <p>Loading recetas...</p>;
  if (error) return <p>Error: {error}</p>;


  const errorTimeoutMessage = (message) => {
    setErrorMessage(message)
    setTimeout(() => {
      setErrorMessage('')
    }, 3000);
    return

  }
  const handleAddRecipy = () => {
    setErrorMessage('')
    if (nombreReceta.length == 0){
      errorTimeoutMessage("Introducir nombre receta")
      return
    }
    if (dificultad < 1 || dificultad > 10) {
      errorTimeoutMessage("Valor para dificultad incorrecto")
      return
    }
    if (tiempo <= 1) {
      errorTimeoutMessage("Valor para tiempo incorrecto")
      return
    }
    const receta = {
      nombreReceta: nombreReceta,
      dificultad: parseInt(dificultad),
      tiempo: parseInt(tiempo)
    }
    console.log("Receta: ", receta)
    // setRecetas([...recetas, receta]) // quitamos esto porque lo de abajo ya añade datos incluido los nuevos
    setNombreReceta('')
    setDificultad(0)
    setTiempo(0)
    fetchRecetas(1);
  }

  const handleShowRecetas = () => {
    setShowRecetas(!showRecetas)
  }

  return (
    <div>
      <div style={{display: "flex", flexDirection: "column", gap: "20px", padding: '20px' }}>
        <h2>Add a Recipy</h2>
        <input
          placeholder="Nombre receta"
          value={nombreReceta}
          onChange={(e) => setNombreReceta(e.target.value)}
        />
        <input
          placeholder="Dificultad (de 1 a 10)"
          value={dificultad}
          onChange={(e) => setDificultad(e.target.value)}
        />
        <input
          placeholder="Tiempo (minutos)"
          value={tiempo}
          onChange={(e) => setTiempo(e.target.value)}
        />
        
        <button onClick={handleAddRecipy}>Add Recipy</button>

        <button onClick={handleShowRecetas}>{showRecetas ? "Ocultar recetas": "Mostrar recetas"}</button>
        {errorMessage && errorMessage}
        {showRecetas &&
            <>
              <h2>Recetas List</h2>
              <ul>
                {recetas.map((receta, index)=> (
                    <li key={index}>{receta.nombreReceta} <button>borrar receta</button></li> 
                ))}
              </ul>
            </>
        }
      </div>
    </div>
  );
}