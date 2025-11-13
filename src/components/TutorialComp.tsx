import { Button } from "./ui/button";
import { exercicio } from "../const/exercicios.const";
import { AlertCircleIcon } from 'lucide-react'


interface tutorialCompProps {
  exercicio: exercicio,
  setSwitchToCamera: (change: boolean) => void
}

export default function TutorialComp({ exercicio, setSwitchToCamera }: tutorialCompProps) {
  const title = exercicio.titulo.split("_").join(" ")

  return (
    <div className='mt-10 w-3/4 bg-neutral-200 rounded-3xl shadow-2xl p-5 flex flex-col gap-5'>
      
      <div className="flex items-center justify-center relative">
        <div className='text-center font-bold'>
          <p className='text-2xl capitalize'> exercicio: {title}</p>
        </div>

        <div className="absolute right-5 cursor-pointer">
          <AlertCircleIcon />
        </div>
      </div>

      <p className='text-2xl text-center'>Veja um Tutorial de como deve ser realizado o movimento</p>

      <div className='w-full flex justify-center items-center'>
        <iframe
          src={exercicio.palavras[0].video}
          allow="autoplay"
          className='lg:aspect-video aspect-square lg:h-[420px] sm:h-[320px] rounded-3xl shadow-2xl'
        >
        </iframe>

      </div>

      <div className='flex flex-col gap-4 justify-center items-center'>
          <p className='text-xl text-center'>Agora é sua vez de fazer o movimento</p>

          <Button onClick={() => setSwitchToCamera(true)} className="w-fit"> Iniciar exercício </Button>
        </div>
    </div>
  );
}