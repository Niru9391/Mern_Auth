import React, { useState } from 'react'
import { Link } from 'react-router-dom'
export default function Signup() {
  const [Data,setData]=useState({});
  const [error,seterror]=useState(false)
  const [loading,setloading]=useState(false)
  const handleOnchange =(e)=>{
   // console.log(e.target.value);
   setData({...Data,[e.target.id]:e.target.value})
  
  }
  const handleSubmit = async (e)=>{
    e.preventDefault();
    try{
      setloading(true);
      seterror(false)
      const res = await fetch('/api/auth/signup/',{
        method:'POST',
        headers:{
          'Content-Type':'application/json'
        },
        body:JSON.stringify(Data)
      })
      const data =  await res.json();
     console.log(data)
      setloading(false)
      if(data.succes===false){
        seterror(true)
        return;

      }
      

    }
    catch(error){
      setloading(false)
      seterror(true)


    }
 
   // console.log(data)

  }
  //console.log(Data)
  return (
    <div className='p-3 max-w-lg mx-auto'>
      <h1 className="text-center text-3xl font-semibold my-7">Signup</h1>
      <form className='flex flex-col gap-4' onSubmit={handleSubmit}>
        <input type="text" placeholder='Username' id='username' className='bg-slate-100 p-3 rounded-lg'  
        onChange={handleOnchange}
        />
        <input type="text" placeholder='Email' id='email' className='bg-slate-100 p-3 rounded-lg'  onChange={handleOnchange}/>
        <input type="password" placeholder='password' id='password' className='bg-slate-100 p-3 rounded-lg'  onChange={handleOnchange}/>
       <button disabled={loading} className='bg-slate-700 text-white p-3 rounded-lg uppercase hover:opacity-95 disabled:opacity-80'>{loading?'loading....':'Sign-up'}</button>

      </form>
      <div className=" flex gap-2 mt-5">
        <p>Have an account</p>
        <Link to='/signin'>
        <span className='text-blue-500'>Sign in</span>
        </Link>
      </div>
      <p className='text-red-700 mt-5'>{error && 'Something went run'}</p>
    </div>
  )
}
