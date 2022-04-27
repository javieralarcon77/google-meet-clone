import React, { useContext } from 'react'

import { RoomContext } from '../../context/room.context'
import { RoomItem } from '../room-item/RoomItem'

import './room.css'

export const Room = () => {

  const { username, roomList, submitConnectRoom } = useContext(RoomContext)

  const handleClickRoom = (room) => {
    submitConnectRoom(room)
  }

  if (username === '') return <></>

  return (
    <div className="card" id="card-rooms">
      <h1>Salas</h1>
      <ul className="rooms">
        {roomList.map(room => 
          <RoomItem key={`room-${room.roomname}`} room={room} onClickRoom={handleClickRoom} />
        )}
      </ul>
    </div>
  )
}