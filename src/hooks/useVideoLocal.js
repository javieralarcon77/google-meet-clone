import { useEffect,useState } from "react"
import * as Video from 'twilio-video';

export const useVideoLocal = () => {
  const [track, setTrack] = useState(undefined)
  useEffect(()=>{
    Video.createLocalVideoTrack().then(trackTemp => {
      setTrack(trackTemp)
    })
  },[])

  return { track }
}