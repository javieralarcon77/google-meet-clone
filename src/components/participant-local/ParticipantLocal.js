import React, {useEffect, useRef, useState} from 'react'

export const ParticipantLocal = ({ track = undefined, onSelectTrack, userSelect = '' }) => {
  const videoContainer = useRef(null)
  const [showVideo, setShowVideo] = useState(false)

  useEffect(()=>{
    if(track) {
      setShowVideo(true)
      if (videoContainer.current.childElementCount !== 1)
        videoContainer.current.appendChild(track.attach())

      track.on('stopped', () => setShowVideo(false))
      track.on('started', () => setShowVideo(true))
    }
  }, [track])

  const handleSelect = () => {
    if(typeof onSelectTrack === 'function') onSelectTrack({track, username: 'local'})
  }

  return (
    <div className={"participant " + (userSelect === 'local' ? 'select' : '' ) } id="participant-local" onClick={handleSelect}>
      <div ref={videoContainer} style={{display: showVideo ? 'block' : 'none'}}></div>
      {!showVideo && <div className='user-icon'><div><img src="/icons/user.svg"/></div></div>}
      <div className="username">Yo</div>
    </div>
  )
}