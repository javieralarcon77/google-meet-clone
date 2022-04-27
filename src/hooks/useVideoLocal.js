import { useEffect,useState } from "react"
import * as Video from 'twilio-video';

export const useVideoLocal = (room) => {
  const [track, setTrack] = useState(undefined)
  const [mediaStatus, setMediaStatus] = useState({ audio: true, video: true })
  
  useEffect(()=>{
    //se crea el video local para obtener la camara y un track para la conexion
    Video.createLocalVideoTrack({ aspectRatio: 4/3 })
  },[])

  useEffect(()=> {
    if (room) {
      //console.log({room})
      //una vez obtenido el room se toma el track del participante local para obtener el id remoto del track
      const tracks = Array.from(room.localParticipant.videoTracks.values())
      setTrack(tracks[0].track)
    }
  }, [room])

  const handleVideo = () => {
    room.localParticipant.videoTracks.forEach(publication => {
      if (publication.track.isStopped) publication.track.restart({ facingMode: 'environment' });      
      else publication.track.stop();
    });
    setMediaStatus({
      ...mediaStatus,
      video: !mediaStatus.video
    })
  }

  const handleAudio = () => {
    room.localParticipant.audioTracks.forEach(publication => {
      if (publication.track.isStopped) publication.track.restart({ facingMode: 'environment' });      
      else publication.track.stop();
    });
    setMediaStatus({
      ...mediaStatus,
      audio: !mediaStatus.audio
    })
  }

  return { track, handleVideo, handleAudio, mediaStatus }
}