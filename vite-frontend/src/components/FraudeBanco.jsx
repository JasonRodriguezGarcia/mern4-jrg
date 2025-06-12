import React, { useState, useEffect } from 'react';

const FradudeBanco = () => {
    
    const [transacciones, setTransacciones] = useState([])
    const fetchTransacciones = async () => {
    
        try {
            const query = `
                    query {
                        transacciones {cantidad}
                    }
                `;
            const response = await fetch('http://localhost:5001/graphql', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ query })
            });
            const data = await response.json()
            setTransacciones(data.data.transacciones)
            console.log("data: ", data.data.transacciones)
        } catch (err) {
            // setError('Error fetching data');
        }
    }

    
useEffect(() => {
        fetchTransacciones()

    }, [])

    return (
        <>
            <h2>FRAUDES</h2>
            <ul>
                {transacciones.map((transaccion, index) => (
                    <li key={index}>{transaccion.cantidad}</li>
                ))}
            </ul>
        </>
    )
}

export default FradudeBanco