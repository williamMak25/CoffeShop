import React, { useEffect, useState } from 'react'
import { useData } from '../../../State_Management/context';
import {BiDotsVertical} from 'react-icons/bi'
import '../../App.css'
import { ChartBar } from './chart';

export const Admindashboard = () => {
    const [orders,setOrders] = useState();
    const {products,userData} = useData()
    const [orderDetail,setorderDetail] = useState(null);
    const [orderDetailCheck,setorderDetailCheck] = useState(false);
    const [openMenuId, setOpenMenuId] = useState(null);
    /* let temp = []
        orders?.map( order => {
            console.log(order?.total_price)
            order?.ordered_items?.forEach(element => {
                let findItemPrice = products?.filter( ite => ite.name === element)
                temp.push(findItemPrice)
            });
            
        }) 
    console.log(temp) */
    
    useEffect(()=>{
        fetch('http://localhost:3004/order')
        .then( res => {return res.json()})
        .then( data => setOrders(data))
       
    },[])

    const handleShowDetail = (id,orderCheck) =>{
        if(!orderCheck){
            setorderDetailCheck(true)
            let temp = orders?.find( item => item.id === id);
            setorderDetail(temp)
        }else if(orderDetail.id !== id){
            setorderDetailCheck(true)
            console.log("hello")
            let sectemp = orders?.find( item => item.id === id);
            setorderDetail(sectemp)
        }
        else{
            setorderDetailCheck(!orderCheck);
            setorderDetail()
        }
        
    }

    const handleEditClick = (id) => {
        setOpenMenuId(id === openMenuId ? null : id);
      }

  return (
    <div className='w-full h-screen bg-violet-700 text-zinc-700 p-5 flex flex-row'>

        <div className='w-fit shadow-md relative h-fit shadow-lg'>
            
            <p className='p-2 pb-1 text-3xl bg-violet-500 text-yellow-400 shadow-md'>Order List</p>

            <div className='h-[280px] overflow-y-auto bg-violet-500 scorll p-2 text-white border-t'>

                {orders?.map( item => {   
                return(
                    <div className='p-2 border-b hover:bg-violet-600 cursor-pointer' key={item.id} onClick={()=>handleShowDetail(item.id,orderDetailCheck)}>   
                        <p>ID : {item?.order_id}</p>
                        <p className='text-blue-300'>{item?.order_time}</p>
                    </div>)})}
            </div>
            { orderDetail && <div className='absolute top-40 left-80 bg-violet-600 text-white ml-2 p-3 w-full rounded text-sm shadow-md z-40 ' key={orderDetail.id}>
                <p className='underline mb-1'>ORDER DETAIL</p>
                <p>Customer Email : {orderDetail?.customer_email}</p>
                <p className=''>Order ID : {orderDetail?.order_id}</p>
                <p className='mb-1'>Date : {orderDetail?.order_time}</p>
                <p className='underline'>Order foods</p>
                {orderDetail?.ordered_items.map( food => {
                    return( <li>{food}</li> ) })}
                <p className='mt-1 '>Total : {orderDetail?.total_price} $</p>
            </div>}
           
        </div>

        <div className='ml-5 h-fit shadow-lg'>
            <div className='flex flex-row justify-between items-center p-2 bg-violet-500 border-b'>
                <p className='text-2xl px-2 text-yellow-400'>Foods</p>
                <button className='bg-yellow-400 px-2 rounded mt-2'>Add New Food</button>
            </div>
            <div className='flex flex-nowrap bg-violet-500 overflow-auto w-[370px] p-2 foodScroll'>
            {products && products.map( ite => {
                const isOpen = ite.id === openMenuId;
                return(
                    <div key={ite.id} className='relative w-40 m-2 flex-shrink-0 px-2 hover:bg-violet-600 hover:rounded flex flex-col justify-center items-start text-white'>
                        <BiDotsVertical className='z-20 absolute top-4 right-2 text-white text-xl cursor-pointer' onClick={() => handleEditClick(ite.id)}/>

                        {isOpen && <div className='text-black flex flex-col bg-white absolute z-20 right-6 top-7 rounded p-2'>
                            <button>Edit</button>
                            <button className='border-t'>Remove</button>
                        </div>}

                        <img src={ite?.url} className='w-40 rounded-lg opacity-80'/>
                        <p className='text-yellow-400 text-lg'>{ite?.name}</p>
                        <p>Original Price : {ite?.original_price}</p>
                        <p>Sell Price : {ite?.price}</p>
                        { ite?.available ? <p>Out of Stock : NO </p> : <p>Out of Stock : Yes </p>}
                    </div>
                )
            })}
            </div>    
        </div>
        <div className='ml-5'>
            <p className='text-3xl bg-violet-500 px-3 rounded-full text-yellow-400 shadow-md'> SubscribedUser : {userData?.length}</p>
            <ChartBar/>
        </div>
    </div>
  )
}
