import { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { Button, Box, Typography, TextField, } from '@mui/material';

const EurovisionPage = () => {
    const [idVotante, setIdVotante] = useState(0)
    const [idActuacion, setIdActuacion] = useState(0)

    const handleSendVote = () => {

    }

    const handleFormSubmit = () => {

    }

    return (
        <Box sx={{ display: "flex", flexDirection: "column", backgroundColor: "lightblue", alignItems: "center" }}>
            {/* {datosEvents && datosEvents.map((evento, index) => (     */}
            <Typography variant="h1" component="h2">
                 Welcome to Eurovision voting
            </Typography>
            {/* <Typography component="p">
                Pls describe the image bellow with your own words
            </Typography> */}
            <Box component="div" sx={{display: "flex", alignItems: "center"}}>

                {/* UN BOX QUE ACTUA COMO UN FORMULARIO */}
                <Box  component="form" onSubmit={handleFormSubmit} sx={{
                        width: "100%",
                        display: "flex",
                        flexDirection: "column",
                        gap: "20px",
                    }}
                >

                    {/* <TextField id="picture" label="Picture" variant="outlined" onChange={(e)=> setPicture(e.target.value)} /> */}
                    <TextField id="idVotante" label="idVotante" variant="filled" onChange={(e)=> setIdVotante(e.target.value)} required/>
                    <TextField id="idActuacion" label="idActuacion" variant="outlined"
                    onChange={(e)=> setIdActuacion(e.target.value)} required
                    />
                    {/* <TextField value={date} id="date" variant="filled" onChange={(e)=> setDate(e.target.value)} disabled={true}/> */}

                    <Box sx={{display: "flex", gap: "20px", justifyContent: "center"}}>
                    {/* <Button type="submit" onClick={handleFormSubmit} variant="contained" color="primary"> */}
                    <Button type="submit"variant="contained" color="primary">
                    Save
                        </Button>
                        <Button type="button" onClick={()=> navigate('/descriptions')} variant="contained" color="primary">
                        Cancel
                        </Button>
                    </Box>
                </Box>
            </Box>            {/* ))} */}
        </Box>
        // <Box sx={{ width: '100%', maxWidth: 500 }}>
        //     <Typography variant="h1" component="h2">
        //         Welcome to Eurovision voting
        //     </Typography>
        //     <Box component="form"
        //         onSubmit={(e)=> handleSendVote(e)}
        //         sx={{
        //         width: 300,
        //         mx: 'auto', // margin left & right
        //         my: 4, // margin top & bottom
        //         py: 3, // padding top & bottom
        //         px: 2, // padding left & right
        //         display: 'flex',
        //         flexDirection: 'column',
        //         gap: 2,
        //         border: "1px solid grey",
        //         borderRadius: '10px',
        //         boxShadow: '5px 5px 10px 5px grey',
        //         }}
        //     >
        //         <div>
        //             <Typography level="h4" component="h1">
        //                 {/* <b>Welcome!</b> */}
        //                 <b>Cast a vote</b>
        //             </Typography>
        //             {/* <Typography level="body-sm">{loginText.loginWindow.headLine2}</Typography> */}
        //         </div>
        //         <FormControl>
        //             <FormLabel>Id Votante:</FormLabel>
        //             <Input
        //                 // html input attribute
        //                 name="idVotante"
        //                 type="idVotante"
        //                 // placeholder={loginText.loginWindow.field1Placeholder}
        //                 // onChange={(e)=> setUserName(e.target.value)}
        //                 />
        //         </FormControl>
        //         <FormControl>
        //             <FormLabel>Id Actuacion:</FormLabel>
        //             <Input
        //                 // html input attribute
        //                 name="idActuacion"
        //                 type="idActuacion"
        //                 // autoComplete="new-password"
        //                 // placeholder={loginText.loginWindow.field2Placeholder}
        //                 // onChange={(e)=> setUserPassword(e.target.value)}
        //             />
        //         </FormControl>
        //         <FormControl>
        //             <FormLabel>Calificacion Voto</FormLabel>
        //             <Input
        //                 // html input attribute
        //                 name="voto"
        //                 type="voto"
        //                 // autoComplete="new-password"
        //                 // placeholder={loginText.loginWindow.field2Placeholder}
        //                 // onChange={(e)=> setUserPassword(e.target.value)}
        //             />
        //         </FormControl>
        //         <Button type="submit" id="boton1" name="login" sx={{ mt: 1 /* margin top */ }}>Votar</Button>
        //         {errorMessage && 
        //             <Typography level="body-sm" color="danger" fontWeight="bold" fontSize="1em">{errorMessage}</Typography>
        //         }
        //     </Box>
        // </Box>
    )
}

export default EurovisionPage