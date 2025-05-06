import React, { useState} from 'react';


// Navbar toggles the theme
const Navbar = ({ theme, toggleTheme }) => {
  return (
    <nav style={{ padding: "1rem", background: theme === "dark" ? "#222" : "#eee" }}>
      <button onClick={toggleTheme}>
        Switch to {theme === "dark" ? "Light" : "Dark"} Mode
      </button>
    </nav>
  );
};

const Dashboard = ({ theme }) => {
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



const Layout = ({ theme, toggleTheme }) => {
  return (
    <>
      <Navbar theme={theme} toggleTheme={toggleTheme} />
      <Dashboard theme={theme} />
    </>
  );
};



const DashboardPage = () => { 

  const [theme, setTheme] = useState("light");

  const toggleTheme = () =>
    setTheme((prev) => (prev === "light" ? "dark" : "light"));

  return (

   
    <div>
      <Layout theme={theme} toggleTheme={toggleTheme} />
   
    </div>
   
  );
}
export default DashboardPage;