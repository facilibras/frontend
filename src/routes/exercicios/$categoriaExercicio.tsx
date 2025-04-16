import { createFileRoute } from '@tanstack/react-router'
import { Camera } from '../../utils/camera';
import { Hand } from 'lucide-react';

export const Route = createFileRoute('/exercicios/$categoriaExercicio')({
  component: RouteComponent,

})

interface categoriaExercicioProps {
  letra: string,
  idGesto: string,
  titulo: string,
}

function RouteComponent() {

  const params:categoriaExercicioProps = Route.useParams()

  const camera = new Camera();

  let responseexample = {
    "tema_exercicio": "Dias do Mês",
    'dificuldade': "Fácil",
    "exercicio": {
      "exercício_1": {
        "palavra": "janeiro",
        "link_para_demonstracao": "https://linkdemostracaogesto.com", //onde vai estar a demonstração gesto
        "rota_de_verificacao": "/verificar/exercicios/dias_do_mes" // Ou alguma forma de verificar o gesto
      },
      "exercício_2": {
        "palavra": "fevereiro",
        "link_para_demonstracao": "https://linkdemostracaogesto.com",
        "rota_de_verificacao": "/verificar/exercicios/dias_do_mes"
      },
      "exercício_3": {
        "palavra": "março",
        "link_para_demonstracao": "https://linkdemostracaogesto.com",
        "rota_de_verificacao": "/verificar/exercicios/dias_do_mes"
      }
    }
  }



  return <div className='w-full h-screen m-auto'>


    <iframe
      src={`https://drive.google.com/file/d/${params.idGesto}/preview`}
      width="640"
      height="480"
      allow="autoplay"
    ></iframe>

    <div className='text-center font-bold'>
      <p > Exercicio: {params.titulo}</p>
      <p> Dificuldade: {responseexample.dificuldade}</p>
    </div>

    <div className='bg-blue-300 rounded-xl w-[70%] m-auto p-2'>
      <div className='flex justify-center w-full relative'>
        <div className='absolute top-1 z-10 h-12 w-full flex border-2 border-black rounded'>
          <div className='flex justify-center items-center w-2/3'>
            <p className='font-bold'>{responseexample.tema_exercicio}</p>
          </div>

          <div className=''>
            <button className='text-white flex gap-2'>
              {responseexample.exercicio.exercício_1.palavra}
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
  </div>

}

