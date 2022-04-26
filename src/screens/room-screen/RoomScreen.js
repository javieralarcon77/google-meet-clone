import React,{ useContext, useState, useEffect, useRef } from 'react'

import { RoomContext } from '../../context/room.context'
import { useVideoLocal } from '../../hooks/useVideoLocal'

import { ParticipantLocal } from '../../components/participant-local/ParticipantLocal'
import { Participant } from '../../components/participant/Participant'

import './room-screen.css';

export const RoomScreen = () => {
  const { track: trackLocal} = useVideoLocal()
  const { submitConnect, participants, room } = useContext(RoomContext)
  const [trackSelect, setTrackSelect] = useState({username: 'local', track: undefined})
  const videoContainer = useRef(null)

  useEffect(()=> {
    if(trackSelect.track) {
      const container = videoContainer.current
      container.childNodes.forEach(child => { container.removeChild(child) })
      container.appendChild(trackSelect.track.attach())
    }
  },[trackSelect])

  useEffect(()=> {
    initialLocalTrack()
  },[trackLocal])

  const initialLocalTrack = () => {
    setTrackSelect({
      username: 'local',
      track: trackLocal,
    })
  }

  const handleVideo = () => {
    room.localParticipant.videoTracks.forEach(publication => {
      if (publication.track.isStopped) publication.track.restart({ facingMode: 'environment' });      
      else publication.track.stop();
    });
  }

  const handleAudio = () => {
    room.localParticipant.audioTracks.forEach(publication => {
      if (publication.track.isStopped) publication.track.restart({ facingMode: 'environment' });      
      else publication.track.stop();
    });
  }

  const handleDisconnect = () => {
    submitConnect()
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
        <button className="button-icon" onClick={handleAudio}>
          <img src="/icons/mic.svg" alt="icon-mic"/>
        </button>
        <button className="button-icon" onClick={handleVideo}>
          <img src="/icons/camera.svg" alt="icon-camera"/>
        </button>
        <button className="button-icon logout" onClick={handleDisconnect}>
          <img src="/icons/logout.svg" alt="icon-logout"/>
        </button>
      </div>
    </div>
  )
}