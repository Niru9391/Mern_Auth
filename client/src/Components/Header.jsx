import React from 'react'
import { Link } from 'react-router-dom'
export default function Header() {
  return (
    <div className='bg-orange-500 bg-pink-500'>
    
      <div className='flex justify-between items-center max-w-6xl mx-auto p-3' >
      <Link to='/'><h1 className="font-bold">Auth APP</h1>
      </Link>
     
      <ul className='flex gap-4'>
      <Link to='/'>  <li>Home</li></Link>
      <Link to='/About'> <li>About</li></Link>
      <Link to='/Profile'> <li>Profile</li></Link>
      <Link to='/Signin'> <li>Signin</li></Link>
      <Link to='/Signup' > <li>Signup</li></Link>
      </ul>

      </div>
    </div>
  )
}
