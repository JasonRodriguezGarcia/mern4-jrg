import { useState } from 'react'
// import reactLogo from './assets/react.svg'
// import viteLogo from '/vite.svg'
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
// import Form from './components/Form'
// import { LongComput } from './components/LongComput'
// import { LazyLoad } from './components/LazyLoad'
// import Query from './components/Query';
//  import Query2 from './components/Query2';
import Query3 from './components/Query3';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';

const queryClient = new QueryClient();
function App() {

  const nombre = "Jason"
  return (
    <>

    {/* h2 para probar con cypress */}
    <h2 data-testid="page-title">Testing test</h2>  
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
      {/*  PODRÍAMOS PASAR TAMBIÉN UN ESTADO EN LOS PROPS */}
      {/* <Test1 nombreDeUsuario={nombre} edad={50}/> */}
      {/* <Form nombreDeUsuario={nombre} edad={50}/>  */}
      {/* <LongComput /> */}
      {/* <LazyLoad /> */}

       <QueryClientProvider client={queryClient}>
        {/* <Query /> */}
        <Query3 />
        <ReactQueryDevtools initialIsOpen /> 
      </QueryClientProvider>
    </>
  )
}

export default App
