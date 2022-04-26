import React from 'react'
import { RoomProvider } from './context/room.context'
import { Root } from './route/root'

export const App = () => {
  
  return (
    <RoomProvider>
      <Root />
    </RoomProvider>
  )
}