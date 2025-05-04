import { useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { Button, Typography } from '@mui/material';
import { useTranslation } from 'react-i18next';
import LoginComponent from '../components/LoginComponent';

function HomePage() {
    const [language, setLanguage] = useState("")

    useEffect(()=> {
        const savedLanguage = localStorage.getItem("language")        
        console.log("Language localstorage: ", savedLanguage)
        if (savedLanguage)
            setLanguage(savedLanguage)
        else
            setLanguage(localStorage.setItem("language", "en"))
    
        i18n.changeLanguage(savedLanguage)
    }, [])

  const { t, i18n } = useTranslation();

  const changeLanguage = (lang) => {
    i18n.changeLanguage(lang);
    localStorage.setItem("language", lang)
    setLanguage(lang)
  };
  
    const navigate = useNavigate();

    const goTo = () => {
        navigate("/descriptions");
    }

  return (
    <div>
        <Typography variant='h4'>{t('welcome_message')} (usando localStorage)</Typography>
        <Button variant="contained" onClick={() => changeLanguage('en')} color="primary">
            {t("faq.Accordeon1Button1")}
        </Button>
        <Button variant="contained" onClick={() => changeLanguage('es')} color="primary">
            {t("faq.Accordeon1Button2")}
        </Button>
        <LoginComponent language = {language}/>

</div>
  );
}
export default HomePage;