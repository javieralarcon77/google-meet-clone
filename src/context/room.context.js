import React, { createContext, useState, useEffect} from 'react'
import * as Video from 'twilio-video';
import { getToken } from '../services/getToken.services';

const ROOM_DEFAULT = {roomname: 'miduroom', label: 'miduroom'}

const ROOMS = [
  {roomname: 'room-estudio', label: 'Estudio'},
  {roomname: 'room-juegos', label: 'Juegos'},
  {roomname: 'room-manga', label: 'Manga'},
  {roomname: 'room-panchito', label: 'Los 5 de panchito'},
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
  const [trackLocal, setTrackLocal] = useState(null)

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
    
    const token = await getToken({ username, roomname: roomTemp.roomname })
    if (token ){ 
      await connectWithToken(token)
      localStorage.setItem('username', username)
      localStorage.setItem('token', token)
      setRoomData(roomTemp)
    }

    setIsLoading(false)
  } 

  const connectWithToken = async (token) => {
    const newRoom = await Video.connect(token)
    setConnect(true)
    setRoom(newRoom)
  }

  const connectWithLocal = async (token) => {
    setIsLoading(true)
    const newRoom = await Video.connect(token)
    setConnect(true)
    setRoom(newRoom)
    setUsername(localStorage.getItem('username'))

    const { name } = newRoom

    const roomTemp = roomList.find(room => room.roomname === name)
    if (roomTemp) setRoomData(roomTemp)
    else setRoomData({ roomname: name, label: name })
    setIsLoading(false)
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
    trackLocal.mediaStreamTrack.stop()
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
        setTrackLocal,
      }}
    >{children}</RoomContext.Provider>
  )
}