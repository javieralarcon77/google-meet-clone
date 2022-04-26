import React, {useEffect, useRef, useContext} from 'react'
import { RoomContext } from '../../context/room.context'

export const ParticipantLocal = ({ track = undefined }) => {
  const videoContainer = useRef(null)
  const { room } = useContext(RoomContext)

  useEffect(()=>{
    if(track) {
      if (videoContainer.current.childElementCount !== 1)
        videoContainer.current.appendChild(track.attach())
    }
  }, [track])

  const handleVideo = () => {
    room.localParticipant.videoTracks.forEach(publication => {
      if (publication.track.isStopped) publication.track.restart({ facingMode: 'environment' });      
      else publication.track.stop();
    });
  }

  return (
    <div className="participant" id="participant-local">
      <div>Yo</div>
      <div ref={videoContainer}></div>
      <button onClick={handleVideo}>CAM</button>
    </div>
  )
}