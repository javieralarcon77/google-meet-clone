import React,{useState,useContext} from 'react'
import { RoomContext } from '../../context/room.context'

export const Login = () => {
  const [username, setUsername] = useState('')
  const { submitConnect, connect, isLoading } = useContext(RoomContext)

  const handleSubmit = (e) => {
    e.preventDefault()
    submitConnect(username)
  }

  return (
    <form id="form" onSubmit={handleSubmit}>
      Name: <input id="username" value={username} onChange={(e)=>{ setUsername(e.target.value) }} placeholder="Type your username..." required />
      <button id="join" disabled={isLoading}>{ connect ? 'Desconectarme' : 'Conectarme' }</button>
  </form>
  )
}