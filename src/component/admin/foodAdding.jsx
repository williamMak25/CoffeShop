import React, { useState } from 'react'
import {getDownloadURL, getStorage,ref, uploadBytes} from 'firebase/storage'
import { app } from '../../firebase/firebase';
import {RxCross1} from 'react-icons/rx'

export const FoodAdding = ({addFoodBar,setAddFoodBar}) => {
    const [stock,setstock] = useState(true);
    const [category,setCategory] = useState('bakery');
    const [img,setimg] = useState(null)
    const [imgUrl,setImgUrl] = useState()
    const [foodDetail,setFoodDetail] = useState({
        foodname : '',
        originalprice: '',
        sellprice:''
    })
    const storage = getStorage(app)

    const handleFoodDetail = (e) => {
        const {name,value} = e.target;
        setFoodDetail( prev => ({
            ...prev,[name]:value
        }))
    }

    const handleClick = async() => {
        const imgRef = ref(storage, `foodImage/${img.name}`)
       await uploadBytes(imgRef,img).then(()=>{
            getDownloadURL(imgRef).then( url => { setImgUrl(url) })
        })
        await fetch('http://localhost:3004/food',{
            method:'POST',
            headers:{'Content-Type': 'application/json'},
            body:JSON.stringify({
                "name": foodDetail.foodname,
                "url": imgUrl,
                "original_price": foodDetail.originalprice,
                "price": foodDetail.sellprice,
                "category": category,
                "available": stock,
            })
        })
        setAddFoodBar(!addFoodBar)
    }
    console.log(imgUrl)
  return (
    <div className='absolute backdrop-blur-md left-0 top-0 w-full h-screen z-40 flex flex-col justify-center items-center overflow-y-hidden'>
    <div className='bg-white z-20 flex flex-col p-5'>
        <div className='flex flex-row justify-between items-center'>
            <p className='text-3xl mb-2'>Add New Food</p>
            <RxCross1 className='text-dark text-xl mb-2 cursor-pointer' onClick={()=>setAddFoodBar(!addFoodBar)}/>
        </div>
        
        <label className="block text-gray-700 text-sm font-bold mb-2">Food Name</label>
        <input name='foodname' onChange={handleFoodDetail} className="mb-3 shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"/>

        <label className="block text-gray-700 text-sm font-bold mb-2">Original Price</label>
        <input name='originalprice' onChange={handleFoodDetail} className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"/>

        <label className="block text-gray-700 text-sm font-bold mb-2">Sell Price</label>
        <input name='sellprice' onChange={handleFoodDetail} className="mb-3 shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"/>

        <label className="block text-gray-700 text-sm font-bold mb-2">Image</label>
        <input type='file' onChange={e => setimg(e.target.files[0])} className="mb-3 rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"/>

        <label className="block text-gray-700 text-sm font-bold mb-2">Category</label>
        <select onChange={(e)=>setCategory(e.target.value)} class="mb-3 block w-full bg-white border border-gray-400 hover:border-gray-500 px-4 py-2 pr-8 rounded shadow leading-tight focus:outline-none focus:shadow-outline">
            <option value='bakery'>bakery</option>
            <option value='drink'>drink</option>
        </select>

        <label className="block text-gray-700 text-sm font-bold mb-2">Currently stock ?</label>
        <select onChange={(e)=>setstock(e.target.value)} class="mb-3 block w-full bg-white border border-gray-400 hover:border-gray-500 px-4 py-2 pr-8 rounded shadow leading-tight focus:outline-none focus:shadow-outline">
            <option value={true} >Yes</option>
            <option value={false} >No</option>
        </select>
        

        <button onClick={handleClick} className="shadow bg-purple-500 hover:bg-purple-400 focus:shadow-outline focus:outline-none text-white font-bold py-2 px-4 rounded">Add</button>
    </div>
    </div>
  )
}
