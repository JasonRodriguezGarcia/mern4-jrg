import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useParams } from 'react-router-dom';
import { Button, Typography } from '@mui/material';
import { useTranslation } from 'react-i18next';
import LoginComponent from '../components/LoginComponent';


function ProfilePage() {
    const [language, setLanguage] = useState("")

    const {token} = useParams()
    console.log("imprimo token recibido: ", token)
    const navigate = useNavigate();

    // useEffect(()=> {
    //     const fetchProfile = async () => {
    //         try {
    //         // fetch validate
    //         const response = await fetch("http://localhost/api/v1/login/")
    //         const data = await response.json()
    //         // setIsValidToken(true)
    //         } catch (error) {
    //             // setError(error.message); // Handle errors
    //             console.log(error.message)
    //         } finally {
    //             // setLoading(false); // Set loading to false once data is fetched or error occurs
    //         }
    //     }
    //     fetchProfile();

    //     const savedLanguage = localStorage.getItem("language")        
    //     console.log("Language localstorage: ", savedLanguage)
    //     if (savedLanguage)
    //         setLanguage(savedLanguage)
    //     else
    //         setLanguage(localStorage.setItem("language", "en"))
    
    //     i18n.changeLanguage(savedLanguage)


    // }, [])

  const { t, i18n } = useTranslation();

  const changeLanguage = (lang) => {
    i18n.changeLanguage(lang);
    localStorage.setItem("language", lang)
    setLanguage(lang)
  };
  
  return (
    <div>
        <Typography variant='h4'>Profile login</Typography>
        <Typography variant='p'>Token received: {token}</Typography>
        <Button variant="contained" onClick={() => navigate(`/`)} color="primary">
            Go to home peich
        </Button>
        {/* <Button variant="contained" onClick={() => changeLanguage('es')} color="primary">
            {t("faq.Accordeon1Button2")}
        </Button> */}
        {/* <LoginComponent language = {language}/> */}

</div>
  );
}
export default ProfilePage;