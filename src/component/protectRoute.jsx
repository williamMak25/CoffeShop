import React from 'react'
import { useData } from '../../State_Management/context'
import { Outlet } from 'react-router-dom'
import { Login } from './auth/login'

export const ProtectRoute = () => {
    const {currentUser} = useData()
  return (
   currentUser ? <Outlet/> : <Login/> 
  )
}
