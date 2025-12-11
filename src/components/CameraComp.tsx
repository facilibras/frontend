import { Button } from "./ui/button";
import { Camera } from "../utils/camera";
import { useEffect, useState } from "react";
import { backendConnection } from "../utils/axios";
import { toast } from "react-toastify";
import { Camera as CameraIcon } from "lucide-react";

export interface ResponseUpload {
  sucesso: boolean | null;
  feedback: Feedback[];
}
interface Feedback {
  correto: boolean;
  mensagem: string;
}

interface CameraCompProps {
  titulo: string;
  setRealizandoExercicio: (change: boolean) => void;
  setRespostaReconhecimento: (resposta: ResponseUpload) => void;
  tempGravacao?: number;
}

export function CameraComponent({
  titulo,
  setRealizandoExercicio,
  setRespostaReconhecimento,
  tempGravacao
}: CameraCompProps) {
  const [countdown, setCountdown] = useState<number>(0);
  const [Mensagem, setMensagem] = useState(titulo);
  const [video, setVideo] = useState<FormData | null>(null);
  const [isRecording, setIsRecording] = useState(false);
  const camera = new Camera();

  const uploadVideo = async () => {
    if (!video) return;

    try {
      const response = await backendConnection.useAxiosConnection({
        method: "POST",
        path: "/exercicios",
        dataValues: video,
        subpath: `${titulo}/reconhecer/`,
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      setRealizandoExercicio(false);

      if (response.data.sucesso) {
        console.log(response.data);
        toast.success("Sinal Reconhecido com Sucesso");
        setRespostaReconhecimento(response.data);
      } else {
        setRespostaReconhecimento(response.data);
        toast.error("Sinal Não reconhecido");
      }
    } catch (error) {
      setRealizandoExercicio(false);
      console.error("Erro na requisição de upload:", error);
    }
  };

  useEffect(() => {
    console.log(video);
    uploadVideo();
  }, [video]);

  useEffect(() => {
    camera.listDevices("select-camera");
  }, []);

  const startCountdown = async (tempoGravacao: number) => {
    setRespostaReconhecimento({ sucesso: null, feedback: [] });
    setIsRecording(true);
    const videoElement = document.getElementById("video") as HTMLVideoElement;

    if (!videoElement) {
      console.error("Video element not found!");
      return;
    }

    camera.getStream("video"); // Iniciar Camera

    videoElement.onloadedmetadata = () => {
      setRealizandoExercicio(true);
      videoElement.play();
      setCountdown(5);

      const contageminicial = setInterval(() => {
        setMensagem("Se prepare para Realizar o Movimento");
        setCountdown((prev) => {
          if (prev === 0) {
            console.log({ prev });
            clearInterval(contageminicial);

            setMensagem("Realize o Movimento ");

            camera
              .gravarVideo({
                videoElement: "video",
                stopButtonElement: "stopButton",
                tempoGravacao,
              })
              .then((videoData: FormData) => {
                setVideo(videoData);
              });

            setIsRecording(false);

            return 0;
          }
          setMensagem(String(prev));
          return prev - 1;
        });
      }, 1000);
    };
  };

  return (
    <div className="flex flex-col justify-center items-center gap-4 w-full shadow-xl p-2 rounded-sm">
      {countdown > 0 && <p className="text-3xl text-center font-bold">{}</p>}
      <div className="h-12 w-full flex justify-center items-center gap-3 p-1 border-2 bg-white border-black rounded">
        <div className="flex justify-center items-centerw-2/3">
          <p className="font-bold h-full">{Mensagem}</p>
        </div>
      </div>

      {/* { isRecording &&  */}
      <div className="flex justify-center h-[350px] w-full relative bg-gray-100">
        <div className="flex flex-col items-center w-full h-full justify-center absolute gap-4">
          <CameraIcon size={64} className=" text-gray-400" />
          <p className="absolute top-1/2 lg:w-[680px] w-full text-center mt-10">
            Clique em <b>Gravar</b> para iniciar o reconhecimento
          </p>
        </div>
        <video className="lg:w-[680px] transform scale-x-[-1]" id="video" />
      </div>
      {/* } */}

      <div className="flex flex-wrap items-center w-full gap-3 justify-center">
        <Button
          className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition flex items-center cursor-pointer"
          onClick={() => startCountdown(tempGravacao ? tempGravacao : 5)}
        >
          {" "}
          Gravar
        </Button>
        <Button
          id="stopButton"
          className="px-4 py-2 shadow-2xl bg-red-500 text-white rounded-lg hover:bg-red-600 transition flex items-center transparente"
        >
          Stop
        </Button>
        <select
          id="select-camera"
          className="border-1 border-black rounded-sm p-1"
          onChange={(e) => camera.setDeviceSelection(e.target.value)}
        >
          Selecione a Camera
        </select>
      </div>
    </div>
  );
}
