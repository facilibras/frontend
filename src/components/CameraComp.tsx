import { Hand } from "lucide-react"
import { Button } from "./ui/button"
import { exercicio } from "../const/exercicios.const"
import { Camera } from "../utils/camera"
import { useEffect, useState } from "react"
import { backendConnection } from "../utils/axios"
import { toast } from "react-toastify"

interface CameraCompProps {
  exercicio: exercicio,
  setSwitchToCamera: (change: boolean) => void,
  camera: Camera

}

export default function CameraComponent({ exercicio, camera, setSwitchToCamera }: CameraCompProps) {

  const [countdown, setCountdown] = useState<number | null>(null);
  const [Mensagem, setMensagem] = useState(exercicio.titulo)
  const [video, setVideo] = useState<FormData | null>(null)

  const [previewUrl, setPreviewUrl] = useState<string | null>(null);

  useEffect(() => {
    const uploadVideo = async () => {
      if (!video) return;

      const blob = video.get('video') as Blob;
      const url = URL.createObjectURL(blob);
      setPreviewUrl(url);

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

        if (response.status === 200) {
          console.log(response.data);
          toast.success(response.data.mensagem)
        } else {
          console.error('Erro no upload:', response.statusText);
        }
      } catch (error) {
        console.error('Erro na requisição de upload:', error);
      }
    };

    uploadVideo(); 
  }, [video]);

  const startCountdown = async (tempoGravacao: number) => {
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
          if (prev !== null) {
            if (prev <= 1) {
              clearInterval(contageminicial);
              
              setMensagem("Realize o Movimento ")
              camera.gravarVideo({
                videoElement: "video",
                stopButtonElement: "stopButton",
                tempoGravacao,
              }).then((videoData: FormData) => {
                setVideo(videoData);
              });
              return 0;
            }
            return prev - 1;
          }
          return null;
        });
      }, 1000);
    };



  };

  return (
    <div className='bg-gray-200 rounded-xl w-2/3 m-auto p-2'>

      {countdown !== null && (
        <p className="text-3xl text-center font-bold">{countdown}</p>
      )}

      <div className='h-12 w-full flex justify-center items-center gap-3 p-1 border-2 bg-white border-black rounded'>
        <div className='flex justify-center items-centerw-2/3'>
          <p className='font-bold h-full'>{Mensagem}</p>
        </div>

        <div className=''>
          <Button className='text-white flex gap-2'
            onClick={() => setSwitchToCamera(false)}>
            Tutorial
            <Hand />
          </Button>
        </div>
      </div>
      <div className='flex justify-center w-full relative'>

        <video className='lg:w-[680px] transform scale-x-[-1]' id='video'></video>
      </div>
      <div className='flex justify-center items-center'>
        <Button className='text-white' onClick={() => startCountdown(3)}> Iniciar Aula </Button>
        <Button id='stopButton'> Stop </Button>
      </div>


      {previewUrl && (
        <video src={previewUrl} controls width="400" />
      )}
    </div>
  )
}