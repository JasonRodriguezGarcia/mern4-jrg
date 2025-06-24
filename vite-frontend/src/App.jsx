import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
// import Polling from './components/Polling'
// import ProductosSocket from './components/ProductosSocket'
// import Chat1 from './components/Chat1'
// import ButtonCounter from './components/ButtonCounter'
// import ChatRoom from './components/ChatRoom'
// import Review from './components/Review'
// import RecetasList from './components/RecetasList'
// import Kafka from './components/Kafka'
// import MeGusta from './components/MeGusta'
// import FradudeBanco from './components/FraudeBanco'
// import Test1 from './components/test1'
import Form from './components/Form'

function App() {

  const nombre = "Jason"
  return (
    <>
    {/* h2 para probar con cypress */}
    <h2 data-testid="page-title">Second test</h2>  
      {/* <Polling /> */}
      {/* <ProductosSocket  /> */}
      {/* <Chat1 /> */}
      {/* <ButtonCounter /> */}
      {/* <ChatRoom /> */}
      {/* <Review /> */}
      {/* <RecetasList /> */}
      {/* <Kafka /> */}
      {/* <MeGusta /> */}
      {/* <FradudeBanco /> */}
      {/* <Test1 nombreDeUsuario={nombre} edad={50}/> */}
      <Form nombreDeUsuario={nombre} edad={50}/>

    </>
  )
}

export default App
