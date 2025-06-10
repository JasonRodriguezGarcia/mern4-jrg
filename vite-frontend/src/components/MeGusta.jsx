import React, { useState } from 'react';

const MeGusta = () => {

    const [posts, setPosts] = useState([
        {
            id: 1,
            descripcion: "Ir a clase los Domingos"
        },
        {
            id: 2,
            descripcion: "Comer chuleta en horario de clase"
        },
        {
            id: 3,
            descripcion: "Dormir después de comer"
        },
        {
            id: 4,
            descripcion: "Comprar pistachos a la tarde"
        }
    ])
    
    
    const handleMeGusta = async (meGustaID) => {
        try {
            const query = `
                mutation AddPostLike ($input: PostLikeInput!) {
                    addPost(input: $input)
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

                    // query: 
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
            const json = await response.json();
            if (json.errors) {
                setError(json.errors[0].message);
            } else {
                if (action == 0)
                    setRecetas(json.data.recetas);
                else if (action == 1)
                    fetchRecetas(0)
            }
        } catch (err) {
            // setError('Error fetching data');
        }

    }

    return (
        <>
            <h2>Post LinkedIn</h2>
            <ul style={{textAlign: "left"}}>
                {posts.map((post, index)=> (
                    <li key={index}>
                        <button type="button" style={{
                            backgroundColor: "blue", color: "white", margin: "10px"
                            }}
                            onClick={()=> handleMeGusta(index)}
                        >Me Gusta</button>
                        {post.id} -- {post.descripcion} 
                    </li>
                ))}
            </ul>
        </>
    )
}

export default MeGusta