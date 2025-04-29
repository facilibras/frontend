import { Button } from "./ui/button";
import { exercicio } from "../const/exercicios.const";


interface tutorialCompProps {
  exercicio: exercicio,
  setSwitchToCamera: (change: boolean) => void
}

export default function TutorialComp({ exercicio, setSwitchToCamera }: tutorialCompProps) {

  return (
    <div className='w-3/4 bg-gray-200 rounded-3xl'>
      <div className='text-center font-bold'>
        <p className='text-2xl'> Exercicio: {exercicio.titulo}</p>
        <p> Dificuldade: {exercicio.titulo}</p>
      </div>



      <div className='w-full flex justify-center items-center'>
        <div>
          <p className='text-2xl text-center'>Veja um Tutorial de como deve ser realizado o movimento</p>
          <iframe
            src={exercicio.palavras[0].video}
            allow="autoplay"
            className='w-full lg:h-[520px] sm:h-[320px] rounded-3xl shadow-2xl'
          ></iframe>
          <div className='flex flex-col justify-center'>
            <p className='text-xl text-center'>Agora é sua vez de fazer o movimento</p>
            <Button onClick={() => setSwitchToCamera(true)}> Iniciar Captura </Button>
          </div>
        </div>
      </div>

    </div>
  );
}