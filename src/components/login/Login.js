import React,{ useState, useContext, useEffect } from 'react'
import { RoomContext } from '../../context/room.context'

export const Login = () => {
  const [userNameInput, setUserNameInput] = useState('')
  const { submitConnect, connect, isLoading, username } = useContext(RoomContext)

  const handleSubmit = (e) => {
    e.preventDefault()
    submitConnect(userNameInput)
  }

  useEffect(()=> {
    setUserNameInput(username)
  },[username])

  return (
    <form id="form" onSubmit={handleSubmit}>
      Name: 
      <input 
        id="userNameInput" 
        value={userNameInput} 
        onChange={(e)=>{ setUserNameInput(e.target.value) }}
        placeholder="Type your username..." 
        required 
      />
      <button id="join" disabled={isLoading}>
        { connect ? 'Desconectarme' : 'Conectarme' }
      </button>
  </form>
  )
}