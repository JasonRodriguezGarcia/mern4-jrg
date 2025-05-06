// Versión inicial a separar con context
const ChildChildComponent = ({message}) => {
    return (
        <div>hijo del hijo {message}</div>
    )
}
const ChildComponent = ({message}) => {
    return (
      <div>
        <h1> Soy un hijo componente </h1>
        <h2>{message}</h2>  
        <ChildChildComponent message={message}/>
      </div>
    )
  };
  
  const ParentComponent = ({message}) => {
  
    return (
      <div>
        <h1> Soy el padre componente </h1>
        <h2>{message}</h2>
        <ChildComponent message={message} />
      </div>
    );
  }
  
  function PropDrillingHomePage() {
  
      const message = "Hello everyone!";
      
      return (
          <div>
  
          <ParentComponent message={message} />
          </div>
      );
  }
  export default PropDrillingHomePage;