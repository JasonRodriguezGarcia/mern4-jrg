import React, { useEffect, useState } from 'react';
import { CircularProgress } from '@mui/material';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';

const Polling = () => {
  const [productos, setProductos] = useState([]);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [color, setColor] = useState(["red", "yellow", "green"])
  const [intervalTime, setIntervalTime] = useState([1000, 2000, 3000, 4000, 5000])

  const selectInterval = () => {
    intervalTime.map (time => {
        return <option value="time">{time}</option>   
    })
  }

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
    const interval = setInterval(() => {
      setIsRefreshing(true);
      setTimeout(() => {
        setIsRefreshing(false);
        fetchProductos();
      }, 1000); // wait 1 second before fetch
    }, 5000);
    

    fetchProductos(); // initial load

    return () => clearInterval(interval); // cleanup
  }, []);

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
                        <label htmlFor="intervalTimeSelect">Tiempo</label>
                        <select name="intervalTimeSelect" id="intervalTimeSelect">
                            {intervalTime}
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