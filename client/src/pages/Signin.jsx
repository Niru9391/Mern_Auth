import React, { useState } from 'react'
import Oath from '../Components/Oath.jsx'
import { Link, useNavigate} from 'react-router-dom'
const  signin=()=> {
  const [Data,setData]=useState({});
  const [error,seterror]=useState(false)
  const [loading,setloading]=useState(false) 
  const navigate= useNavigate();
  const handleOnchange =(e)=>{
   setData({...Data,[e.target.id]:e.target.value})
  
  }
  const handleSubmit = async (e)=>{
    e.preventDefault();
    try{
      setloading(true);
      seterror(false)
      const res = await fetch('/api/auth/signin/',{
        method:'POST',
        headers:{
          'Content-Type':'application/json'
        },
        body:JSON.stringify(Data)
      })
      const data =  await res.json();
      setloading(false)
      if(data.succes===false){
        seterror(true)
        return;

      }
      navigate('/');
      

    }
    catch(error){
      setloading(false)
      seterror(true)


    }
 

  }

  return (
    <div className='p-3 max-w-lg mx-auto'>
      <h1 className="text-center text-3xl font-semibold my-7">Sign in</h1>
      <form className='flex flex-col gap-4' onSubmit={handleSubmit}>
        <input type="text" placeholder='Email' id='email' className='bg-slate-100 p-3 rounded-lg'  onChange={handleOnchange}/>
        <input type="password" placeholder='password' id='password' className='bg-slate-100 p-3 rounded-lg'  onChange={handleOnchange}/>
       <button disabled={loading} className='bg-slate-700 text-white p-3 rounded-lg uppercase hover:opacity-95 disabled:opacity-80'>{loading?'loading....':'Sign In'}</button>
       <Oath/>

      </form>
      <div className=" flex gap-2 mt-5">
        <p>Dont Have an account?</p>
        <Link to='/signup'>
        <span className='text-blue-500'>Sign up</span>
        </Link>
      </div>
      <p className='text-red-700 mt-5'>{error && 'Something went run'}</p>
    </div>
  )
}
export default signin