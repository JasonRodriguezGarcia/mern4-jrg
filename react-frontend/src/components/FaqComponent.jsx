import { useNavigate } from 'react-router-dom';
// import { Button } from '@mui/material';
import { useTranslation } from 'react-i18next';
import { useEffect, useState } from 'react';

// import Accordion from '@mui/material/Accordion';
// import AccordionActions from '@mui/material/AccordionActions';
// import AccordionSummary from '@mui/material/AccordionSummary';
// import AccordionDetails from '@mui/material/AccordionDetails';
// import Typography from '@mui/material/Typography';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
// import Button from '@mui/material/Button';
import {Accordion, AccordionActions, AccordionSummary, AccordionDetails, Typography, Button}  from '@mui/material';



function FaqComponent() {
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
  
  const questions = t('faq.questions', {returnObjects: true}) // returnObjects ¿?
  console.log(questions)
  return (
    <div>
        <h2>{t('welcome_message')} (usando localStorage)</h2>

        {/* {questions.map((item, index) => (
            <li>
                {item.q}
                {item.a}
            </li>
        ))}
 */}

        {questions.map((item, index) => (
            <Accordion key={index}>
                <AccordionSummary
                    expandIcon={<ExpandMoreIcon />}
                    aria-controls={`panel${index}-content`}
                    id={`panel${index}-header`}
                >
                    <Typography component="span">{item.q}</Typography>
                </AccordionSummary>
                <AccordionDetails>
                    {item.a}
                </AccordionDetails>

            </Accordion>
        ))}

      <button onClick={() => changeLanguage('en')}>{t('faq.Accordeon1Button1')}</button>
      <button onClick={() => changeLanguage('es')}>{t('faq.Accordeon1Button2')}</button>


{/* <h2>Welcome JOM Peich</h2>

<Button variant="contained" color="primary" onClick={goToCars}>
  Go to Descriptions
</Button> */}
</div>
  );
}
export default FaqComponent;