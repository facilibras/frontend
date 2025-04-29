import { createFileRoute } from '@tanstack/react-router'
import TutorialComp from '../../components/TutorialComp';
import CameraComponent from '../../components/CameraComp';
import { Camera } from '../../utils/camera';
import { backendConnection } from '../../utils/axios';
import Layout from '../../components/Layout';
import { useState, useEffect } from 'react';
import { exercicio } from '../../const/exercicios.const';

export const Route = createFileRoute('/exercicios/$categoriaExercicio')({
  component: RouteComponent,
})


function RouteComponent() {

  const { categoriaExercicio } = Route.useParams()

  const [exercicio, setExercicio] = useState<exercicio>({
    descricao: '',
    palavras: [
      {palavra: '', video: ''}
    ],
    prox_tarefa: '',
    secao: '',
    status: null,
    titulo: ''

  })

  async function getExercicios() {

    const getexercicios = await backendConnection.useAxiosConnection({
      method: 'GET',
      path: `/exercicios/${categoriaExercicio}`,
    })

    if (getexercicios) {
      setExercicio(getexercicios)
    }
  }

  useEffect(() => {
    getExercicios()
  }, [])


  const [switchToCamera, setSwitchToCamera] = useState(false)

  const camera = new Camera();

  return <Layout>
    <div className='w-full flex justify-center items-center flex-col'>
      {
        switchToCamera
          ? <CameraComponent exercicio={exercicio} camera={camera} setSwitchToCamera={setSwitchToCamera} />
          : <TutorialComp exercicio={exercicio} setSwitchToCamera={setSwitchToCamera} />
      }
    </div>
  </Layout>

}




