import React from 'react'
import { Login } from '../../components/login/Login'
import './home-screen.css';

export const HomeScreen = () => {
  return (
    <div id="container-home">
      <h1>Enter the username</h1>
      <Login />
    </div>
  )
}