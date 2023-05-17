import React, { useEffect, useState } from 'react'

export const AdminLogin = () => {

    const ADMIN_PASSWORD = 'admin1232023';
    const [password,setpassword] = useState('')
    
    const handleClick = () => {

        if(password !== ADMIN_PASSWORD){
            return
        }else if(password === ADMIN_PASSWORD){
            localStorage.setItem("AdminStatus",true)
        }
        location.reload()
    }


  return (
    <div className='flex flex-col h-screen justify-center items-center'>
        <p className='text-red-400 mb-5'>Please insert your password to go Admin Dashboard</p>
        <label for='password'>Password</label>
        <input type='text' value={password} onChange={(e)=>setpassword(e.target.value)} className='mb-3 shadow appearance-none border border-blue-400 rounded py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'/>
        <button onClick={handleClick} className='bg-blue-300 px-2 py-1 rounded'>Log In</button>
    </div>
  )
}
