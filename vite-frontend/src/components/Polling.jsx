import React, { useEffect, useState } from 'react';
import { CircularProgress } from '@mui/material';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';

const Polling = () => {
  const [productos, setProductos] = useState([]);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [color, setColor] = useState(["red", "yellow", "green"])
  const [intervalTime, setIntervalTime] = useState([1000, 2000, 3000, 4000, 5000])
  const [intervalSelected, setIntervalSelected] = useState(0)
  const [intervalActivated, setIntervalActivated] = useState(true)

  const fetchProductos = async () => {
    try {
      const response = await fetch('http://localhost:5000/api/v1/productos');

      if (!response.ok) throw new Error('Error en la respuesta');
      const data = await response.json();
      setProductos(data);
      

    } catch (error) {
      console.error('Error al obtener los productos:', error);
    }
  };

  useEffect(() => {
    let interval
    if (intervalActivated) {

        interval = setInterval(() => {
            setIsRefreshing(true);
            setTimeout(() => {
                setIsRefreshing(false);
                fetchProductos();
            }, 1000); // wait 1 second before fetch
        }, intervalTime[intervalSelected]);
        
        
        fetchProductos(); // initial load
    }

    return () => {
        if(interval)
        clearInterval(interval); // cleanup
    }
  }, [intervalSelected, intervalActivated]);

  const selectInterval = () => {
    return intervalTime.map ((time, index) => (
        <option key={index} value={index}>{time}ms</option>   
    ))
  }

  const handleSelect = (event) => {
    setIntervalSelected(parseInt(event.target.value))
    console.log("imprimo intervalSelected: ", event.target.value)
  }
  return (
    <>
        <Box sx={{width: "90vw", marginX: "20px"}}>

            <div style={{ padding: '2rem' }}>

                {isRefreshing && (
                    <div style={{ color: 'orange', marginBottom: '1rem' }}>
                        <CircularProgress />
                        Actualizando productos...
                    </div>
                )}
                <Box sx={{ flexGrow: 1 }}>
                    <Grid container spacing={2}>
                        <Grid size={6}>
                            <Box sx={{display: "flex", flexDirection: "column", gap: "10px"}}>


                                <h2>📦 Productos (con polling)</h2>
                                {productos.map((prod) => (
                                    <div key={prod._id} style={{ marginBottom: '1rem',
                                        color: `${prod.cantidad < 50? color[0]: prod.cantidad <100? color[1]: color[2]}` }}>
                                    <strong>{prod.nombreProducto}</strong> — {prod.cantidad} unidades
                                    
                                    </div>
                                ))}


                            </Box>
                        </Grid>
                        <Grid size={6}>

                            <Box sx={{display: "flex", flexDirection: "column", gap: "10px", backgroundColor: "white"}}>
                                <Box sx={{display: "flex"}}>
                                    <input type="radio" id="html" name="activated" checked={intervalActivated===true} onChange={()=> setIntervalActivated(true)} />
                                    <label htmlFor="html">Activado</label>
                                    <input type="radio" id="css" name="activated" checked={intervalActivated===false} onChange={()=> setIntervalActivated(false)} />
                                    <label htmlFor="css">Desactivado</label><br />
                                </Box>
                                
                                <label name="intervalTimeSelect">Tiempo</label>
                                <select name="intervalTimeSelect" id="intervalTimeSelect" value={intervalSelected} disabled={!intervalActivated} onChange={(event)=> handleSelect(event)}>
                                    {selectInterval()}
                                </select>

                            </Box>
                        </Grid>
                    </Grid>
                </Box>


            </div>
        </Box>
    </>
  );
}

export default Polling;