import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import SmartDoor from './components/SmartDoor'
import InformesComponent from './components/InformesComponent'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <div>
        <h2>Smartdoor</h2>
        <SmartDoor />
        <h2>Informe estado usuarios</h2>
        <InformesComponent />
      </div>
      <div>

      </div>
    </>
  )
}

export default App
