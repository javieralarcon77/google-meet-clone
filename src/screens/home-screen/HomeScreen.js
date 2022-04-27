import React from 'react'
import { Login } from '../../components/login/Login'
import { Room } from '../../components/room/Room';
import './home-screen.css';

export const HomeScreen = () => {
  return (
    <div id="container-home">
      <h1>Enter the username</h1>
      <Login />
      <Room />
    </div>
  )
}