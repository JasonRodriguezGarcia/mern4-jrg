import React, { useEffect, useState } from 'react';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { TextareaAutosize } from '@mui/material';

const EventsPage = () => {

    const [datosEvents, setDatosEvents] = useState([])
    const [openViewDialog, setOpenViewDialog] = useState(false);
    const [closeViewDialog, setCloseViewDialog] = useState(true)
    const [selectedUser, SetSelectedUser] = useState({})
    const [selectedActionMessage, setSelectedActionMessage] = useState("")


    useEffect(()=> {
        fetch('http://localhost:5000/api/v1/events/2025-04-18T14:30:00.000Z')
            .then(response=> response.json())
            .then(data => setDatosEvents(data))
        
    }, [])

    console.log("imprimo setDatosEvents: ", datosEvents)
    return (
        <>
        {datosEvents && datosEvents.map((evento, index) => (
            
            <Card key={index}sx={{ minWidth: "275px" }}>
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
                        Stars: *****
                    </Typography>
                    <TextareaAutosize
                        aria-label="minimum height"
                        minRows={3}
                        placeholder="Minimum 3 rows"
                        style={{ width: 200 }}
                    />

                </CardContent>
                <CardActions>
                    <Button size="small">Learn More</Button>
                </CardActions>
            </Card>
        ))}

        </>
    )
}
export default EventsPage;