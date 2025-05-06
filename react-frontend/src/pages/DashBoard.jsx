import ThemeContext from '../context/ThemeContext';
import {createContext, useContext} from 'react';

const Dashboard = () => {
    const {theme, toggleTheme} = useContext(ThemeContext)
    return (
    <div
      style={{
        padding: "2rem",
        background: theme === "dark" ? "#333" : "#fafafa",
        color: theme === "dark" ? "#fff" : "#000",
      }}
    >
      <h2>Dashboard</h2>
      <p>Current theme: {theme}</p>
    </div>
  );
};

export default Dashboard