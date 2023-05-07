import React from 'react'
import { useData } from '../../State_Management/context';
import '../App.css'

export const LoginedHomePage = () => {

    const {products} = useData();


  return (
    <div className='backdrop-blur-sm h-screen max-sm:h-full'>
    <div className='flex flex-row justify-around p-10 h-full max-lg:flex-col-reverse max-xl:items-center max-sm:p-0 max-sm:justify-center max-sm:items-center'>
    
        <img src='https://i.ibb.co/BKkMm0J/chef.png' className='w-96 h-96 mt-10 max-sm:hidden'/>
        <div>
            <p className='text-3xl text-zinc-700 text-center my-3'>Today Special</p>
            <div className='grid grid-cols-3 gap-4 max-sm:grid-cols-2 max-sm:gap-2 max-sm:p-2'>
            {products?.filter( item => item.category === "bakery").slice(1,7).map( items =>{
                return(
                    <div className='flex flex-col justify-center items-center'>
                        <img src={items?.url} className='w-52 h-44 rounded-3xl shadow-xl shadow-zinc-800  max-sm:shadow-md'/>
                        <p className='text-white mt-2 max-sm:text-black'>{items?.name}</p>
                    </div>
                )
            })}
            </div>
        </div> 
    </div>
    </div>
  )
}
