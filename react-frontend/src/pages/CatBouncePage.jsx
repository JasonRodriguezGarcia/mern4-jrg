import React, { useState } from "react";
import "./CatBounce.css";

const catUrl =[
  "https://media.giphy.com/media/JIX9t2j0ZTN9S/giphy.gif",
  "https://media.giphy.com/media/ule4vhcY1xEKQ/giphy.gif",
  "https://media.giphy.com/media/ue5ZwFCaxy64M/giphy.gif",
  "https://media.giphy.com/media/vhsNmFjuN4WDS/giphy.gif"
] 
const miau = new Audio('miau.mp3');

export default function CatBouncePage() {
  const [cats, setCats] = useState(generateCats(5));
  const [contador, setContador] = useState(0)
  
  const handleClickCat = ()=> {
    miau.play()
  }

  const changeCat = () => {
    setContador(prev => prev + 1)
    if (contador >= 3)
      setContador(0)
    console.log("contador: ", contador)
    return contador
  }

  function generateCats(count) {
    return Array.from({ length: count }, (_, i) => ({
      id: i,
      left: Math.random() * 90 + "%",
      duration: Math.random() * 2 + 1.5 + "s"
    }));
  }

  function addCat() {
    setCats((prev) => [
      ...prev,
      {
        id: prev.length,
        left: Math.random() * 90 + "%",
        duration: Math.random() * 2 + 1.5 + "s"
      }
    ]);
  }


  return (
    <div className="container">
      {cats.map((cat) => (
        <img
          key={cat.id}
          // src={catUrl[{changeCat}]}
          src={catUrl[contador]}
          alt="bouncing cat"
          className="cat"
          style={{ left: cat.left, animationDuration: cat.duration }}
          onClick={handleClickCat}
        />
      ))}
      <div>

      <button onClick={addCat} className="add-button">Add Cat</button> <br/>
      <button onClick={changeCat} className="aadd-button">Change Cat</button>
      </div>
      </div>
  );
}