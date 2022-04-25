import React from 'react'
import { RoomProvider } from './context/room.context'
import { RoomScreen } from './screens/RoomScreen'

export const App = () => {
  
  return (
    <RoomProvider>
      <RoomScreen />
    </RoomProvider>
  )
}