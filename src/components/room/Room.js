import React, { useContext } from 'react'
import { RoomContext } from '../../context/room.context'

export const Room = () => {

  const { username, roomList, submitConnectRoom } = useContext(RoomContext)

  const handleClickRoom = (room) => {
    submitConnectRoom(room)
  }

  if (username === '') return <></>

  return (
    <div className="card">
      <h1>Salas</h1>
      <ul className="rooms">
        {roomList.map(room => (
          <li 
            key={`room-${room.roomname}`} 
            onClick={() => handleClickRoom(room)}
            className="room-item"
          >
            <div>{room.label}</div>
          </li>
        ))}
      </ul>
    </div>
  )
}