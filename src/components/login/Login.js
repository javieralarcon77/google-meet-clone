import React,{ useState, useContext, useEffect } from 'react'
import { RoomContext } from '../../context/room.context'

import './login.css'

export const Login = () => {
  const [userNameInput, setUserNameInput] = useState('')
  const { submitConnect, isLoading, username } = useContext(RoomContext)

  const handleSubmit = (e) => {
    e.preventDefault()
    submitConnect(userNameInput)
  }

  useEffect(()=> {
    setUserNameInput(username)
  },[username])

  return (
    <div className="card">
      <form id="form" onSubmit={handleSubmit}>
        <div className='input-group'>
          <label>UserName</label>  
          <input 
            disabled={username !== ''}
            id="userNameInput" 
            value={userNameInput} 
            onChange={(e)=>{ setUserNameInput(e.target.value) }}
            placeholder="Type your username..." 
            required 
          />
        </div>
        {isLoading && <div>Loading...</div>}
        <button className="login-button" id="join" disabled={isLoading}>
          { username !== '' ? 'Desconectarme' : 'Conectarme' }
        </button>
      </form>
    </div>
  )
}