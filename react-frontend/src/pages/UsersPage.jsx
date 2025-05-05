import React, { useEffect, useState } from 'react';
import Button from '@mui/material/Button';
import ButtonGroup from '@mui/material/ButtonGroup';
import CircularProgress from '@mui/material/CircularProgress';
import Typography from '@mui/material/Typography';
import Icon from '@mui/material/Icon';

// datos para una tabla
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
// fin datos tabla
// para dialog
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
// fin dialog


// https://jsonplaceholder.typicode.com/

const UsersPage = () => {

    const [datosUsers, setDatosUsers] = useState([])
    const [openViewDialog, setOpenViewDialog] = useState(false);
    const [closeViewDialog, setCloseViewDialog] = useState(true)
    const [selectedUser, SetSelectedUser] = useState({})
    const [selectedActionMessage, setSelectedActionMessage] = useState("")


    useEffect(()=> {
        fetch('http://localhost:5000/api/v1/users')
            .then(response=> response.json())
            .then(data => setDatosUsers(data))
        
    }, [])

    const handleView = (id) => {
        let resultado = ""
        fetch(`http://localhost:5000/api/v1/coches/${id}`,
            {method: "get"})
        .then(response => response.json())
        .then(data => {
            resultado = data
            if (resultado) {
                console.log("coche seleccionado:", resultado)
                SetSelectedUser(data)
                setOpenViewDialog(true)
                setSelectedActionMessage("View Car Data")
            }
        })
    }

    const handleDelete = (id) => {
        let resultado = ""
        fetch(`http://localhost:5000/api/v1/coches/${id}`,
            {method: "delete"})
        .then(response => response.json())
        .then(data => {
            resultado = data
            if (resultado) {
                console.log("coche borrado:", resultado)
                setSelectedActionMessage("Delete Car")

            }
        })
    }

    return (
        <>
            <Typography variant="h1" sx={{backgroundColor: "blue"}}>USUARIOS</Typography>

            {/* <Dialog
                open={openViewDialog}
                onClose={()=> setOpenViewDialog(false)}
                aria-labelledby="viewCar-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <DialogTitle id="viewCar-dialog-title">
                    {selectedActionMessage}
                </DialogTitle>
                <DialogContent>
                    <DialogContentText id="alert-dialog-description">
                        Id: {selectedUser.id}<br />
                        Marca: {selectedUser.username}<br />
                        Año fabricación: {selectedUser.password}
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={()=> setOpenViewDialog(false)} autoFocus>
                        Close
                    </Button>
                </DialogActions>
            </Dialog> */}
        

            {/* <TableContainer component={Paper}> */}
                <Table sx={{ minWidth: 200 }} aria-label="simple table">
                    <TableHead>
                    <TableRow>
                        <TableCell>Nombre</TableCell>
                        <TableCell align="right">Contraseña</TableCell>
                        <TableCell align="right">Acción</TableCell>
                    </TableRow>
                    </TableHead>
                    <TableBody>
                        {datosUsers.map((usuario) => (
                            <TableRow
                            key={usuario._id}
                            //   sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                            >
                                <TableCell component="th" scope="row">
                                    {usuario.username}
                                </TableCell>
                                <TableCell align="right">{usuario.password}</TableCell>
                                <TableCell align="right">
                                <ButtonGroup variant="contained" aria-label="Basic button group">
                                    <Button onClick={()=> handleView(usuario.id)}>🔎View</Button>
                                    <Button sx={{ backgroundColor: "green", color: "white" }}>➕Add
                                        <Icon baseClassName="fas" className="fa-plus-circle" color="primary" />
                                    </Button>
                                    <Button sx={{ backgroundColor: "green", color: "white" }}>✏️Modify</Button>
                                    <Button onClick={()=> handleDelete(usuario.id)} sx={{ backgroundColor: "blue", color: "white" }}>❌Delete</Button>
                                </ButtonGroup>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            {/* </TableContainer> */}

        </>
    )
}
export default UsersPage;