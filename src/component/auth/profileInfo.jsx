import React, { useState } from 'react'
import country from 'country-list-js';
import { useData } from '../../../State_Management/context';
import { useNavigate } from 'react-router-dom';

export const ProfileInfo = () => {
    const [countries,setCountries] = useState(country.names());
    const navigate = useNavigate()
    const {Userinfo} = useData() 
    const [info,setInfo] = useState({
       firstname : '',
       lastname : '',
       email : '',
       country: '',
       address: '',
       city:'',
       state:'',
       post_code:'',
    })
    const handleInfo = (e) => {
        const {name,value} = e.target;
        setInfo( prev => ({
            ...prev,[name]:value
        }))
    }
    console.log(info)
   const handleClick = (status) => {
    if(!status){
        navigate('/')
        return
    }else{
        Userinfo(info)
        console.log('hello')
        navigate('/')
    }
   }
  return (
    <>
    <div className='flex flex-col justify-center items-center p-2'>

      <h2 className="text-base font-semibold leading-7 text-gray-900">Personal Information</h2>
      <p className="mt-1 text-sm leading-6 text-gray-600">Please fill your personal information</p>

      <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
        <div className="sm:col-span-3">
          <label for="first-name" className="block text-sm font-medium leading-6 text-gray-900">First name</label>
          <div className="mt-2">
            <input value={info.firstname} onChange={handleInfo} name="firstname" type="text" id="first-name" autocomplete="given-name" className="block w-full rounded-md border-0 px-2  py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"/>
          </div>
        </div>

        <div className="sm:col-span-3">
          <label for="last-name" className="block text-sm font-medium leading-6 text-gray-900">Last name</label>
          <div className="mt-2">
            <input type="text" value={info.lastname} onChange={handleInfo} name="lastname" id="last-name" autocomplete="family-name" className="block w-full rounded-md border-0 px-2 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"/>
          </div>
        </div>

        <div className="sm:col-span-4">
          <label for="email" className="block text-sm font-medium leading-6 text-gray-900">Email address</label>
          <div className="mt-2">
            <input id="email" value={info.email} onChange={handleInfo} name="email" type="email" autocomplete="email" className="block w-full rounded-md border-0 px-2 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"/>
          </div>
        </div>

        <div className="sm:col-span-3">
          <label for="country" className="block text-sm font-medium leading-6 text-gray-900">Country</label>
          <div className="mt-2">
            <select id="country" value={info.country} onChange={handleInfo} name="country" autocomplete="country-name" className="block w-full rounded-md border-0 px-2 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:max-w-xs sm:text-sm sm:leading-6">
              {countries?.map( item => {
                return  <option value={item}>{item}</option>
              })}
             
            </select>
          </div>
        </div>

        <div className="col-span-full">
          <label for="street-address" className="block text-sm font-medium leading-6 text-gray-900">Address</label>
          <div className="mt-2">
            <input type="text" value={info.address} onChange={handleInfo} name="address" id="street-address" autocomplete="street-address" className="block w-full rounded-md border-0 px-2 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"/>
          </div>
        </div>

        <div className="sm:col-span-2 sm:col-start-1">
          <label for="city" class="block text-sm font-medium leading-6 text-gray-900">City</label>
          <div className="mt-2">
            <input type="text" value={info.city} onChange={handleInfo} name="city" id="city" autocomplete="address-level2" className="block w-full rounded-md border-0 px-2 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"/>
          </div>
        </div>

        <div className="sm:col-span-2">
          <label for="region" className="block text-sm font-medium leading-6 text-gray-900">State / Province</label>
          <div className="mt-2">
            <input type="text" value={info.state} onChange={handleInfo} name="state" id="state" autocomplete="address-level1" className="block w-full rounded-md border-0 px-2 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"/>
          </div>
        </div>

        <div className="sm:col-span-2">
          <label for="postal-code" className="block text-sm font-medium leading-6 text-gray-900">ZIP / Postal code</label>
          <div className="mt-2">
            <input type="text" value={info.post_code} onChange={handleInfo} name="post_code" id="postal-code" autocomplete="postal-code" className="block w-full rounded-md border-0 px-2 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"/>
          </div>
        </div>
        <div className="mt-6 flex items-center justify-end gap-x-6">
            <button type="button" onClick={()=>handleClick(false)} className="text-sm font-semibold leading-6 text-gray-900">Cancel</button>
            <button type="submit" onClick={()=>handleClick(true)} className="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">Save</button>
        </div>
    </div>
    </div>
    </>
  )
}
