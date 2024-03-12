import React from 'react'
import { useSelector } from 'react-redux'

export default function Profile() {
  const {currentUser}=useSelector((state)=>state.user)
  console.log(currentUser);
  return (
    <div>
      <h1 className='text-center text-3xl font-semibold'>
        Profile
      </h1>
      <form>
        <img src={currentUser.profilePicture}  alt='profile' />
      </form>
      
          </div>
  )
}
