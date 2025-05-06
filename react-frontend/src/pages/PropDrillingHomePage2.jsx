// versión separada con context

// en versiones viejas el "React" sobraría ya que en nuevas está por defecto
//1º
import React, {createContext, useContext} from 'react';

// 2º definir contexto
const MessageContext = createContext();

const ChildChildComponent = () => {
     // Acceder la variable con UseContext
     const {message, edad} = useContext(MessageContext);
    return (
        <div>hijo del hijo {message} de {edad}</div>
    )
}
  // borramos prop
  const ChildComponent = () => {
       // Acceder la variable con UseContext
       const {message, edad} = useContext(MessageContext);
       return (
      <div>
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
     const {message, edad} = useContext(MessageContext);
    return (
      <div>
        <h1> Soy el padre componente </h1>
        <h2>{message} - edad: {edad} </h2>
        {/* // borramos prop */}
        <ChildComponent />
      </div>
    );
  }
  
  function PropDrillingHomePage() {
  
      const message = "Hello everyone!";
      const edad = "55"
      return (
            //3º Envolver los componentes con MessageContext
        <MessageContext.Provider value={{message, edad}} >

              <div>
              {/* // borramos prop */}
     
              <ParentComponent />
              </div>
        </MessageContext.Provider>
      );
  }
  export default PropDrillingHomePage;