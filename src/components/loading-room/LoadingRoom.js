import React from 'react'

import { SpinnerLoading } from '../spinner-loading/SpinnerLoading'

import './loading-room.css'

export const LoadingRoom = () => {
  return (
    <div className="loading-room">
      <SpinnerLoading width='40px' height='40px'/>
      <h3>Cargando Sala...</h3>
    </div>
  )
}