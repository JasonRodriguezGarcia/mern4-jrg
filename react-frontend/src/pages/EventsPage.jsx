import React, { useEffect, useState } from 'react';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { TextareaAutosize } from '@mui/material';
// rating
import Rating from '@mui/material/Rating';
// radio buttons
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';

const EventsPage = () => {

    const [datosEvents, setDatosEvents] = useState([])
    const [value, setValue] = useState(0);
    const [valueRadio, setValueRadio] = useState(true);

    const [openViewDialog, setOpenViewDialog] = useState(false);
    const [closeViewDialog, setCloseViewDialog] = useState(true)
    const [selectedUser, SetSelectedUser] = useState({})
    const [selectedActionMessage, setSelectedActionMessage] = useState("")


    useEffect(()=> {
        fetch('http://localhost:5000/api/v1/events')
            .then(response=> response.json())
            .then(data => setDatosEvents(data))
        
    }, [])

    useEffect(()=> {
        console.log("valor radio boton: ", valueRadio)
    })
    console.log("imprimo setDatosEvents: ", datosEvents)
    return (
        <>

            <Box component="form" sx={{ display: "flex", flexDirection: "column", backgroundColor: "lightblue", alignItems: "center" }}>
                {datosEvents && datosEvents.map((evento, index) => (    
                    <Card key={index} sx={{ display: "flex", flexDirection: "column", width: "50%", margin: "50px", backgroundColor: "lightgray" }}>
                        <CardContent>
                            <Typography gutterBottom sx={{ color: 'text.secondary', fontSize: 14 }}>
                                Danos tu opinion de este evento
                            </Typography>
                            <Typography variant="h5" component="div">
                                {evento.title}
                            </Typography>
                            <Typography sx={{ color: 'text.secondary', mb: 1.5 }}>{evento.date}</Typography>
                            <Typography variant="body2">
                                Formato: {evento.isOnline ? "ONLINE" : "OFFLINE"}
                                <br />
                                <Rating
                                    name="simple-controlled"
                                    value={value}
                                    onChange={(event, newValue) => {
                                    setValue(newValue);
                                    }}
                                />
                            </Typography>
                            <TextareaAutosize
                                aria-label="minimum height"
                                minRows={3}
                                placeholder="Minimum 3 rows"
                                style={{ width: 200 }}
                            />
                            {/* <FormControl> */}
                                {/* <FormLabel id="demo-radio-buttons-group-label">Gender</FormLabel> */}
                                <RadioGroup 
                                    aria-labelledby="demo-radio-buttons-group-label"
                                    defaultValue= {true}
                                    name="radio-buttons-group"
                                    onChange={(e)=> setValueRadio(e.target.value)}
                                >
                                    <FormControlLabel value={true} control={<Radio />} label="Sí" />
                                    <FormControlLabel value={false} control={<Radio />} label="No" />
                                </RadioGroup>
                            {/* </FormControl> */}
                        </CardContent>
                        <CardActions>
                            <Button size="small">Enviar opinión ...</Button>
                        </CardActions>
                    </Card>
                ))}
            </Box>
        </>
    )
}
export default EventsPage;