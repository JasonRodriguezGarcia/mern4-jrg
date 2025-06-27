import React, {useState, useEffect} from 'react'
import { useQuery } from '@tanstack/react-query';

const fetchUser = async () => {
    console.log("Fetching")
    return fetch('https://jsonplaceholder.typicode.com/users/2')
    .then(result => {
        return result.json()
    })
    .then(result => {
        return result;
    });
}
const Query = () => {
    // const [user, setUser] = useState({});
    // const [fetched, setFetched] = useState(true);


    // useEffect(() => {

    //     const loadUser = async () => {
    //         const result = await fetchUser();
    //         setFetched(true);
    //         setUser(result);
    //     }
        
    //     loadUser();
    
    // }, [])
        const { data: user, isLoading, error } = useQuery({
        queryKey: ['user', 2], // <<-- cacheamos el 2 que es el que consultamos arriba
        queryFn: fetchUser,
        staleTime: 5000, // 5segundos hasta que caduque, pasan de resh a stale
        refetchInterval: 10000, // se refresca para coger datos nuevos
    });
    


  return (
    <>
        {/* {fetched && ( */}
            {/* <div>{user.id} - {user.name}</div> */}
                       {isLoading && <div>Cargando...</div>}
            {error && <div>Error al cargar usuario</div>}
            {!isLoading && !error && (
            <div>{user.id} - {user.name}</div>
            )}
        {/* )} */}
    </>
  )
}

export default Query