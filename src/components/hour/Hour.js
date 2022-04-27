import React, {useState, useEffect} from 'react'

export const Hour = () => {
  const [timeString, setTimeString] = useState('');

  const champ = (number) => {
    return number < 10 ? `0${number}` : number
  }

  const calculateTime = () => {
    const date = new Date()
    const timeTemp = `${champ(date.getHours())}:${champ(date.getMinutes())}`
    setTimeString(timeTemp)
  }

  useEffect(() => {
    calculateTime()
    const interval = setInterval(calculateTime, 5000)
    return () => clearInterval(interval)
  }, [])


  return (
    <div className='hours'>{timeString}</div>
  )
}