import React, { createContext, useState, useEffect} from 'react'
import * as Video from 'twilio-video';

const ROOM_DEFAULT = {roomname: 'miduroom', label: 'miduroom'}

const ROOMS = [
  {roomname: 'room-estudio', label: 'Estudio'},
  {roomname: 'room-juegos', label: 'Juegos'},
  {roomname: 'room-manga', label: 'Manga'},
]

export const RoomContext = createContext({
  connect: false,
  isLoading: false,
  username: undefined,
  roomname: undefined,
  roomList: ROOMS,
  participants: [],
})

export const RoomProvider = ({children}) => {
  const [username, setUsername] = useState('')
  const roomList = ROOMS
  
  const [isLoading, setIsLoading] = useState(false)
  const [connect, setConnect] = useState(false)
  const [room, setRoom] = useState(null)
  const [roomData, setRoomData] = useState(ROOM_DEFAULT)
  const [participants, setParticipants] = useState([])

  useEffect(()=>{
    if (room){
      room.participants.forEach(participantConnected)
      room.on('participantConnected', participantConnected)
      room.on('participantDisconnected', participantDisconnected)
    }
  }, [room])

  useEffect(()=> {
    const tokenLocal = localStorage.getItem('token')
    if (tokenLocal) connectWithLocal(tokenLocal)
  }, [])

  const submitConnect = async (user) => {
    setUsername(username !== '' ? '' : user) 
  }

  const submitConnectRoom = async (roomTemp) => {
    connectRoom({username, roomTemp})
  }
  
  const connectRoom = async ({username, roomTemp}) => {
    setIsLoading(true)    
    try {
      const url = process.env.NODE_ENV === 'development' ? 'http://localhost:4200' : ''
      const response = await fetch( url + '/get_token', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({username, roomname: roomTemp.roomname})
      })
    
      const data = await response.json()
      await connectWithToken(data.token)
      localStorage.setItem('username', username)
      localStorage.setItem('token', data.token)
      setRoomData(roomTemp)

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

  const connectWithLocal = async (token) => {
    const newRoom = await Video.connect(token)
    setConnect(true)
    setRoom(newRoom)
    setUsername(localStorage.getItem('username'))

    const { name } = newRoom

    const roomTemp = roomList.find(room => room.roomname === name)
    if (roomTemp) setRoomData(roomTemp)
    else setRoomData({ roomname: name, label: name })
  }

  const participantConnected = (participant)=> { 
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

  const camOff = () => {
    const video = document.querySelector('#participant-local video')
    video.pause()
    video.srcObject.getTracks()[0].stop()

    room.localParticipant.videoTracks.forEach(publication => {
      publication.unpublish();
      publication.track.stop();
    });
  }

  const disconnectRoom = async () => {
    camOff()
    room.disconnect()
    localStorage.removeItem('token')
    setRoom(null)
    setConnect(false)
    setRoomData({ roomname: '', label: '' })
    setParticipants([])
  }

  return ( 
    <RoomContext.Provider 
      value={{
        username, 
        roomList,
        isLoading,
        connect, 
        room,
        roomData,
        participants,
        submitConnect,
        submitConnectRoom,
        disconnectRoom,
      }}
    >{children}</RoomContext.Provider>
  )
}