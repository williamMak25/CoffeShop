import React, { useEffect, useState } from 'react'
import { useData } from '../../../State_Management/context'
import {FiArrowRight, FiMinus, FiPlus} from 'react-icons/fi'
import { NavLink } from 'react-router-dom';
import { TiArrowBack } from 'react-icons/ti';
import { BiBlock } from 'react-icons/bi'
import {Skeleton} from '@mui/material';


export const Products = () => {
    const {products,drink,reduceitem,additem} = useData();
    const [filterBar,setfilterBar] = useState('all');
    const [filerItems,setFilerItems] = useState();
    const [isLoading,setIsLoading] = useState(true);
    let storage = JSON.parse(localStorage.getItem('cartItem'));

    const handleClicK = (id,item) =>{
     additem(id,item)
    }
    const handelReduce = (id,item) => {
      reduceitem(id,item)
    }
    console.log(filterBar)

   useEffect( ()=>{

    setTimeout(() => {
      setIsLoading(false)
    }, 4000);
    
    if(filterBar === "bakery"){
      let bakerytemp = products?.filter( item => item.category === "bakery");
      setFilerItems(bakerytemp)
    }else if(filterBar === "drink"){
      let drinktemp = products?.filter( item => item.category === "drink");
       setFilerItems(drinktemp)
    }else{
      let allItemsTemp = products
      setFilerItems(allItemsTemp)
    } 
      
    },[filterBar])

  return (
  <div className='bg-slate-700'>
    <div className='text-white bg-slate-700'>
      <NavLink to='/' className='absolute top-2 left-2'><TiArrowBack className='text-white text-5xl'/></NavLink>
      <p className='text-center text-5xl p-3 '>Brew Box Menu</p>

      <div className='flex flex-row justify-between items-center'> 
        <div className='flex flex-row justify-center items-center ml-3'>
          <li className={`list-none px-3 cursor-pointer ${filterBar === null ? 'bg-amber-700' : 'bg-slate-700'} rounded-tl-lg border`} onClick={()=>setfilterBar("all")}>All</li>
          <li className={`list-none px-3 cursor-pointer ${filterBar === true ? 'bg-amber-700' : 'bg-slate-700'} border`} onClick={()=>setfilterBar("bakery")}>Bakery</li>
          <li className={`list-none px-3 cursor-pointer ${filterBar === false ? 'bg-amber-700' : 'bg-slate-700'} rounded-tr-lg border`} onClick={()=>setfilterBar("drink")}>Drink</li>
        </div>
        <NavLink to='/orderCart'><p className='mr-5 text-md'>Your Cart<FiArrowRight className='inline'/></p></NavLink>
      </div>
      
    </div>
    
    <div className='grid grid-cols-4 gap-2 justify-items-center p-2 bg-slate-700 text-white p-3 max-md:grid-cols-3 max-sm:grid-cols-2'>
    
   
        {filerItems && filerItems?.map( item => {
          return(
            
          <div key={item?.id} className={filterBar || filterBar === null ?'w-full rounded-tr-3xl' : 'hidden'}>

            {isLoading ?  <Skeleton variant="rectangular"  height={215} sx={{ borderTopRightRadius:'24px' }} /> :
            <>
              <img src={item?.url} className='rounded-tr-3xl'  style={{width:'346px',height:'215px'}}/>
              <div className='w-full flex flex-row justify-between items-center bg-white text-black max-lg:flex-col'>

                <p className='p-2 text-xs '>{item?.name} - <span className='text-green-700'>$ {item?.price}</span></p>

                {item?.available ? 
                <div className='  flex flex-row'>
                  <button className='p-2' onClick={()=>handelReduce(item?.id,item)}><FiMinus/></button>
                  <p className='pt-1'>{storage?.find( check => check.id === item?.id)?.itemQ ? storage?.find( check => check.id === item?.id)?.itemQ : 0}</p>
                  <button className='p-2 ' onClick={()=>handleClicK(item?.id,item)}><FiPlus /></button>
                </div> : 
                <p className='p-2 text-red-500 text-xs'><BiBlock className='inline mb-1'/> Out of Stock</p>}

              </div>
            </>}

          </div>)})}

        
    </div>

</div>
  )
}
