import { createFileRoute } from '@tanstack/react-router'
import { Camera } from '../../utils/camera'
import { useEffect } from 'react'

export const Route = createFileRoute('/tests/camera')({
  component: RouteComponent,
})


function RouteComponent() {
  
  const camera = new Camera()

  useEffect(() => {
    camera.listDevices('select-camera')
  }, [])

  return <div>

    <h1> Hello "/tests/camera"! </h1>

    <div>
      <h2>Camera</h2>
      <select id="select-camera" onChange={(e)=> camera.setDeviceSelection(e.target.value)}></select>

      <button onClick={() => camera.getStream('video')}>Start Camera</button>
      <video id='video'></video>
    </div>
  </div>
}
