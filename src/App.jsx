import './App.css'
import { Avatar, Button, Container } from '@mui/material'
import { LandingPage } from './component/LandingPage'
import { Route, Router, Routes } from 'react-router-dom'
import { Aboutus } from './component/Aboutus'
import { Context } from '../State_Management/context'
import { SignUp } from './component/auth/SignUp'
import { Login } from './component/auth/login'
import { Profile } from './component/auth/profile'
import { useEffect, useState } from 'react'
import { Products } from './component/products/products'

import { ProtectRoute } from './component/protectRoute'
import { ProfileInfo } from './component/auth/profileInfo'
import { OrderCart } from './component/products/orderCart'
import { Admindashboard } from './component/admin/admindashboard'
import { AdminLogin } from './component/admin/AdminLogin'

function App() {
  const [status,setStatus] = useState()
  useEffect(()=>{
    let statustemp = JSON.parse(localStorage.getItem('AdminStatus'));
    setStatus(statustemp)
  },[status])
 
  return (
    <Context>

      <Routes>

      <Route path='/' element={<LandingPage/>}/>
      <Route path='/about' element={<Aboutus/>}/>
      <Route path='/admin' element={ status ? <Admindashboard/> : <AdminLogin/>} />
      
      <Route element={<ProtectRoute/>}>
        <Route path='/products' element={<Products/>}/>
        <Route path='/orderCart' element={<OrderCart/>}/>
        <Route path='/profile' element={<Profile/>}/>
      </Route>      
      

        <Route path='/signup' element={<SignUp/>}/>
        <Route path='/login' element={<Login/>}/>
        <Route path='/profileinfo' element={<ProfileInfo/>}/>

      </Routes>

    </Context>
  )
}

export default App
