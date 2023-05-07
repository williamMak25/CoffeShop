import React, { useEffect, useState } from 'react'
import '../App.css'
import { NavLink } from 'react-router-dom'
import { useData } from '../../State_Management/context'
import { Login } from './auth/login'
import { useFun } from '../../State_Management/customHooks'
import { signOut } from 'firebase/auth'
import { auth } from '../firebase/firebase'
import {GoSignOut} from 'react-icons/go'
import { LoginedHomePage } from './loginedHomePage'
import { ResponsiveNavbar } from './ResponsiveNavbar'
import {HiOutlineMenuAlt1} from 'react-icons/hi'

export const LandingPage = () => {
  const {currentUser} = useData()
  const [toggle,setToggle] = useState(false);
  const [menutoggle,setMenutoggle] = useState(false)
  console.log(menutoggle)
const handleClick = () =>{
  if(!toggle){
    setToggle(true);
    document.body.style.overflow = 'hidden';
  }else{
    setToggle(!toggle);
    document.body.style.overflow = 'visible';
  }
}
const handleMenuBar = () =>{
  if(!menutoggle){
    setMenutoggle(true);
    document.body.style.overflow = 'hidden';
  }else{
    setMenutoggle(!menutoggle);
    document.body.style.overflow = 'visible';
  }
}
  return (
    <>
    <div className='text-white font-bold h-screen w-full font-serif bgPhoto max-sm:h-ful'>

       <nav className='w-full h-16 flex flex-row justify-between items-center bg-cyan-700 sticky top-0 z-20 max-md:text-xs max-sm:hidden'>
        <p className='text-3xl mx-5 max-md:text-xs max-md:mx-1'>Brew Box</p>
        <div className='flex flex-row '>
          <NavLink to='/products'><li className='list-none mx-5 max-md:mx-2'>Menu</li></NavLink>
          {!currentUser ? <li className='list-none mx-5 cursor-pointer max-md:mx-2' onClick={handleClick}>LogIn/Signup</li>:
            <NavLink to='/profile'><li className='list-none mx-5 max-md:mx-2'>Profile</li></NavLink>}
          <NavLink to='/about'><li className='list-none mx-5 max-md:mx-2'>About Us</li></NavLink>
          {currentUser ? <button onClick={()=>signOut(auth)} className='list-none mx-5 max-md:mx-2'>SignOut <GoSignOut className='inline'/></button>
          : null} 
          
        </div>
       </nav>
       {(window.screen.width <= 768) ? 
        <div className='absolute z-20 top-2'>
          <div className='flex flex-row text-black text-5xl'>
            <HiOutlineMenuAlt1 onClick={handleMenuBar}/>
            <p className='ml-10'>Brew Box</p>
          </div>
          {menutoggle ? <ResponsiveNavbar toggle={toggle} setToggle={setToggle} currentUser={currentUser}/> : null}
        </div> : null}
        

        {toggle ? <Login/> : null}
      { currentUser ? <LoginedHomePage/> : 
       <div className='flex flex-col justify-center items-start mt-10 text-cyan-800 mx-5 max-sm:mx-0 max-sm:h-full max-sm:mt-2 max-sm:items-center'>
        <p className='text-5xl m-1 text-center text-cyan-800'>Have you drunk your coffee today?</p>
        <p className='text-3xl w-80 mt-9 mx-2 max-sm:w-auto max-sm:text-center'>Hello, wellcome from our place and make you way better. </p>
        <NavLink to='/login'><button className='my-2 bg-cyan-800 text-white p-2 w-80 rounded-xl max-md:w-40'>Let's Go !</button></NavLink>  
       </div>}
      
    </div>
      <div className='font-serif flex flex-row justify-center items-center h-screen max-lg:flex-col max-sm:justify-around max-l:h-full'> 

        <p className='w-72 mx-12 text-center text-cyan-700 max-sm:mx-5'>At Brew we strive to make everything we do part of a holistically thought and substainable experience.
          From the products we brings you and where they come from,to our staff, to our relationship with our patrons and the community,
           we believe in creating a place that is like a second home.
          </p>

        <div className='flex flex-row items-center opacity-60'>
          <img src='https://i.ibb.co/02j3PKP/coffee-beans-1.png' className='w-16 mx-5 max-sm:mx-2'/>
          <img src='https://i.ibb.co/CmLGNkF/pistachio.png' className='w-16 mx-5 max-sm:mx-2'/>
          <img src='https://i.ibb.co/BcG8VhM/coffee.png' className='w-16 mx-5 max-sm:mx-2'/>
        </div>
        <p className='w-64 text-lg text-center text-cyan-700 bg-white p-2 rounded-br-full mt-5 mx-10 max-sm:mx-5'>Coffee is our soul.
          Focusing on the minute; being meticulous over every detail.
          Everything we do is considered ti give an unparalleled experience of simplicity with substance.</p>
      </div>

      <p className='text-cyan-700 m-10 mt-5 text-xl font-serif text-center max-lg:mt-2 max-sm:m-5'>A cup of coffee lasts only a moment, but it is that moment that makes your day better.</p>
    </>
  )
}

