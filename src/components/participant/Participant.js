import React, {useEffect, useRef} from 'react'

export const Participant = ({ participant }) => {
  const videoContainer = useRef(null)

  const  attachTrack = (track) => {
    videoContainer.current.appendChild(track.attach())
  }

  useEffect(()=>{
    if (participant){
      participant.tracks.forEach(localTrackPublication => {
        const {isSubscribed, track} = localTrackPublication
        if (isSubscribed) attachTrack(track)
      })
    
      participant.on('trackSubscribed', attachTrack)
      participant.on('trackUnsubscribed', track => track.detach())
    }
  }, [participant])

  return (
    <div className="participant">
      <div>{participant.identity}</div>
      <div ref={videoContainer}></div>
    </div>
  )
}