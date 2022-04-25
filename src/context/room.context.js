import React, { createContext, useState, useEffect} from 'react'
import * as Video from 'twilio-video';

export const RoomContext = createContext({
  connect: false,
  isLoading: false,
  username: undefined,
  participants: [],
})

export const RoomProvider = ({children}) => {
  const [connect, setConnect] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [username, setUsername] = useState('')
  const [participants, setParticipants] = useState([])

  const [room, setRoom] = useState(null)

  useEffect(()=>{
    if (room){
      room.participants.forEach(participantConnected)
      room.on('participantConnected', participantConnected)
      room.on('participantDisconnected', participantDisconnected)
    }
  }, [room])

  const submitConnect = async (username) => {
    if (connect) disconnectRoom()
    else connectRoom(username)
  }
  
  const connectRoom = async (username) => {
    setIsLoading(true)    
    try {
      const url = process.env.NODE_ENV === 'development' ? 'http://localhost:4200' : ''
      const response = await fetch( url + '/get_token', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({username})
      })
    
      const data = await response.json()
      await connectWithToken(data.token)
      setUsername(username)

    } catch (e) {
      console.log(e)
    }
    setIsLoading(false)
  } 

  const connectWithToken = async (token) => {
    const newRoom = await Video.connect(token)
    setConnect(true)
    setRoom(newRoom)
  }

  const participantConnected = (participant)=> { 
    console.log('conectado', participant)
    setParticipants(prev => {
      return [...prev, participant]
    })
  }

  const participantDisconnected = (participant) => {
    setParticipants(prev => {
      const temp = prev.filter(p => p.sid !== participant.sid)
      return [...temp]
    })
  }

  const disconnectRoom = () => {
    room.disconnect()
    setRoom(null)
    setConnect(false)
    setParticipants([])
  }

  return ( 
    <RoomContext.Provider 
      value={{
        connect, 
        isLoading,
        username, 
        participants,
        submitConnect,
      }}
    >{children}</RoomContext.Provider>
  )
}