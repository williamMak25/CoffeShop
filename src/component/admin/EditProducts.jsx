import React, { useState } from 'react';
import {RxCross2} from 'react-icons/rx'

export const EditProducts = ({imgUrl,name,originalPrice,sellPrice,available,foodId,category,setSpecifyProduct}) => {    
    const [changeValue,setChangeValue] = useState({
    productName: name,
    url: imgUrl,
    original_price: originalPrice,
    price: sellPrice,
    category: category,
    availableValue: available,
    id: foodId
    })
    console.log(changeValue)
    const handleChange = (e) =>{
        const {name,value} = e.target;
        setChangeValue(prev =>({
            ...prev,[name]:value
        }))
    }
    const handleEdit = (id) => {
        fetch(`http://localhost:3004/food/${id}`,{
            method:"PATCH",
            headers:{'Content-Type': 'application/json'},
            body:JSON.stringify({
                "name": changeValue.productName,
                "url": changeValue.url,
                "original_price": changeValue.original_price,
                "price": changeValue.price,
                "category": changeValue.category,
                "available": available,
                "id": foodId
            })
        }).then( res => console.log(res.status))
    }
  return (
    <div className='z-50 bg-white absolute bottom-20 right-80 flex flex-col w-fit shadow shadow-lg border p-2'>

        <div className='bg-slate-400 p-2 mb-1 flex flex-row items-center justify-between'>
            <p>Edit Product</p>
            <RxCross2 onClick={()=>setSpecifyProduct(null)} className='cursor-pointer'/>
        </div>

        <div className='mb-2'>
            <label for='productName'>Product Name : </label>
            <input type='text' defaultValue={name} onChange={handleChange} name='productName' className='focus:outline-none border-slate-400 border-b-2 px-2'/>
        </div>

        <div className='mb-2'>
            <label for='url'>Image Url :  </label>
            <input type='text' defaultValue={imgUrl} onChange={handleChange} name='url' className='focus:outline-none w-fit border-slate-400 border-b-2 px-2'/>
        </div>

        <div className='mb-2'>
            <label for='original_price'>Original Price : </label>
            <input type='text' defaultValue={originalPrice} onChange={handleChange} name='original_price' className='focus:outline-none border-slate-400 border-b-2 px-2'/>
        </div>

        <div className='mb-2'>
            <label for='price'>Sell Price : </label>
            <input type='text' defaultValue={sellPrice} onChange={handleChange} name='price' className='focus:outline-none border-slate-400 border-b-2 px-2'/>
        </div>

        <div className='mb-2'>
            <label for='productName'>Category : </label>
            <select defaultValue={category} onChange={handleChange} name='category'>
                <option value='bakery'>bakery</option>
                <option value='drink'>drink</option>
            </select>
        </div>
        <button className='border-slate-400 border' onClick={()=>handleEdit(foodId)}>Save</button>
    </div>
  )
}
