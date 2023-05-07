import { signOut } from 'firebase/auth'
import React from 'react'
import { NavLink } from 'react-router-dom'
import { auth } from '../firebase/firebase'
import { GoSignOut } from 'react-icons/go'

export const ResponsiveNavbar = ({toggle,setToggle,currentUser}) => {
  return (
        <nav className='w-screen h-full h-16 flex flex-col justify-between items-center backdrop-blur-md text-cyan-800 '>
        <div className='flex flex-col h-screen items-center justify-center w-full'>

          <NavLink to='/products'><li className='list-none mx-5 my-5 bg-white px-2 rounded-xl'>Menu</li></NavLink>

          {!currentUser ? <li className='list-none mx-5 my-5 cursor-pointer bg-white px-2 rounded-xl' onClick={()=>setToggle(toggle ? false : true)}>LogIn/Signup</li>:
            <NavLink to='/profile'><li className='list-none mx-5 my-5 bg-white px-2 rounded-xl'>Profile</li></NavLink>}

          <NavLink to='/about'><li className='list-none mx-5 my-5 bg-white px-2 rounded-xl'>About Us</li></NavLink>
          {currentUser ? <button onClick={()=>signOut(auth)} className='list-none mx-5 my-5 bg-white px-2 rounded-xl'>SignOut <GoSignOut className='inline'/></button>
          : null} 

        </div>

       </nav>
  )
}
