import React from 'react'
import { GoogleAuthProvider,getAuth,signInWithPopup } from 'firebase/auth';
import {app} from '../firebase'
export default function Oath() {
    const handleGooglelink= async ()=>{
        try{
           // console.log("mai to click hua");
           const provider =new GoogleAuthProvider()
           const auth = getAuth(app); 
           const result = await signInWithPopup(auth,provider)
           const res=await fetch('/api/auth/google',{
            method:'POST',
            headers:{
              'Content-Type':'application/json'
            },
            body:JSON.stringify({
              name:result.user.displayName,
              email:result.user.email,
              photo:result.user.photoURL
            })
           })
           
           //   console.log(result)
           const data= await res.json();

        }
        catch(error){
            console.log(error);

        }
        
    }
  return (
    <button type='button' onClick={handleGooglelink} className='bg-red-700 text-white p-3 rounded-lg uppercase hover:opacity-95 disabled:opacity-80'>
      Continue with google.
    </button>
  )
}
