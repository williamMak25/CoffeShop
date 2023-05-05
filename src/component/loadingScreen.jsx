import React from 'react'
import {TbLoader} from 'react-icons/tb'
import {GiSloth} from 'react-icons/gi'

export const LoadingScreen = () => {
  return (
    <div className='bg-cyan-700 text-white h w-full flex flex-col justify-center items-center h-screen absolute top-0 z-[-10]'>

    <TbLoader className='text-5xl my-3 animate-spin'/>
    <p className='text-5xl'>Please Wait <GiSloth className='inline'/></p>

    </div>
  )
}
