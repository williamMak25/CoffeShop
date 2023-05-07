import React, { useEffect, useState } from 'react'
import { useData } from '../../../State_Management/context'
import {BsReceiptCutoff} from 'react-icons/bs'
import {TiArrowBack} from 'react-icons/ti'
import { NavLink } from 'react-router-dom'
import '../../App.css';


export const Profile = () => {
  const {userData,userOrderHistory,currentUser} = useData();
  const [userProfile,setUserProfile] = useState();

  console.log(userProfile)

  useEffect( ()=> {
    let temp = userData?.find( user => user.email === currentUser.email);
    setUserProfile(temp);
    
  },[userData,userOrderHistory])

  return (
    <div className='flex flex-row max-lg:flex-col'>
      <NavLink to='/products' className='absolute left-2 top-2 lg:hidden'><TiArrowBack className='text-4xl'/></NavLink>
      <div className='w-1/5 h-screen flex flex-col items-center pt-5 border-e-2 shadow max-lg:h-full max-lg:w-full animation_bar '>
     
        <img src='https://i.ibb.co/gSX1KGx/profile.png' className='w-1/2 m-2'/>
        <p className='text-lg'>{userProfile?.firstname + " " + userProfile?.lastname}</p>
        <p className='text-xs text-center text-zinc-400'><span className='text-zinc-800'>User ID</span> : {userProfile?.id}</p>
        <p className='text-sm text-center text-zinc-400'><span className='text-zinc-800'>Email</span> : {userProfile?.email}</p>
        <p className='text-sm text-center text-zinc-400'><span className='text-zinc-800'>Address : </span>{userProfile?.address}, {userProfile?.city}, {userProfile?.country}</p>
      
      </div>
      
      <div className='w-full h-screen'>
        <div className='flex flex-row bg-cyan-700 relative justify-center'>
          <NavLink to='/products' className='absolute left-2 top-2 max-lg:hidden'><TiArrowBack className='text-white text-4xl'/></NavLink>
          <p className='text-5xl text-center p-2 text-white'>Order History <BsReceiptCutoff className='inline text-4xl mb-2'/></p>
        </div>
        
        {userOrderHistory ? 
        <table className='table-fixed text-center w-full'>
          <thead className='bg-amber-600 h-10 text-white text-xl border-t border-b'>
            <tr>
              <td>Date</td>
              <td>Items</td>
              <td>Price</td>
            </tr>
          </thead>
          <tbody className=''>
          {userOrderHistory?.map( ite => {
          return(
           
              <tr className='border-b h-12 p-5'>
                <td className='text-yellow-700 text-sm'>{ite?.order_time.split(",")[0]}<p>{ite?.order_time.split(",")[1]}</p></td>
                <td className='bg-green-300'>{ite?.ordered_items.toString()}</td>
                <td >$ {ite?.total_price}</td>
              </tr>
           
          )
        })} 
        </tbody>
        </table>
        : null}
      </div>
    </div>
  )
}
