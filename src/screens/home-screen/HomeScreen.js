import React, { useContext } from 'react'

import { RoomContext } from '../../context/room.context';

import { Login } from '../../components/login/Login'
import { Room } from '../../components/room/Room';
import { LoadingRoom } from '../../components/loading-room/LoadingRoom';

import './home-screen.css';

export const HomeScreen = () => {
  const { username, isLoading } = useContext(RoomContext)
  
  return (
    <div id="container-home">
      {!isLoading 
      ? (
        <>
          <h1>{username === '' ? 'Enter the username' : 'Welcome to VideoChat'}</h1>
          <Login />
          <Room />
        </>
      )
      : <LoadingRoom />
      }
    </div>
  )
}