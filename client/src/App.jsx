import React from 'react'
import {BrowserRouter,Routes,Route} from 'react-router-dom'
import Home from './pages/Home'
import Signin from './pages/Signin'
import Profile from './pages/Profile'
import Signup from './pages/Signup'
import About from './pages/About'
import Header from './Components/Header'
import "./index.css";
import PrivateRoute from './Components/PrivateRoute'
export default function App() {
  return (
    
    
    <BrowserRouter>
    <Header/>
     <Routes>
      <Route path='/' element={<Home/>}/>
      
      <Route path='/About' element={<About/>}/>
      <Route path='/Signin' element={<Signin/>}/>
      <Route path='/Signup' element={<Signup/>}/>
      <Route element={<Profile/>}>
      <Route path='/Profile' element={<PrivateRoute/>}/>
      </Route>
     
     </Routes>
    </BrowserRouter>
  )
}
