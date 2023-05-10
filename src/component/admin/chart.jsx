import React, { useState } from 'react'
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Doughnut } from "react-chartjs-2";
import {UserData } from "../../da"

export const ChartBar = () => {
    const [data,setdata] = useState({
        labels: UserData.map((data) => data.year),
        datasets: [
          {
            label: "Users Gained",
            data: UserData.map((data) => data.userGain)
        }
    ]})
    ChartJS.register(ArcElement, Tooltip, Legend);
  return <Doughnut data={data} />
}

