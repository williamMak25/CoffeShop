import React, { useState } from 'react'
import { Chart as ChartJS,LineElement, PointElement, LinearScale, CategoryScale, scales,
} from "chart.js";
import { Line} from "react-chartjs-2";
import { useData } from '../../../State_Management/context';


export const ChartBar = () => {
  const {userOrderHistory} = useData()  
  ChartJS.register(LineElement,PointElement, LinearScale, CategoryScale);
    const data = {
      
      labels: userOrderHistory?.map((data) => data?.order_time),
      
      datasets: [
        {
          label: 'Daily income',
          data: userOrderHistory?.map((data) => data?.total_price),
          backgroundColor: 'aqua',
          borderColor: 'black',
          }
  ]}

   
  return(
    <div className='p-2 bg-white border border-white border-2 h-fit w-[900px] mx-2 shadow-lg'>
      <p className='text-xl mb-2 p-2 text-yellow-400 shadow-lg'>Daily Income</p>
      <Line data={data}/>
    </div>
  )
}

