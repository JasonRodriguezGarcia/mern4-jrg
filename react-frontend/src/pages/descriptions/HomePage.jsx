import { useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { Button } from '@mui/material';
import { useTranslation } from 'react-i18next';
import FaqComponent from '../../components/FaqComponent';

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

  };
  
    const navigate = useNavigate();

    const goToCars = () => {
        navigate("/descriptions");
    }

  return (
    <div>
      <h2>{t('welcome_message')} (usando localStorage)</h2>
      <button onClick={() => changeLanguage('en')}>English</button>
      <button onClick={() => changeLanguage('es')}>Español</button>

      <Button variant="contained" color="primary" onClick={goToCars}>
        {t('home_button1')}
      </Button>

      <FaqComponent />
{/* <h2>Welcome JOM Peich</h2>

<Button variant="contained" color="primary" onClick={goToCars}>
  Go to Descriptions
</Button> */}
</div>
  );
}
export default HomePage;