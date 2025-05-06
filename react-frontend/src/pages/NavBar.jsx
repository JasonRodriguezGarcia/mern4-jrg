import ThemeContext from '../context/ThemeContext';
import {createContext, useContext} from 'react';

// Navbar toggles the theme
const Navbar = () => {
    const {theme, toggleTheme} = useContext(ThemeContext)

  return (
    <nav style={{ padding: "1rem", background: theme === "dark" ? "#222" : "#eee" }}>
      <button onClick={toggleTheme}>
        Switch to {theme === "dark" ? "Light" : "Dark"} Mode
      </button>
    </nav>
  );
};

export default Navbar