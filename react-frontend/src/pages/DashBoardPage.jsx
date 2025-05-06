import React, { useState} from 'react';
import {createContext, useContext} from 'react';
import ThemeContext from '../context/ThemeContext';
import Layout from './Layout';

// 2º definir contexto
// const ThemeContext = createContext();




const DashboardPage = () => { 

  const [theme, setTheme] = useState("light");

  const toggleTheme = () =>
    setTheme((prev) => (prev === "light" ? "dark" : "light"));

  return (

    <ThemeContext.Provider value={{theme, toggleTheme}} >

    
        <div>
        {/* <Layout theme={theme} toggleTheme={toggleTheme} /> */}
        <Layout />
    
        </div>
    </ThemeContext.Provider>
  );
}
export default DashboardPage;