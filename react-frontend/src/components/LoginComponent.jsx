import React, {useEffect, useState} from "react";
import { useTranslation } from 'react-i18next';
import Box from '@mui/material/Box';
import { CssVarsProvider, useColorScheme } from '@mui/joy/styles';
import Sheet from '@mui/joy/Sheet';
import CssBaseline from '@mui/joy/CssBaseline';
import Typography from '@mui/joy/Typography';
import FormControl from '@mui/joy/FormControl';
import FormLabel from '@mui/joy/FormLabel';
import Input from '@mui/joy/Input';
import Button from '@mui/joy/Button';
import Link from '@mui/joy/Link';
import Select from '@mui/joy/Select';
import Option from '@mui/joy/Option';
import { grey } from "@mui/material/colors";
import { useEventCallback } from "@mui/material";

const LoginComponent = ({ language }) => {

    const [isValidToken, setIsValidToken] = useState(false)
    const [userName, setUserName] = useState("")
    const [userPassword, setUserPassword] = useState("")
    const [errorMessage, setErrorMessage] = useState("")
    const [languageSet, setLanguageSet] = useState("")

    const { t, i18n } = useTranslation();
    
    // useEffect(()=> {
    //     const fetchSignIn = async () => {

    //         try {
    //         // fetch validate
    //         const response = await fetch("http://localhost/api/v1/login/validate")
    //         const data = await response.json()
    //         setIsValidToken(true)
    //         } catch (error) {
    //             // setError(error.message); // Handle errors
    //             console.log(error.message)
    //         } finally {
    //             // setLoading(false); // Set loading to false once data is fetched or error occurs
    //         }

    //     }
    //     fetchSignIn();
    // }, [])

    useEffect(()=> {
        console.log("Idioma: ", language)
        setLanguageSet(language)
        i18n.changeLanguage(language)
    }, [language])

    useEffect(()=> {
        if (errorMessage) {
            const intervalo = setTimeout(() => {
                setErrorMessage("")
            }, 3000)
            return () => clearTimeout(intervalo)
        }
    }, [errorMessage])

    const loginText = t('login', {returnObjects: true})
    console.log("imprimo loginText: ", loginText)
    const handleLogin = async (e) => {
        e.preventDefault()
        const buttonSelected = e.nativeEvent.submitter.name
        console.log("Pulsado: ", buttonSelected)
        if (buttonSelected === "login") {
            try {
                const user = {
                    username: userName,
                    password: userPassword
                }
                // fetch validate
                const response = await fetch("http://localhost:5000/api/v1/login",
                    {
                        method: 'POST',
                        headers: {'Content-type': 'application/json; charset=UTF-8'},
                        body: JSON.stringify(user)
                    }
                )
                const data = await response.json()
                console.log("Respuesta backend: ", data)
                if (data.message === "usuario o contraseña no válidos") {
                    setErrorMessage(loginText.loginWindow.errorLogin)
                    setIsValidToken(false)
                    return
                }
                setIsValidToken(true)
            } catch (error) {
                // setError(error.message); // Handle errors
                console.log(error.message)
            } finally {
                // setLoading(false); // Set loading to false once data is fetched or error occurs
            }

        } else {
            try {
                const user = {
                    username: userName,
                    password: userPassword
                }
                // fetch validate
                const response = await fetch("http://localhost:5000/api/v1/login/signup",
                    {
                        method: 'POST',
                        headers: {'Content-type': 'application/json; charset=UTF-8'},
                        body: JSON.stringify(user)
                    }
                )
                const data = await response.json()
                console.log("Respuesta backend: ", data)
                if (data.message == "Usuario ya existente") {
                    setErrorMessage(loginText.loginWindow.errorSignup)
                    setIsValidToken(false)
                    return
                }
                setIsValidToken(true)
            } catch (error) {
                // setError(error.message); // Handle errors
                console.log(error.message)
            } finally {
                // setLoading(false); // Set loading to false once data is fetched or error occurs
            }
        }
    }
    
    const handleSignUp = (e) => {
        e.preventDefault()
        console.log(userName, userPassword)

    }
    return (
        <>
            {isValidToken && isValidToken ? 
                // <h2>Página de perfil /Profilepage (logged)</h2>
                // : <h2>No logeado /Not logged in</h2>
                <h2>{loginText.loginStatusMessage.logged}</h2>
                : <h2>{loginText.loginStatusMessage.notLogged}</h2>
            }
            <Box component="form"
                onSubmit={(e)=> handleLogin(e)}
                sx={{
                width: 300,
                mx: 'auto', // margin left & right
                my: 4, // margin top & bottom
                py: 3, // padding top & bottom
                px: 2, // padding left & right
                display: 'flex',
                flexDirection: 'column',
                gap: 2,
                border: "1px solid grey",
                borderRadius: '10px',
                boxShadow: '5px 5px 10px 5px grey',
                }}
            >
                <div>
                    <Typography level="h4" component="h1">
                        {/* <b>Welcome!</b> */}
                        <b>{loginText.loginWindow.headLine1}</b>
                    </Typography>
                    <Typography level="body-sm">{loginText.loginWindow.headLine2}</Typography>
                </div>
                <FormControl>
                    <FormLabel>{loginText.loginWindow.field1Label}</FormLabel>
                    <Input
                        // html input attribute
                        name="username"
                        type="username"
                        // placeholder="name"
                        placeholder={loginText.loginWindow.field1Placeholder}
                        onChange={(e)=> setUserName(e.target.value)}
                        />
                </FormControl>
                <FormControl>
                    <FormLabel>{loginText.loginWindow.field2Label}</FormLabel>
                    <Input
                        // html input attribute
                        name="userPassword"
                        type="password"
                        autoComplete="new-password"
                        placeholder={loginText.loginWindow.field2Placeholder}
                        onChange={(e)=> setUserPassword(e.target.value)}
                    />
                </FormControl>
                <Button type="submit" id="boton1" name="login" sx={{ mt: 1 /* margin top */ }}>{loginText.loginWindow.button1}</Button>
                <Button type="submit" id="boton2" name="signup" sx={{ mt: 1 /* margin top */ }}>{loginText.loginWindow.button2}</Button>
                {errorMessage && 
                <Typography level="body-sm" color="danger" fontWeight="bold" fontSize="1em">{errorMessage}</Typography>
                }
                {/* <Typography
                    endDecorator={<Link href="/sign-up">Sign up</Link>}
                    sx={{ fontSize: 'sm', alignSelf: 'center' }}
                    onClick={handleSignUp}
                    >
                    Don&apos;t have an account?
                </Typography> */}

            </Box>
        </>
    )
}

export default LoginComponent