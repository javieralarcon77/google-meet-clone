import React, {useEffect, useRef} from 'react'

export const Participant = ({ participant,onSelectTrack, userSelect = '' }) => {
  const videoContainer = useRef(null)

  const  attachTrack = (track) => {
    if (videoContainer.current.childElementCount !== 2){
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
      <div ref={videoContainer}></div>
      <div className="username">{participant.identity}</div>
    </div>
  )
}