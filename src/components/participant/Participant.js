import React, {useEffect, useRef, useState} from 'react'

export const Participant = ({ participant,onSelectTrack, userSelect = '' }) => {
  const videoContainer = useRef(null)
  const [showVideo, setShowVideo] = useState(false)

  const  attachTrack = (track) => {
    if (videoContainer.current.childElementCount !== 2){
      if (track.kind === 'video'){
        setShowVideo(true)
        track.mediaStreamTrack.onmute = () => setShowVideo(false)
        track.mediaStreamTrack.onunmute = () => setShowVideo(true)
      }
      videoContainer.current.appendChild(track.attach())
    }
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

  const handleSelect = () => {
    if(typeof onSelectTrack === 'function'){
      let trackTemp 
      participant.videoTracks.forEach(track => {
        trackTemp = track.track
      })
      onSelectTrack({ track:trackTemp, username: participant.identity })
    }
  }

  return (
    <div className={"participant " + (userSelect === participant.identity ? 'select' : '' ) } onClick={handleSelect}>
      <div ref={videoContainer} style={{display: showVideo ? 'block' : 'none'}}></div>
      {!showVideo && <div className='user-icon'><div><img src="/icons/user.svg"/></div></div>}
      <div className="username">{participant.identity}</div>
    </div>
  )
}