import {useState} from 'react';
import { useQuery } from '@tanstack/react-query';


const fetchImage = async ({queryKey}) => {
    console.log(queryKey);
    const [, id] = queryKey;
    console.log("Fetching");
    return fetch(`https://picsum.photos/id/${id}/info`)
    .then(result => {
        console.log(result)
        return result.json()
    })
    .then(result => {
        return result;
    });
}


const Query3 = () => {
    const [imageId, setImageId] = useState(1)
    // const [imgID, setImageId] = useState(1);
    const [submittedId, setSubmittedId] = useState(1);

    const { data, isLoading, error } = useQuery({
        queryKey: ['img', Number(submittedId)],
        queryFn: fetchImage,
        staleTime: 10000, // 10 seconds
        //refetchInterval: 6000,
        onSuccess: () => console.log('Data fetched/refetched'),
        onError: (err) => console.error('Fetch error:', err),
    });
    

    return (
        <>
            Image Id: <input type="text" value={imageId} onChange={(e)=>setImageId(e.target.value)}/>
            <button onClick={() => setSubmittedId(imageId)}>Get</button>

            {isLoading && <div>Cargando...</div>}
            {error && <div>Error al cargar usuario</div>}
            {!isLoading && !error && (
            <div ><img src={data.download_url} style={{width: "300px", height: "auto"}} alt="" /></div>
            )}
        </>
    )
}

export default Query3