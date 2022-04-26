import React, {useEffect, useRef} from 'react'

export const ParticipantLocal = ({ track = undefined, onSelectTrack, userSelect = '' }) => {
  const videoContainer = useRef(null)

  useEffect(()=>{
    if(track) {
      if (videoContainer.current.childElementCount !== 1)
        videoContainer.current.appendChild(track.attach())
    }
  }, [track])

  const handleSelect = () => {
    if(typeof onSelectTrack === 'function') onSelectTrack({track, username: 'local'})
  }

  return (
    <div className={"participant " + (userSelect === 'local' ? 'select' : '' ) } id="participant-local" onClick={handleSelect}>
      <div ref={videoContainer}></div>
      <div className="username">Yo</div>
    </div>
  )
}