// versión separada con context

// en versiones viejas el "React" sobraría ya que en nuevas está por defecto
//1º
import { lightGreen } from '@mui/material/colors';
import React, {useState, createContext, useContext} from 'react';

// 2º definir contexto
const MessageContext = createContext(); // Puede llamarse MisDatosContext en lugar de MessageContext

const ChildChildComponent = () => {
     // Acceder la variable con UseContext
     const {message, edad, setEdad} = useContext(MessageContext);
    return (
        <div style={{border: "1px solid white", color: "white",  backgroundColor: 'lightsalmon', width: "65%", margin: "auto"}}>
                <div>hijo del hijo {message} de {edad}
                <h3>Estos botones están en el componente ChildChild</h3>
                <button onClick={()=> setEdad(prevEdad => edad+1)}>sumar</button>
                <button onClick={()=> setEdad(prevEdad => edad-1)}>restar</button>
            </div>
        </div>
    )
}
  // borramos prop
  const ChildComponent = () => {
       // Acceder la variable con UseContext
       const {message, edad} = useContext(MessageContext);
       return (
      <div style={{border: "1px solid white", color: "white",  backgroundColor: "lightGreen", width: "65%", margin: "auto"}}>
        <h1> Soy un hijo componente </h1>
        <h2>{message}- edad: {edad}</h2>  
        {/* // borramos prop */}
        <ChildChildComponent />
      </div>
    )
  };

  // borramos prop
  const ParentComponent = () => {
     // Acceder la variable con UseContext
     const {message, edad, setEdad} = useContext(MessageContext);
    return (
      <div style={{border: "1px solid white", color: "white",  backgroundColor: "lightblue", width: "75%", margin: "auto"}}>
        <h1> Soy el padre componente </h1>
        <h2>{message} - edad: {edad} </h2>
        <div>
            <h3>Estos botones están en el componente principal</h3>
            <button onClick={()=> setEdad(prevEdad => prevEdad+1)}>sumar</button>
            <button onClick={()=> setEdad(prevEdad => prevEdad-1)}>restar</button>
        </div>
        <br />
        {/* // borramos prop */}
        <ChildComponent />
      </div>
    );
  }
  
  function PropDrillingHomePage2() {
  
      const message = "Hello everyone!";
    //   const edad = "55"
        const [edad, setEdad] = useState(55)
      return (
            //3º Envolver los componentes con MessageContext
        <MessageContext.Provider value={{message, edad, setEdad}} >

              <div style={{border: "1px solid white", color: "white",  backgroundColor: "blue"}}>
                {/* // borramos prop */}
        
                <ParentComponent />
              </div>
        </MessageContext.Provider>
      );
  }
  export default PropDrillingHomePage2;