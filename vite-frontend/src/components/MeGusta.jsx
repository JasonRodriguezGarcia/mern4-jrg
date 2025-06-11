import React, { useState } from 'react';
import ThumbUpIcon from '@mui/icons-material/ThumbUp';


const MeGusta = () => {

    const [posts, setPosts] = useState([
        {
            id: 1,
            tema: "Logro profesional reciente",
            descripcion: "¡Logro desbloqueado! Esta semana cerramos con éxito un proyecto que llevaba meses de trabajo en equipo, planificación y mucha pasión. Liderar esta iniciativa me enseñó el valor de la comunicación constante y la flexibilidad ante los cambios. Agradezco a cada persona que formó parte. ¡Vamos por más!"
        },
        {
            id: 2,
            tema: "Lección aprendida en el trabajo", 
            descripcion: "A veces, los errores son los mejores maestros. Hace unos meses tomé una decisión apresurada que impactó el flujo de un proyecto. ¿El resultado? Un gran aprendizaje sobre la importancia de escuchar primero y actuar después. Hoy, valoro aún más el feedback del equipo y la revisión cuidadosa antes de ejecutar. ¿Cuál ha sido tu mayor aprendizaje reciente?",
        },
        {
            id: 3,
            tema: "Habilidades blandas",
            descripcion: "En un mundo lleno de automatización, las habilidades humanas hacen la diferencia. He estado trabajando en mejorar mi empatía y comunicación asertiva, y los resultados se notan tanto en reuniones como en liderar equipos. No todo es saber técnico: también hay que saber conectar. ¿Qué soft skill consideras esencial hoy?"
        },
        {
            id: 4,
            tema: "Desarrollo profesional",
            descripcion: "Nunca dejamos de aprender. Este mes terminé un curso de [nombre del curso] en [plataforma/escuela], centrado en [tema específico, ej. liderazgo estratégico]. Me llevo herramientas valiosas que ya estoy aplicando en mi día a día. ¿Estás tomando algún curso o formándote en algo nuevo?"
        }
    ])
    const [likes, setLikes] = useState({});
    
    const handleMeGusta = async (meGustaID) => {
        try {
            debugger
            const query = `
                mutation addPostLike ($input: PostLikeInput!) {
                    addPostLike(input: $input)
                }
                `;
            const variables = {
                input: {
                    id: meGustaID,
                    accion: "Me Gusta",
                    fecha: new Date().toISOString(),
                },
            };
            const response = await fetch('http://localhost:5001/graphql', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ query , variables

                    // query:  // otra forma un tanto diferente
                    //     `mutation ($id: Int) {
                    //         addPostLike (input: {
                    //             id: $id
                    //             accion: $accion
                    //             fecha: "2025-06-06"
                    //         })
                    //     }
                    //     `
                    // ,
                    // variables: {
                    //     id: meGustaID,
                    //     accion: "Me gusta"
                    // }

                }),
        });
            // const json = await response.json();
            // if (json.errors) {
            //     setError(json.errors[0].message);
            // } else {
            //     if (action == 0)
            //         setRecetas(json.data.recetas);
            //     else if (action == 1)
            //         fetchRecetas(0)
            // }
        } catch (err) {
            // setError('Error fetching data');
        }

    }

    const toggleLike = (id) => {
        const newLikes = {
            ...likes, [id]: !likes[id]
        }
        setLikes(newLikes)
        console.log("imprimo like: ", newLikes)
        console.log("newLikes.id: ", newLikes[id])
        if (!newLikes[id])
            return
        handleMeGusta(id)
    }

    return (
        <>
            <h2>Post LinkedIn</h2>
            <ul style={{textAlign: "left"}}>
                {posts.map((post, index)=> (
                    <li key={index}>
                        {/* <button type="button" style={{
                            backgroundColor: "blue", color: "white", margin: "10px"
                            }}
                            onClick={()=> handleMeGusta(index)}
                        >Me Gusta</button> */}
                        <button
                            onClick={() => toggleLike(post.id)}
                            style={{ background: 'lightgrey', border: 'none', cursor: 'pointer', margin: "10px" }}
                        >
                            <ThumbUpIcon
                                style={{
                                    color: likes[post.id] ? 'blue' : 'gray',
                                    fontSize: 30,
                                }}
                            />
                        </button>
                        {post.id} -- {post.descripcion} 
                    </li>
                ))}
            </ul>
        </>
    )
}

export default MeGusta