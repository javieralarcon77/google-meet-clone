import React, {useEffect, useRef} from 'react'

export const ParticipantLocal = ({ track = undefined }) => {
  const videoContainer = useRef(null)

  useEffect(()=>{
    if(track) {
      videoContainer.current.appendChild(track.attach())
    }
  }, [track])

  return (
    <div className="participant">
      <div>Yo</div>
      <div ref={videoContainer}></div>
    </div>
  )
}