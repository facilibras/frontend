import { Hand } from "lucide-react"
import { Button } from "./ui/button"
import { exercicio } from "../const/exercicios.const"
import { Camera } from "../utils/camera"
import { useEffect, useState } from "react"
import { backendConnection } from "../utils/axios"
import { toast } from "react-toastify"

interface CameraCompProps {
  exercicio: exercicio,
  setSwitchToCamera?: (change: boolean) => void,
  camera: Camera

}

export default function CameraComponent({ exercicio, camera, setSwitchToCamera }: CameraCompProps) {

  const [countdown, setCountdown] = useState<number>(0);
  const [Mensagem, setMensagem] = useState(exercicio.titulo)
  const [video, setVideo] = useState<FormData | null>(null)
  const [isRecording, setIsRecording] = useState(false);

  const uploadVideo = async () => {

    console.log
    if (!video) return;

    try {
      const response = await backendConnection.useAxiosConnection({
        method: 'POST',
        path: '/exercicios',
        dataValues: video,
        subpath: `${exercicio.titulo}/reconhecer/`,
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      if (response.data.sucesso) {
        console.log(response.data);
        toast.success(response.data.mensagem)
      } else {

        toast.error("Sinal Não reconhecido")
      }
    } catch (error) {
      console.error('Erro na requisição de upload:', error);
    }
  };

  useEffect(() => {
    console.log(video)
    uploadVideo();
  }, [video]);

  const startCountdown = async (tempoGravacao: number) => {
    setIsRecording(true);

    const videoElement = document.getElementById("video") as HTMLVideoElement;

    if (!videoElement) {
      console.error("Video element not found!");
      return;
    }

    camera.getStream("video"); // Iniciar Camera

    videoElement.onloadedmetadata = () => {
      videoElement.play();

      setCountdown(5);
      const contageminicial = setInterval(() => {
        setMensagem("Se prepare para Realizar o Movimento");
        setCountdown((prev) => {
          if (prev === 0) {
            console.log({ prev })
            clearInterval(contageminicial);

            setMensagem("Muito bem!")

            setMensagem("Realize o Movimento ")
            camera.gravarVideo({
              videoElement: "video",
              stopButtonElement: "stopButton",
              tempoGravacao,
            }).then((videoData: FormData) => {
              setVideo(videoData);
            });

            setIsRecording(false);

            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    };
  };

  return (
    <div className='flex flex-col justify-center items-center gap-4 w-full shadow-xl p-2 rounded-sm'>

      {
        countdown > 0 && (
          <p className="text-3xl text-center font-bold">{countdown}</p>
        )
      }

      <div className='h-12 w-full flex justify-center items-center gap-3 p-1 border-2 bg-white border-black rounded'>
        <div className='flex justify-center items-centerw-2/3'>
          <p className='font-bold h-full'>{Mensagem}</p>
        </div>
      </div>

      {/* { isRecording &&  */}
      <div className='flex justify-center w-full relative'>
        <video className='lg:w-[680px] transform scale-x-[-1]' id='video'></video>
      </div>
      {/* } */}

      <div className='flex justify-around items-center w-full'>
        <Button 
          className='px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition flex items-center' 
          onClick={() => startCountdown(3)}> Gravar </Button>
        <Button 
          id='stopButton' 
          className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition flex items-center transparente"> Stop </Button>
      </div>
    </div>
  )
}