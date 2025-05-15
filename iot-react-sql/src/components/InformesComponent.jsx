import { useEffect, useState } from "react";

const InformesComponent = ()=> {

  const [miembros, setMiembros] = useState([])
  const [errorMessage, setErrorMessage] = useState("")
  const [estado, setEstado] = useState('activos')

  useEffect(()=> {
    // const getInitialData = async () => {
    // }
    getData(estado)
  }, [estado])
  
  const getData = async (estado) => {
    try {
      const response = await fetch (`http://localhost:5000/api/v1/gimnasio/informes/${estado}`)
      if (!response.ok) {
          throw new Error ("Error en consulta de datos")
        }
      const data = await response.json()
      console.log(data)
      if (data.length == 0) {
        setErrorMessage("No hay datos")
        return
      }
      else
        setErrorMessage("")
        setMiembros(data)
    }
    catch(error) {
      console.log("Error al buscar miembros: ", error)
    }

  }
  const handleEstado = () => {
    if (estado == 'activos') {
      setEstado('inactivos')
    }
    else {
      setEstado('activos')      
    }
  }

    return (
        <div>
          {/* <button>Mostrar informe 1</button> */}
          {/* <button onClick={handleEstado}>Toggle Activos/inactivos</button> */}
          <button onClick={handleEstado}>Alternar Activos/inactivos</button>
          <br />
          {estado}
          <ul>
            {miembros.map((miembro, index) => (
              <li key={index}>
                {miembro.id} - {miembro.nombre} - {miembro.email}
              </li>
            ))}
          </ul>
        </div>
    )
}

export default InformesComponent;