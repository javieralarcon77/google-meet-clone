import React,{useContext} from 'react'

import { RoomContext } from '../context/room.context'
import { useVideoLocal } from '../hooks/useVideoLocal'

import { Login } from '../components/login/Login'
import { ParticipantLocal } from '../components/participant-local/ParticipantLocal'
import { Participant } from '../components/participant/Participant'

export const RoomScreen = () => {
  const { track: trackLocal} = useVideoLocal()
  const { connect, participants } = useContext(RoomContext)

  return (
    <div>
      <div>
        <h1>Hola mundo!!!</h1>
        <p>Status: {connect ? 'Conectado' : 'Desconectado'}</p>
        <p>Count {participants.length}</p>
        <Login />
      </div>
      <div id='container'>
        <ParticipantLocal track={trackLocal}/>
        {
          participants.map((participant) => <Participant participant={participant} key={participant.sid} />)
        }
      </div>
    </div>
  )
}