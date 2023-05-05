import React, { useEffect, useState } from 'react'
import '../App.css'
import { NavLink } from 'react-router-dom'
import { useData } from '../../State_Management/context'
import { Login } from './auth/login'
import { useFun } from '../../State_Management/customHooks'
import { signOut } from 'firebase/auth'
import { auth } from '../firebase/firebase'
import {GoSignOut} from 'react-icons/go'

export const LandingPage = () => {
  const {currentUser} = useData()
  const [toggle,setToggle] = useState(false)

const handleClick = () =>{
  if(!toggle){
    setToggle(true);
    document.body.style.overflow = 'hidden';
  }else{
    setToggle(!toggle);
    document.body.style.overflow = 'visible';
  }
}

  return (
    <>
    <div className='text-white font-bold h-screen w-full font-serif bgPhoto'>

       <nav className=' w-full h-16 flex flex-row justify-between items-center bg-cyan-700 sticky top-0 z-20'>
        <p className='text-3xl mx-5'>Brew Box</p>
        <div className='flex flex-row'>
          <NavLink to='/products'><li className='list-none mx-5'>Menu</li></NavLink>
          {!currentUser ? <li className='list-none mx-5 cursor-pointer' onClick={handleClick}>LogIn/Signup</li>:
            <NavLink to='/profile'><li className='list-none mx-5'>Profile</li></NavLink>}
          <NavLink to='/about'><li className='list-none mx-5'>About Us</li></NavLink>
          {currentUser ? <button onClick={()=>signOut(auth)} className='list-none mx-5'>SignOut <GoSignOut className='inline'/></button>
          : null} 
          
        </div>
       </nav>

        {toggle ? <Login/> : null}

       <div className='flex flex-col justify-center items-start mt-10 text-cyan-800 mx-5'>
        <p className='text-5xl m-1 text-center text-cyan-800'>Have you drunk your coffee today?</p>
        <p className='text-3xl w-80 mt-9 mx-2'>Hello, wellcome from our place and make you way better. </p>
        <NavLink to={currentUser ? '/products' : '/login'}><button className='my-2 bg-cyan-800 text-white p-2 w-80 rounded-xl'>Let's Go !</button></NavLink>
        
       </div>
      
    </div>
      <div className='font-serif flex flex-row justify-center items-center h-screen'> 

        <p className='w-72 mx-12 text-center text-cyan-700'>At Brew we strive to make everything we do part of a holistically thought and substainable experience.
          From the products we brings you and where they come from,to our staff, to our relationship with our patrons and the community,
           we believe in creating a place that is like a second home.
          </p>

        <div className='flex flex-row items-center opacity-60'>
          <img src='https://i.ibb.co/02j3PKP/coffee-beans-1.png' className='w-16 mx-5'/>
          <img src='https://i.ibb.co/CmLGNkF/pistachio.png' className='w-16 mx-5'/>
          <img src='https://i.ibb.co/BcG8VhM/coffee.png' className='w-16 mx-5'/>
        </div>
        <p className=' w-64 text-lg text-center text-cyan-700 bg-white p-2 rounded-br-full mt-5 mx-10'>Coffee is our soul.
          Focusing on the minute; being meticulous over every detail.
          Everything we do is considered ti give an unparalleled experience of simplicity with substance.</p>
      </div>

      <p className='text-cyan-700 m-10 mt-5 text-xl font-serif text-center'>A cup of coffee lasts only a moment, but it is that moment that makes your day better.</p>
    </>
  )
}
