import React, { useEffect, useState } from 'react';
import { io } from 'socket.io-client';

const socket = io('http://localhost:5000'); // Connect once

const ButtonCounter = () => {
    const [counter, setCounter] = useState(0)
    const [message, setMessage] = useState(0)

    useEffect(()=> {
        socket.on('connection', () => {
            console.log('Connected to socket');
          });
          socket.on('onClick', (data) => {
            console.log(data);
            setCounter(data)
        });

        socket.on('recibirClick', (data) => {
            console.log("recibir click: ", data);
            setMessage(data)
        });

        socket.on('disconnect', (reason) => {
            console.log('Disconnected from socket');
          });
      
        return () => {
            socket.off('connect');
            socket.off('disconnect');
            socket.off('onClick');
            socket.off('recibirClick');
        };
    
    }, [])


    const handleButton = () => {
        setCounter(prev=> {
           const temp = prev +1
           socket.emit("onClick", temp)

           return temp
        }

        )
        console.log("click")
    }

    return (
        <>
            <h2>BUTTON COUNTER</h2>
            <br/>
            <button type='button' onClick={handleButton}>Sumar</button>
            <p>Pulsaste {counter} veces</p>
            <p>Message: {message}</p>
        </>
    )
}

export default ButtonCounter