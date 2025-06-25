import React, { useState, useMemo } from 'react'


function sumarTo(x) {
  console.log("doing long compute");
    let total = 0;
    for (let index = 0; index < x; index++) {
      total = total + index;
    }
    return total;
}

export const  LongComput = () => {
  const [greeting, setGreeting] = useState('Hola');

  console.log("re-render");

  let longComput =  useMemo(()=> sumarTo(10000000), []); // podría depender de otra variable a lo useEffect
 
  return (
    <>
      <h1>Long Comput</h1>
    
      Result is: {longComput}

      {greeting}
      <button onClick={(e)=> setGreeting('Adios')}>Greeting</button>
    </>
  )
}