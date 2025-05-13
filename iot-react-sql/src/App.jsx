import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import SmartDoor from './components/SmartDoor'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <div>
        <h1>Smartdoor</h1>
        <SmartDoor />
      </div>
      <div>

      </div>
    </>
  )
}

export default App
