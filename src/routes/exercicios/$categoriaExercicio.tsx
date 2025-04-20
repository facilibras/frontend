import { createFileRoute } from '@tanstack/react-router'
import { Button } from '../../components/ui/button';
import { Camera } from '../../utils/camera';
import { Hand } from 'lucide-react';
import { alfabeto } from '../../lib/alfabeto';
import Layout from '../../components/Layout';
import { useState } from 'react';
import { verifyExpiration,jwtDecodeToken } from '../../utils/token';

export const Route = createFileRoute('/exercicios/$categoriaExercicio')({
  component: RouteComponent,
  loader: ()=>{
    const token = localStorage.getItem('token')
    if (token) {
      const user = jwtDecodeToken(token)
      if (verifyExpiration(user?.exp)){
        console.log('expirado')
        localStorage.removeItem('token')
      }
    }
  }

})

function RouteComponent() {

  const { categoriaExercicio } = Route.useParams()
  const params = alfabeto.filter((letras) => letras.id == parseInt(categoriaExercicio))

  const [switchToCamera, setSwitchToCamera] = useState(false)

  const camera = new Camera();

  return <Layout children={
    <div className='w-full flex justify-center items-center flex-col'>

      {switchToCamera ? CameraComponent(params, camera, setSwitchToCamera) : tutorialComponent(params, setSwitchToCamera)}
    </div>
  } />

}

function CameraComponent(params: any, camera: any, setSwitchToCamera:(change:boolean)=>void) {

  return (
    <div className='bg-blue-300 rounded-xl w-[70%] m-auto p-2'>
      <div className='flex justify-center w-full relative'>
        <div className='absolute top-1 z-10 h-12 w-full flex border-2 border-black rounded'>
          <div className='flex justify-center items-center w-2/3'>
            <p className='font-bold'>{params[0].param.letra}</p>
          </div>

          <div className=''>
            <button className='text-white flex gap-2'
              onClick={()=>setSwitchToCamera(false)}>
              {params[0].param.titulo}
              <Hand></Hand>
            </button>

          </div>
        </div>

        <video className='lg:w-[680px] transform scale-x-[-1]' id='video'></video>
      </div>
      <div className='flex justify-center items-center'>
        <button
          className='text-white'
          onClick={() => camera.getStream('video')}> Iniciar Aula
        </button>
      </div>
    </div>
  )
}

function tutorialComponent(params:any, setSwitchToCamera: (change: boolean) => void) {
  return (
    <div className='w-2/3 bg-gray-200 rounded-3xl'>
      <div className='text-center font-bold'>
        <p> Exercicio: {params[0].param.titulo}</p>
        <p> Dificuldade: {params[0].param.dificuldade}</p>
      </div>

      <div className='w-full flex justify-center items-center flex-col'>
        <p className='text-2xl'>Veja um Tutorial de como deve ser realizado o movimento</p>
        <iframe
          src={`https://drive.google.com/file/d/${params[0].param.idGesto}/preview`}
          allow="autoplay"
          className='w-2/3 h-[480px] rounded-3xl shadow-2xl'
        ></iframe>
        <div className='w-full'>
          <p className='text-2xl text-center'>Agora é sua vez de fazer o movimento</p>
          <Button onClick={()=>setSwitchToCamera(true)}> Iniciar Captura </Button>
        </div>
      </div>
    </div>
  );
}
