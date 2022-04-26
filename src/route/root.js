import React, { useContext } from 'react'
import { Routes, Route, Link } from "react-router-dom";
import { RoomContext } from '../context/room.context';
import { HomeScreen } from '../screens/home-screen/HomeScreen';
import { RoomScreen } from '../screens/room-screen/RoomScreen';

export const Root = () => {
  const { connect } = useContext(RoomContext)

  return (
    <Routes>
      <Route path="/" element={connect ? <RoomScreen /> : <HomeScreen />} />
    </Routes>
  )
}