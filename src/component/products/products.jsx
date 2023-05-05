import React, { useEffect, useState } from 'react'
import { useData } from '../../../State_Management/context'
import {FiArrowRight, FiMinus, FiPlus} from 'react-icons/fi'
import { NavLink } from 'react-router-dom';
import { TiArrowBack } from 'react-icons/ti';
import Skeleton, { SkeletonTheme } from 'react-loading-skeleton';
import { LoadingScreen } from '../loadingScreen';

export const Products = () => {
    const {products,drink,reduceitem,additem} = useData();
    const [filterBar,setfilterBar] = useState(null)
    const [isLoading,setIsLoading] = useState(true);
    let storage = JSON.parse(localStorage.getItem('cartItem'));

    const handleClicK = (id,item) =>{
     additem(id,item)
    }
    const handelReduce = (id,item) => {
      reduceitem(id,item)
    }
    useEffect( ()=>{
      setTimeout(() => {
        setIsLoading(false)
      }, 4000);
    },[])
  return (
    <div className='bg-cyan-700'>
    <div className='text-white bg-cyan-700'>
      <NavLink to='/' className='absolute'><TiArrowBack className='text-white text-5xl'/></NavLink>
      <p className='text-center text-5xl p-3 '>Brew Box Menu</p>

      <div className='flex flex-row justify-between items-center'> 
        <div className='flex flex-row justify-center items-center ml-3'>
          <li className={`list-none px-3 cursor-pointer ${filterBar === null ? 'bg-amber-700' : 'bg-cyan-700'} rounded-tl-lg border`} onClick={()=>setfilterBar(null)}>All</li>
          <li className={`list-none px-3 cursor-pointer ${filterBar === true ? 'bg-amber-700' : 'bg-cyan-700'} border`} onClick={()=>setfilterBar(true)}>Bakery</li>
          <li className={`list-none px-3 cursor-pointer ${filterBar === false ? 'bg-amber-700' : 'bg-cyan-700'} rounded-tr-lg border`} onClick={()=>setfilterBar(false)}>Drink</li>
        </div>
        <NavLink to='/orderCart'><p className='mr-5 text-md'>Your Cart<FiArrowRight className='inline'/></p></NavLink>
      </div>
      
    </div>
    {isLoading ? <LoadingScreen/> :
    <div className='grid grid-cols-4 gap-2 justify-items-center p-2 bg-cyan-700 text-white p-3 '>
        {products && products?.map( item => {
          return(
           
            <div key={item?.id} className={filterBar || filterBar === null ?'w-full border border-white rounded-tr-3xl' : 'hidden'}>
             
              <img src={item?.url} className='rounded-tr-3xl'/>
              <div className='w-full flex flex-row justify-between bg-white text-black'>

                <p className='p-2 text-xs '>{item?.name} - <span className='text-green-700'>$ {item?.price}</span></p>
                <div className='  flex flex-row'>
                  <button className='p-2' onClick={()=>handelReduce(item?.id,item)}><FiMinus/></button>
                  <p className='pt-1'>{storage?.find( check => check.id === item?.id)?.itemQ ? storage?.find( check => check.id === item?.id)?.itemQ : 0}</p>
                  <button className='p-2 ' onClick={()=>handleClicK(item?.id,item)}><FiPlus /></button>
                </div>
              </div>

            </div>  
          )
        })}
        {drink?.map( dri => {
          return(
            <div key={dri?.id} className={!filterBar || filterBar === null ?'w-full border border-white rounded-tr-3xl': 'hidden'}>
              <img src='https://i.ibb.co/CBksGvG/close-up-delicious-cup-coffee-jpg.png' className='rounded-tr-3xl'/>
              <div className='w-full flex flex-row justify-between bg-white text-black'>
                <p className='p-2 text-xs '>{dri?.name} - <span className='text-green-700'>$ {dri?.price}</span></p>
                <div className='flex flex-row '>
                  <button className='p-2' onClick={()=>handelReduce(dri?.id,dri)}><FiMinus/></button>
                  <p className='pt-1'>{storage?.find( check => check.id === dri?.id)?.itemQ ? storage?.find( check => check.id === dri?.id)?.itemQ : 0}</p>
                  <button className='p-2 ' onClick={()=>handleClicK(dri?.id,dri)}><FiPlus /></button>
                </div>
              </div>
            </div>
          )
        })}
    </div>
}
    </div>
  )
}
