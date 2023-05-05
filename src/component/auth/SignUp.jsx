import React, { useState } from 'react'
import { Toaster, toast } from 'react-hot-toast';
import { SiCoffeescript } from 'react-icons/si';
import { NavLink, useNavigate } from 'react-router-dom';
import { useData } from '../../../State_Management/context';

export const SignUp = () => {
  const [email,setEmail] = useState('');
  const [password,setPassword] = useState('');
  const [confirmPass,setConfirmPass] = useState('');
  const {register} = useData();
  const navigate = useNavigate()

  const notify = () => toast('Please fill your Info',{
    duration: 5000,
    position: 'top-center'});

  const handleSubmit = (e) =>{
      e.preventDefault()
      if(password === confirmPass){
        register(email,password)
        navigate('/profileinfo')
      }else{
        alert('Passwords not match!')
      }
  }

  return (
  <div className='absolute bg-zinc-500 bg-opacity-50 w-full h-screen backdrop backdrop-opacity z-10'>
    <Toaster/>
  <div className='w-full max-w-xs m-auto mt-20'>
    <form className='bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4 ' onSubmit={(e)=>handleSubmit(e)}>
        <p className='text-amber-700 mb-5 text-center text-xl underline'><SiCoffeescript className='inline mx-2 mb-1'/>Create Your account</p>
        
        <div className='mb-4'>
          <label for='email' className='block text-amber-700 text-sm font-bold mb-2'>Email</label>
          <input type='email' value={email} onChange={ e => setEmail( e.target.value)} className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'/>
          { email === '' ? <p class="text-red-500 text-xs italic">Please fill your email.</p> : null}
        </div>
        <div className='mb-4'>
          <label for='password' className='block text-amber-700 text-sm font-bold mb-2'>Password</label>
          <input type='password' value={password} onChange={ e => setPassword( e.target.value)} className= {`shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline ${password === '' ? 'border-red-500': '' }`}/>
          { password === '' ? <p class="text-red-500 text-xs italic">Please choose a password.</p> : null}
        </div>
        <div className='mb-4'>
          <label for='confirmPassword' className='block text-amber-700 text-sm font-bold mb-2'>Comfirm Password</label>
          <input type='password' value={confirmPass} onChange={ e => setConfirmPass( e.target.value)} className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'/>
          { confirmPass === '' ? <p class="text-red-500 text-xs italic">Please choose a password.</p> : null}
        </div>
        <button className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline'>Create account</button>
        <p className='text-gray-700 text-sm mt-2'>Already have Account? <NavLink to='/login' className='text-blue-500 underline'>Log In</NavLink> here.</p>
    </form>
  </div>
  </div>
  )
}
