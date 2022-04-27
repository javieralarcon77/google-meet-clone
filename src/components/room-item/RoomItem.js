import React, { useState, useEffect  } from 'react'
import { getCountParticipant } from '../../services/getCountParticipant'
import { SpinnerLoading } from '../spinner-loading/SpinnerLoading'

export const RoomItem = ({ room , onClickRoom }) => {
  const { roomname, label } = room
  const [count, setCount] = useState(0)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(()=> {
    getCountParticipant({roomname})
      .then((value) => {
        setCount(value)
      })
      .finally(()=> setIsLoading(false))

  }, [room])

  return (
    <li 
      onClick={() => onClickRoom(room)}
      className="room-item"
    >
      <div className="room-label">
        <span>{label}</span>
        <span>{ isLoading ? <SpinnerLoading width="15px" height="15px"/> : count }</span>
      </div>
    </li>
  )
}