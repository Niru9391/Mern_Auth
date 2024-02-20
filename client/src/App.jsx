import React from 'react'
import {BrowserRouter,Routes,Route} from 'react-router-dom'
import Home from './pages/Home'
import Signin from './pages/Signin'
import Profile from './pages/Profile'
import Signup from './pages/Signup'
import About from './About'
export default function App() {
  return (
    <BrowserRouter>
     <Routes>
      <Route path='/' element={<Home/>}/>
      <Route path='/Profile' element={<Profile/>}/>
      <Route path='/About' element={<About/>}/>
      <Route path='/Signin' element={<Signin/>}/>
      <Route path='/Signup' element={<Signup/>}/>
     
     </Routes>
    </BrowserRouter>
  )
}
