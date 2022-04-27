import React,{ useContext, useState, useEffect, useRef } from 'react'

import { RoomContext } from '../../context/room.context'
import { useVideoLocal } from '../../hooks/useVideoLocal'

import { ParticipantLocal } from '../../components/participant-local/ParticipantLocal'
import { Participant } from '../../components/participant/Participant'
import { Hour } from '../../components/hour/Hour'

import './room-screen.css';

export const RoomScreen = () => {
  const videoContainer = useRef(null)
  const { disconnectRoom, participants, roomData: { label }  } = useContext(RoomContext)
  const { track: trackLocal, handleAudio, handleVideo, mediaStatus} = useVideoLocal()

  const [trackSelect, setTrackSelect] = useState({username: 'local', track: undefined})

  useEffect(()=> {
    const track = trackSelect.track
    if(track) {
      const container = videoContainer.current
      container.childNodes.forEach(child => { container.removeChild(child) })
      container.appendChild(track.attach())
    }
  },[trackSelect])

  useEffect(()=> {
    setTrackSelect({
      username: 'local',
      track: trackLocal,
    })
  },[trackLocal])

  const handleDisconnect = () => {
    disconnectRoom()
  }

  const handleSelect = (track) => {
    
    setTrackSelect(track)
  }

  return (
    <div id="container-room">
      <div id="video-principal">
        <div ref={videoContainer}></div>
      </div>
      <div id='container-participant'>
        <ParticipantLocal track={trackLocal} userSelect={trackSelect.username} onSelectTrack={handleSelect}/>
        {
          participants.map((participant) => 
            <Participant 
              participant={participant} 
              userSelect={trackSelect.username}
              onSelectTrack={handleSelect}
              key={participant.sid} 
            />
          )
        }
      </div>
      <div className="controls">
        <Hour />
        <div className="buttons">
          <button className={`button-icon ${mediaStatus.audio ? '' : 'disabled'}`} onClick={handleAudio}>
            {
              mediaStatus.audio
              ? <img src="/icons/mic.svg" alt="icon-mic"/>
              : <img src="/icons/mic-mute.svg" alt="icon-mic"/>
            }
          </button>
          <button className={`button-icon ${mediaStatus.video ? '' : 'disabled'}`} onClick={handleVideo}>
            {
              mediaStatus.video
              ? <img src="/icons/camera.svg" alt="icon-camera"/>
              : <img src="/icons/camera-off.svg" alt="icon-camera"/>
            }
          </button>
          <button className="button-icon logout" onClick={handleDisconnect}>
            <img src="/icons/logout.svg" alt="icon-logout"/>
          </button>
        </div>
        <div className="room-name">
          {`(${participants.length + 1}) ${label}`}
        </div>
      </div>
    </div>
  )
}