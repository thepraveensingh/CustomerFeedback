import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import Feedback from './components/Feedback'
import {BrowserRouter,Routes, Route ,Navigate} from 'react-router-dom'
import Login from './components/Login'
import NotFound from './components/NotFound'
import {GoogleOAuthProvider} from '@react-oauth/google'


function App(){
  const GoogleAuthWrapper = () =>{
    return(
      <GoogleOAuthProvider clientId="564147358913-nj9ndg3unn81g6u7qbi8tpbhmliikki9.apps.googleusercontent.com">
        <Login/>
      </GoogleOAuthProvider>
    )
  }
  return(
  <BrowserRouter>
    <Routes>
      <Route path = '/' element = {<Navigate to = "/login"/>} />
      <Route path ='/login' element={<GoogleAuthWrapper/>} />
      <Route path = '/feedback' element = {<Feedback/>} />
      <Route path = '/*' element = {<NotFound/>} />

    </Routes>
  </BrowserRouter>
  )
}

export default App
