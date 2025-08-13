import { createFileRoute, Link } from '@tanstack/react-router'
import TutorialComp from '../../components/TutorialComp';
import CameraComponent from '../../components/CameraComp';
import Variation from '../../components/Variation';
import { Camera } from '../../utils/camera';
import { backendConnection } from '../../utils/axios';
import Layout from '../../components/Layout';
import { useState, useEffect } from 'react';
import { exercicio } from '../../const/exercicios.const';
import { ProtectedRoute } from '../../components/ProtectedRoute';

export const Route = createFileRoute('/exercicios/$categoriaExercicio')({
  component: ()=> 
    <ProtectedRoute>
      <RouteComponent/>
    </ProtectedRoute>,
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
      <main id="main-content" className="container mx-auto px-4 py-8">
        {/* <!-- Header do exercício --> */}
        <section className="mb-8">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
                <div>
                    <div className="flex items-center gap-2 mb-2">
                        <Link to='/exercicios' className='text-blue-600 hover:text-blue-800 transition flex items-center'> Voltar para exercícios </Link>
                        <span className="bg-blue-100 text-blue-600 text-xs px-2 py-1 rounded-full">Básico</span>
                    </div>
                    <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-2">Exercício: Sinal {exercicio.palavras[0].palavra.replace('_',' ')}</h2>
                    <p className="text-lg text-gray-600">Aprenda e pratique o sinal de saudação básica em Libras.</p>
                </div>

                <div className="flex items-center gap-4">
                    <div className="flex items-center bg-blue-50 px-3 py-2 rounded-lg">
                        <i className="fas fa-star text-yellow-500 mr-2"></i>
                        <span className="font-medium">Dificuldade: <span className="text-blue-600">Fácil</span></span>
                    </div>
                    <div className="flex items-center bg-green-50 px-3 py-2 rounded-lg">
                        <i className="fas fa-check-circle text-green-500 mr-2"></i>
                        <span className="font-medium">Completado: <span className="text-green-600">3 vezes</span></span>
                    </div>
                </div>
            </div>
        </section>

        {/* <!-- Exercício --> */}
        <section className="mb-12 bg-white rounded-xl shadow-md overflow-hidden">
            <div className="p-4 border-b flex justify-between items-center">
                <h3 className="text-xl font-semibold text-gray-800 flex items-center gap-2">
                    <i className="fas fa-video text-blue-500"></i> Variações do Sinal
                </h3>
                <div className="flex gap-2">
                    <button
                        className="tab-button variation-tab-btn active px-3 py-1 rounded-md text-sm flex items-center gap-1"
                        data-tab="variation1">
                        <i className="fas fa-circle-check text-green-500"></i> Variação 1
                    </button>
                    <button className="tab-button variation-tab-btn px-3 py-1 rounded-md text-sm flex items-center gap-1"
                        data-tab="variation2">
                        <i className="fas fa-circle-xmark text-gray-400"></i> Variação 2
                    </button>
                    <button className="tab-button variation-tab-btn px-3 py-1 rounded-md text-sm flex items-center gap-1"
                        data-tab="variation3">
                        <i className="fas fa-circle-xmark text-gray-400"></i> Variação 3
                    </button>
                </div>
            </div>

            {/* <!-- Variação 1 --> */}
            <Variation instrucoes={exercicio.palavras[0].palavra.split(",")} linkvideo={exercicio.palavras[0].video}/>

            
        </section>

        {/* <!-- Praticar --> */}
        <section className="mb-12">
            <div className="bg-white rounded-xl shadow-md overflow-hidden">
                <div className="p-4 border-b">
                    <h3 className="text-xl font-semibold text-gray-800 flex items-center gap-2">
                        <i className="fas fa-camera text-blue-500"></i> Praticar com sua Webcam
                    </h3>
                </div>
                <div className="p-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        {/* <!-- Webcam --> */}
                        <div>
                            <div className="mb-4 flex justify-between items-center">
                                <h4 className="font-medium text-gray-700">Sua tentativa</h4>
                                <div id="gravando" className="flex items-center gap-2">
                                </div>
                            </div>
                            <div className="webcam-placeholder aspect-w-4 aspect-h-3 rounded-lg overflow-hidden mb-4 cursor-pointer"
                                id="webcamContainer">
                                {/* <!-- Vídeo da webcam vai aqui--> */}
                            </div>
                            <div className="flex justify-center gap-4">
                                <button id="startRecording"
                                    className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition flex items-center">
                                    <i className="fas fa-record-vinyl mr-2"></i> Gravar
                                </button>
                                <button id="stopRecording"
                                    className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition flex items-center transparente"
                                    disabled>
                                    <i className="fas fa-stop mr-2"></i> Parar
                                </button>
                            </div>
                        </div>

                        {/* <!-- Área do Feedback --> */}
                        <div>
                            <div className="pl-4 relative vertical-divider">
                                <div className="mb-4">
                                    <h4 className="font-medium text-gray-700">Feedback do sistema</h4>
                                    <p className="text-sm text-gray-500">Nosso sistema irá analisar seu sinal e dar feedback
                                        se você o executou corretamente</p>
                                </div>

                                {/* <!-- Feedback (começa escondido) --> */}
                                <div id="feedbackCard"
                                    className="feedback-card hidden bg-white border rounded-lg p-4 shadow-sm mb-4">
                                    <div className="flex items-start">
                                        <div id="feedbackIcon" className="flex-shrink-0 mt-1"></div>
                                        <div className="ml-3">
                                            <h4 id="feedbackTitle" className="font-medium text-gray-800"></h4>
                                            <p id="feedbackText" className="text-sm text-gray-600 mt-1"></p>
                                        </div>
                                    </div>
                                    <div className="mt-4 pt-4 border-t">
                                        <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
                                            <div id="feedbackProgresso" className="h-full bg-green-500 rounded-full"
                                                style={{width: "50%"}}></div>
                                        </div>
                                        <div className="flex justify-between text-xs text-gray-600 mt-1 mb-3">
                                            <span>0%</span>
                                            <span id="feedbackPrecisao"></span>
                                            <span>100%</span>
                                        </div>
                                        <ul className="text-sm text-gray-700 space-y-1">
                                            <li id="feedbackMao" className="flex items-center"></li>
                                            <li id="feedbackMovimento" className="flex items-center"></li>
                                            <li id="feedbackRosto" className="flex items-center"></li>
                                        </ul>
                                    </div>
                                </div>

                                {/* <!-- Barra de Progresso --> */}
                                <div id="progressContainer" className="hidden">
                                    <div className="flex justify-between items-center mb-1">
                                        <span className="text-sm font-medium text-gray-700">Analisando seu sinal...</span>
                                        <span id="progressPercent" className="text-xs font-medium text-blue-600">0%</span>
                                    </div>
                                    <div className="w-full bg-gray-200 rounded-full h-2.5">
                                        <div id="progressBar" className="progress-bar bg-blue-600 h-2.5 rounded-full w-0"></div>
                                    </div>
                                </div>

                                {/* <!-- Dicas --> */}
                                <div className="bg-blue-50 border-l-4 border-blue-400 p-4 mt-6">
                                    <div className="flex">
                                        <div className="flex-shrink-0">
                                            <i className="fas fa-tips text-blue-500"></i>
                                        </div>
                                        <div className="ml-3">
                                            <p className="text-sm text-blue-700">
                                                <strong>Dica:</strong> Certifique-se de que sua mão esteja bem iluminada
                                                e
                                                visível na câmera. Tente manter o fundo simples para melhor
                                                reconhecimento.
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>

        {/* <!-- Próximos passos --> */}
        <section className="mb-12">
            <div className="bg-white rounded-xl shadow-md overflow-hidden">
                <div className="p-4 border-b">
                    <h3 className="text-xl font-semibold text-gray-800 flex items-center gap-2">
                        <i className="fas fa-arrow-right text-blue-500"></i> Próximos passos
                    </h3>
                </div>
                <div className="p-6">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        {/* <!-- Próximo Exercício --> */}
                        <a href="#" className="group">
                            <div
                                className="bg-blue-50 p-4 rounded-lg border border-blue-200 hover:border-blue-400 transition h-full">
                                <div className="flex items-center gap-3 mb-3">
                                    <div
                                        className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center text-blue-600 group-hover:bg-blue-200 transition">
                                        <i className="fas fa-hands"></i>
                                    </div>
                                    <h4 className="font-medium">Próximo exercício</h4>
                                </div>
                                <p className="text-sm text-gray-600 mb-2">Avançar para o sinal "Bom dia"</p>
                                <div className="flex items-center text-blue-600 text-sm font-medium">
                                    <span>Começar agora</span>
                                    <i
                                        className="fas fa-chevron-right ml-1 transition-transform group-hover:translate-x-1"></i>
                                </div>
                            </div>
                        </a>

                        {/* <!-- Revisar --> */}
                        <a href="#" className="group">
                            <div
                                className="bg-purple-50 p-4 rounded-lg border border-purple-200 hover:border-purple-400 transition h-full">
                                <div className="flex items-center gap-3 mb-3">
                                    <div
                                        className="w-10 h-10 bg-purple-100 rounded-full flex items-center justify-center text-purple-600 group-hover:bg-purple-200 transition">
                                        <i className="fas fa-redo"></i>
                                    </div>
                                    <h4 className="font-medium">Revisar</h4>
                                </div>
                                <p className="text-sm text-gray-600 mb-2">Assista novamente ao vídeo tutorial</p>
                                <div className="flex items-center text-purple-600 text-sm font-medium">
                                    <span>Repetir</span>
                                    <i
                                        className="fas fa-chevron-right ml-1 transition-transform group-hover:translate-x-1"></i>
                                </div>
                            </div>
                        </a>

                        {/* <!-- Mais exercícios --> */}
                        <a href="exercicios.html" className="group">
                            <div
                                className="bg-green-50 p-4 rounded-lg border border-green-200 hover:border-green-400 transition h-full">
                                <div className="flex items-center gap-3 mb-3">
                                    <div
                                        className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center text-green-600 group-hover:bg-green-200 transition">
                                        <i className="fas fa-list"></i>
                                    </div>
                                    <h4 className="font-medium">Mais exercícios</h4>
                                </div>
                                <p className="text-sm text-gray-600 mb-2">Explore outros sinais para praticar</p>
                                <div className="flex items-center text-green-600 text-sm font-medium">
                                    <span>Ver todos</span>
                                    <i
                                        className="fas fa-chevron-right ml-1 transition-transform group-hover:translate-x-1"></i>
                                </div>
                            </div>
                        </a>
                    </div>
                </div>
            </div>
        </section>
    </main>
    </div>
  </Layout>

}




