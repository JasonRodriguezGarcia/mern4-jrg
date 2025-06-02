import { useEffect, useState } from 'react';

function DogsComponent() {
  const [dogs, setDogs] = useState([]);
  const [message, setMessage] = useState([])

  useEffect(() => {
    const fetchDogs = () => {
      fetch(`https://dog.ceo/api/breeds/list/all`)
        .then(res => {
          if (!res.ok) {
            throw new Error(`Failed to fetch dogs: ${res.status}`);
          }
          return res.json();
        })
        .then(data => {
          const topLevelBreeds = Object.keys(data.message);
          setDogs(topLevelBreeds);
          console.log('Dog breeds:', topLevelBreeds);
        })
        .catch(err => {
          console.error(`Error fetching dogs:`, err);
        });
    };

    fetchDogs();
  }, []);

  const handlefoto = (foto) => {
    fetch(`https://dog.ceo/api/breed/${foto}/images`)
    .then(res => {
      if (!res.ok) {
        throw new Error(`Failed to fetch dogs image: ${res.status}`);
      }
      return res.json();
    })
    .then(data => {
      const topLevelBreeds = Object.keys(data.message);
      return topLevelBreeds[0]
    //   setDogs(topLevelBreeds);
    //   console.log('Dog breeds:', topLevelBreeds);
    })
    .catch(err => {
      console.error(`Error fetching dogs image:`, err);
    });
  }

    const selectDogs = () => {
        return dogs.map((dog, index) => (
            <option key={index} data-foto={()=>handlefoto(dog)} value={dog}>
                {dog}
            </option>
        ));
    };

    const handleBreed = (event) => {
        console.log("mensaje: ", event.target.selectedOptions)
        const arrSelected = Array.from(event.target.selectedOptions, x=> x.value);
        setMessage(arrSelected)
    }
  return (
    <div>
      <h2>List of Dogs</h2>
      {/* <ul>
        {dogs.map((breed, index) => (
          <li key={index}>{breed}</li>
        ))}
      </ul> */}
      <label name="perros" id="perros"></label>
      <select name="perros" id="perros" multiple onChange={(event)=> handleBreed(event)}>
            {selectDogs()}
      </select>
      <br/>
      <p> Perro(s) seleccionado(s):
      </p>

        {message.map((mess, index) => (
                <div>
            <p key={index}>
                {mess}
            </p>
            
            </div>
        ))}
        {/* <option value=""></option> */}

    </div>
  );
}

export default DogsComponent;