import { useEffect, useState } from "react";

import { useNavigate } from "react-router-dom";


export const useFun = () =>{
const [timerCheck,setTimerCheck] = useState(null);
const navigate = useNavigate();

const [remainingTime, setRemainingTime] = useState(null);

  useEffect(() => {
    if (remainingTime === 0) {
      setTimerCheck(true)
    } else if (remainingTime) {
      const timeout = setTimeout(() => {
        setRemainingTime(prevTime => prevTime - 1);
        
      }, 1000);
      setTimerCheck(false);
      return () => clearTimeout(timeout);
    }
  }, [remainingTime]);

  function startTimer() {
    setRemainingTime((1 * 60)/2); 
  }

const minutes = Math.floor((remainingTime || 0) / 60);
const seconds = (remainingTime || 0) % 60;

return {startTimer,minutes,seconds,timerCheck,setTimerCheck};
}