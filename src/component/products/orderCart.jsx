import React, { useEffect, useState } from 'react'
import '../../app.css'
import { useData } from '../../../State_Management/context';
import { useFun } from '../../../State_Management/customHooks';
import {BsCart4} from 'react-icons/bs'
import {TiArrowBack} from 'react-icons/ti'
import { NavLink, useNavigate } from 'react-router-dom';

export const OrderCart = () => {
    const {updateOrder} = useData();
    const {startTimer,minutes,seconds,timerCheck} = useFun();
    const [showWaitTime,setShowWaitTime] = useState(false)
    let items = JSON.parse(localStorage.getItem('cartItem'));
    const navigate = useNavigate()
    
    let totalPrice = 0 ;
    let allitem = [];
    if(items){
        for (let i = 0; i < items.length; i++) {   
            const eachItemSumPrice = items[i].itemQ * Number(items[i].price);
            totalPrice += eachItemSumPrice;
            const itemsName = items[i].name;
            allitem.push(itemsName)      
        }
    }
    

    const handleOrder = () => {
        updateOrder(allitem,Math.floor(totalPrice));
        startTimer()
        setShowWaitTime(true)
    }
    
    const handleSuccess = () => {
        setShowWaitTime(false);
        navigate('/')
        localStorage.setItem('cartItem',JSON.stringify([]))
    }

console.log(items)

  return (
    <div className='h-screen relative'>
        <div className='absolute z-[-10] top-0 flex flex-col justify-center items-center w-full bg-zinc-700 max-md:h-screen'>
        <img src='https://i.ibb.co/xHLcrv8/Pngtree-cat-claw-coffee-logo-4363875.png' className='h-screen opacity-70 max-md:h-auto' />
        </div>
        {items.length !== 0 ? <p className='absolute left-5 text-2xl px-2 ml-1 rounded-b bg-white border orderDropAni'>Your Order</p> 
        :<NavLink to='/products'><p className='absolute text-5xl p-2 ml-1 rounded-b bg-cya-500 text-white orderDropAni'><TiArrowBack/></p></NavLink>} 
        
    {items.length !== 0 ?
    <div className='p-5'>

    <table className='table-fixed w-full text-center my-5'>
        <thead className=' text-white border-b'>
            <tr className='text-2xl h-12'>
                <td>Name</td>
                <td>Quantity</td>
                <td>Price</td>
            </tr>
        </thead>
        <tbody className='text-white'>
        {items?.map(ite =>{
            return(
                <tr className='h-10 border-b border-zinc-700'>
                    <td className=''>{ite?.name}</td>
                    <td className=''>{ite?.itemQ}</td>
                    <td className=''> $ {ite?.itemQ * Number(ite?.price) }</td>
                </tr>
            )
        })}
        </tbody>
        <tr className='h-12 text-white text-xl border-t-2'>
            <td colSpan='2' className='text-end'>Total</td>
            <td className=''>$ {Math.floor(totalPrice)}</td>
        </tr>
    </table>
    <button className='bg-cyan-500 text-lg p-2 mx-20 w-60 rounded-xl float-right max-md:float-none max-md:block max-md:mx-auto' onClick={()=>handleOrder()}>Paid and Order</button>
       {showWaitTime ? 
       <div>
        {timerCheck ?
        <div className='absolute left-20 p-3 text-white rounded-lg max-md:static'>
            <p className='text-3xl text-center text-cyan-300'>Your Order is Complete!!</p>
            <p className='text-center'> Thank You and have a great day.</p>
            <button onClick={handleSuccess} className='bg-white text-zinc-800 px-2 w-full mt-3'>ok</button>
        </div> 
        :
        <div className='inline p-5 text-white rounded-lg'>
            <span className='text-3xl text-center text-cyan-300'>Please Wait!</span>
            <span className='text-center'> Your order will finish in {minutes + ':' + seconds}</span>    
        </div>}</div> : null} 

    </div>
    : <div className='flex flex-col justify-center items-center h-4/5 mx-20 backdrop-blur-sm '>
        <p className='text-white text-5xl p-2 ml-5'>Your Cart is Empty <BsCart4 className='text-white text-5xl inline'/></p>
    </div> }
    </div>
  )
}
