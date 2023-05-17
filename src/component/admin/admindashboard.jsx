import React, { useEffect, useState } from 'react'
import { useData } from '../../../State_Management/context';
import {BiDotsVertical} from 'react-icons/bi'
import '../../App.css'
import { ChartBar } from './chart';
import { FoodAdding } from './foodAdding';
import {RxCross1} from 'react-icons/rx';
import {ImStarFull} from 'react-icons/im'
import { EditProducts } from './EditProducts';
import { AdminLogin } from './AdminLogin';

export const Admindashboard = () => {
    const [orders,setOrders] = useState();
    const {products,userData} = useData();
    const [orderDetail,setorderDetail] = useState(null);
    const [orderDetailCheck,setorderDetailCheck] = useState(false);
    const [openMenuId, setOpenMenuId] = useState(null);
    const [addFoodBar,setAddFoodBar] = useState(false);
    const [specifyProduct,setSpecifyProduct] = useState()
    const [allorederOriginalPrice,setAllorderOriginalPrice] = useState()
     
    let soldprice = 0
    for (let i = 0; i < orders?.length; i++) {
         soldprice += orders[i].total_price;
        
    }
   
    useEffect(()=>{
        fetch('http://localhost:3004/order')
        .then( res => {return res.json()})
        .then( data => setOrders(data))

//......setting original price for all sold items........//
        
        let temp = [];

        orders?.map( order => {

            order?.ordered_items.forEach(element => {
                let findItemPrice = products?.filter( ite => ite.name === element)
                console.log(findItemPrice)
                temp.push(findItemPrice.map(ite => ite.original_price))
            });   
        })
        let secTemp = []
        temp?.forEach( originalprice => {
            console.log(parseInt(originalprice))
            secTemp.push(parseInt(originalprice))
            setAllorderOriginalPrice(secTemp)
        })
        let originalprice = 0
        for (let i = 0; i < secTemp?.length; i++) {
            
            originalprice += secTemp[i];  
        }
        console.log(originalprice)
        setAllorderOriginalPrice(originalprice)

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
    const stockChange = async(id,value) =>{

        await fetch(`http://localhost:3004/food/${id}`,{
            method: 'PATCH',
            headers: {'Content-Type': 'application/json'},
            body:JSON.stringify({"available": value})
        }).then(res => {
            console.log(res.status)
        }).catch( err => err.message )
    }
    const handleDelete = (id) => {
        fetch(`http://localhost:3004/food/${id}`, {
        method: 'DELETE',
        })
        .then(response => {
            if (response.ok) {
            console.log('User deleted successfully');
            } else {
            console.error('Error deleting user');
            }
        })
.catch(error => console.error(error));
    }
    console.log(allorederOriginalPrice)
  return (
    <>
    <div className='w-full h-full bg-slate-200 text-zinc-700 p-2 flex flex-row justify-center'>

        <div className='bg-slate-200 flex flex-col'>
            <div className='p-5 w-fit'>   
                <p className=' text-3xl px-4 text-center mb-1'>Total Sell - <span className='text-green-500'>{soldprice} $</span></p>
                <p className='text-yellow-700 text-center mb-2'><ImStarFull className='inline mb-1'/> Revenue- <span className='text-green-500'>{(soldprice - allorederOriginalPrice)} $</span></p>
                <p className=' bg-white px-4 py-2 text-center rounded-full text-yellow-400 shadow-md'> SubscribedUser : {userData?.length}</p>
            </div>
            <ChartBar/>
        </div>

        <div className='flex flex-col items-end'>

        <div className='w-[370px] shadow-lg relative h-fit shadow-lg bg-white border-zinc-800 border-1'>
            
            <p className='p-2 pb-1 text-3xl text-yellow-400 shadow-lg'>Order List</p>

            <div className='h-[280px] overflow-y-auto scorll p-2 text-zinc-800 border-t'>

                {orders?.map( item => {   
                return(
                    <div className={orderDetail?.id === item?.id ? `p-2 border-b bg-slate-300 cursor-pointer`:'p-2 border-b hover:bg-slate-300 cursor-pointer'} key={item.id} onClick={()=>handleShowDetail(item.id,orderDetailCheck)}>   
                        <p>ID : {item?.order_id}</p>
                        <p className='text-blue-900'>{item?.order_time}</p>
                    </div>)})}
            </div>

            { orderDetail && <div className='absolute top-20 right-72 bg-white text-dark ml-2 p-3 w-full rounded text-sm shadow-lg border z-40 ' key={orderDetail.id}>
                <span className='float-right cursor-pointer' 
                onClick={()=>{
                setorderDetailCheck(false)
                setorderDetail()}}><RxCross1/></span>
                <p className='text-lg text-yellow-500 mb-1'>ORDER DETAIL</p>
                <p>Customer Email : {orderDetail?.customer_email}</p>
                <p className=''>Order ID : {orderDetail?.order_id}</p>
                <p className='mb-1'>Date : {orderDetail?.order_time}</p>
                <p className='text-yellow-500'>Order foods</p>
                {orderDetail?.ordered_items?.map( food => {
                    return( <li>{food}</li> ) })}
                <p className='mt-1 '>Total : <span className='text-green-600'>{orderDetail?.total_price} $</span></p>
            </div>}
           
        </div>
        
            
        <div className='h-fit shadow-lg bg-white text-black mt-3'>
        
            <div className='flex flex-row justify-between items-center p-2 border-b shadow-lg'>
                <p className='text-2xl px-2 text-yellow-400'>Foods</p>
                <button className='bg-yellow-400 px-2 rounded mt-2' onClick={()=>setAddFoodBar(!addFoodBar)}>Add New Food</button>
            </div>
            {addFoodBar && <FoodAdding addFoodBar={addFoodBar} setAddFoodBar={setAddFoodBar}/>}
            <div className='flex flex-nowrap overflow-auto w-[370px] p-2 foodScroll'>
                
                {products && products.map( ite => {
                const isOpen = ite.id === openMenuId;

                return(
                <div>
                {specifyProduct === ite?.id && <EditProducts setSpecifyProduct={setSpecifyProduct} imgUrl={ite?.url} name={ite?.name} originalPrice={ite?.original_price} sellPrice={ite?.price} available={ite?.available} foodId={specifyProduct} category={ite?.category}/>}
                <div key={ite.id} className='relative w-40 m-2 flex-shrink-0 px-2 hover:bg-zinc-300 hover:rounded flex flex-col justify-center items-start'>
                    
                    <BiDotsVertical className='z-20 absolute top-5 right-2 text-white text-xl cursor-pointer' onClick={() => handleEditClick(ite.id)}/>
                    
                    {isOpen && <div className='text-black flex flex-col bg-white absolute z-20 right-6 top-7 rounded p-2'>
                                    <button onClick={()=>setSpecifyProduct(ite?.id)}>Edit</button>
                                    <button className='border-t' onClick={()=>handleDelete(ite.id)}>Remove</button>
                                </div>}

                    <img src={ite?.url} className='w-40 rounded-lg opacity-80 mb-2'/>
                    <p className='text-yellow-400 text-sm'>{ite?.name}</p>
                    <p className='text-sm'>Original Price : {ite?.original_price}</p>
                    <p className='text-sm'>Sell Price : {ite?.price}</p>

                    {ite?.available ? <p className='text-sm'>Available : Yes </p> 
                                    : <p className='text-sm'>Available : No </p>}

                    {ite?.available ? <button onClick={()=>stockChange(ite?.id,false)} className='border border-yellow-400 px-2 rounded-xl mt-2'>Change Stock</button>
                                    : <button onClick={()=>stockChange(ite?.id,true)} className='border border-yellow-400 px-2 rounded-xl mt-2'>Change Stock</button> }
                            
                </div> 
                </div>)}
                )}
                
            </div>    
        </div>

        </div>

      
      
    </div>
    
    </>
  )
}
