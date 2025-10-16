import { createFileRoute, Link } from '@tanstack/react-router'
import CameraComponent from '../../components/CameraComp';
import Variation from '../../components/Variation';
import { backendConnection } from '../../utils/axios';
import Layout from '../../components/Layout';
import { useState, useEffect } from 'react';
import { exercicio } from '../../const/exercicios.const';
import { ProtectedRoute } from '../../components/ProtectedRoute';
import { AlignJustify, ArrowBigRight, ChevronRight, RotateCwIcon, Loader, Camera, Video } from 'lucide-react';
import { Button } from '../../components/ui/button';

export const Route = createFileRoute('/exercicios/$categoriaExercicio')({
    component: () =>
        <ProtectedRoute>
            <RouteComponent />
        </ProtectedRoute>,
})
interface instrucoesProsp {
    instrucoes: string,
    linkvideo: string,
    titulo: string
}

function RouteComponent() {

    const { categoriaExercicio } = Route.useParams()
    const [variacao, setVariacao] = useState<instrucoesProsp>({
        instrucoes: '',
        linkvideo: '',
        titulo: ''
    })
    const [realizandoExercicio, setRealizandoExercicio] = useState(false)
    const [respostaRecinhecido, setRespostaReconhecimento] = useState<string>('')
    const [listaVariacoes, setListaVariacoes] = useState<exercicio[]>([])
    const [exercicio, setExercicio] = useState<exercicio>({
        descricao: '',
        palavras: [
            { palavra: '', video: '' }
        ],
        proxTarefa: null,
        secao: '',
        status: null,
        titulo: '',
        ehVariacao: false,
        variacao: '',

    })


    async function getExercicio() {

        const getexercicio: exercicio = await backendConnection.useAxiosConnection({
            method: 'GET',
            path: `/exercicios/${categoriaExercicio}`,
        })

        if (getexercicio) {

            setExercicio(getexercicio)
            setVariacao({
                instrucoes: getexercicio.descricao,
                linkvideo: getexercicio.palavras[0].video,
                titulo: getexercicio.titulo
            })
            let possuiVariacão = true
            let nextpath = getexercicio.variacao
            setListaVariacoes(prev => [...prev, getexercicio])

            while (possuiVariacão) {

                const variacaoExercicio = await backendConnection.useAxiosConnection({
                    method: 'GET',
                    path: `/exercicios/${nextpath}`,
                })

                if (variacaoExercicio) {
                    setListaVariacoes(prev => [...prev, variacaoExercicio])
                    nextpath = variacaoExercicio.variacao
                    if (variacaoExercicio.variacao == null) {
                        possuiVariacão = false
                    }
                }
            }
        }
    }

    useEffect(() => {
        getExercicio()
    }, [])

    return <Layout>
        <div className='w-full flex justify-center items-center flex-col'>
            <main className="container mx-auto px-4 py-8">

                <section className="mb-8">
                    <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
                        <div>
                            <div className="flex items-center gap-2 mb-2">
                                <Link to='/exercicios' className='text-blue-600 hover:text-blue-800 transition flex items-center'> Voltar para exercícios </Link>
                                <span className="bg-blue-100 text-blue-600 text-xs px-2 py-1 rounded-full"> Básico </span>
                            </div>
                            <h2 className="text-3xl md:text-4xl font-bold capitalize text-gray-800 mb-2">Exercício:
                                {" "}
                                {exercicio.titulo.split('_')[0]}
                                {" "}
                                {exercicio.titulo.split("_")[1]}
                            </h2>
                            <p className="text-lg text-gray-600"> Aprenda e pratique o sinal de saudação básica em Libras.</p>
                        </div>

                        {/* <div className="flex items-center gap-4">
                            <div className="flex items-center bg-blue-50 px-3 py-2 rounded-lg">
                                <Star fill='#fcc800' className="mr-2" />
                                <span className="font-medium">Dificuldade: <span className="text-blue-600">Fácil</span></span>
                            </div>
                            <div className="flex items-center bg-green-50 px-3 py-2 rounded-lg">
                                <span className="font-medium">Completado: <span className="text-green-600">3 vezes</span></span>
                            </div>
                        </div> */}
                    </div>
                </section>


                <section className="mb-12 bg-white rounded-xl shadow-md overflow-hidden">
                    <div className="p-4 border-b flex justify-between items-center flex-col md:flex-row gap-4">
                        <h3 className="text-xl font-semibold text-gray-800 flex items-center gap-2">
                            <Video /> Variações do Sinal
                        </h3>
                        <div className="flex flex-wrap justify-center gap-2 w-full md:w-auto">
                            {
                                exercicio.variacao && (
                                    <div className='flex gap-2'>
                                        {
                                            listaVariacoes.map((variacao, index) => (
                                                <Button key={index}
                                                    onClick={() => {
                                                        setVariacao({
                                                            instrucoes: variacao.descricao,
                                                            linkvideo: variacao.palavras[0].video,
                                                            titulo: variacao.titulo
                                                        })
                                                    }
                                                    }
                                                >
                                                    {`Variação ${index + 1}`}
                                                </Button>
                                            ))
                                        }
                                    </div>
                                )
                            }
                        </div>
                    </div>

                    {/* <!-- Variação 1 --> */}
                    <Variation instrucoes={variacao.instrucoes} linkvideo={variacao.linkvideo} />


                </section>

                {/* <!-- Praticar --> */}
                <section className="mb-12">
                    <div className="bg-white rounded-xl shadow-md overflow-hidden">
                        <div className="p-4 border-b">
                            <h3 className="text-xl font-semibold text-gray-800 flex items-center gap-2">
                                <Camera /> Praticar com sua Webcam
                            </h3>
                        </div>
                        <div className="p-6">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">

                                <div className="flex justify-center gap-4">
                                    <CameraComponent titulo={variacao.titulo} setRealizandoExercicio={setRealizandoExercicio} setRespostaReconhecimento={setRespostaReconhecimento} />
                                </div>


                                {/* <!-- Área do Feedback --> */}
                                <div>
                                    <div className="pl-4 relative vertical-divider">
                                        <div className="mb-4">
                                            <h4 className="font-medium text-gray-700"> Feedback do sistema </h4>
                                            <p className="text-sm text-gray-500">Nosso sistema irá analisar seu sinal e dar feedback
                                                se você o executou corretamente</p>
                                        </div>

                                        {/* <!-- Barra de Progresso --> */}
                                        <div className="w-full flex justify-center ">
                                            {realizandoExercicio && <Loader className='animate-spin' />}
                                            {respostaRecinhecido && <p className='text-green-600 font-bold'> {respostaRecinhecido} </p>}
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

                <section className="mb-12">
                    <div className="bg-white rounded-xl shadow-md overflow-hidden">
                        <div className="p-4 border-b">
                            <h3 className="text-xl font-semibold text-gray-800 flex items-center gap-2">
                                <ArrowBigRight /> Próximos passos
                            </h3>
                        </div>
                        <div className="p-6">
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">

                                <Link to='/exercicios' className="group">
                                    <div
                                        className="bg-green-50 p-4 rounded-lg border border-green-200 hover:border-green-400 transition h-full">
                                        <div className="flex items-center gap-3 mb-3">
                                            <div
                                                className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center text-green-600 group-hover:bg-green-200 transition">
                                                <AlignJustify />
                                            </div>
                                            <h4 className="font-medium">Mais exercícios</h4>
                                        </div>
                                        <p className="text-sm text-gray-600 mb-2">Explore outros sinais para praticar</p>
                                        <div className="flex items-center text-green-600 text-sm font-medium">
                                            <span> Ver todos </span>
                                            <ChevronRight
                                                className='ml-1 transition-transform group-hover:translate-x-1'
                                            />
                                        </div>
                                    </div>
                                </Link>


                                <a>
                                    <div
                                        className="bg-purple-50 p-4 rounded-lg border border-purple-200 hover:border-purple-400 transition h-full">
                                        <div className="flex items-center gap-3 mb-3">
                                            <div
                                                className="w-10 h-10 bg-purple-100 rounded-full flex items-center justify-center text-purple-600 group-hover:bg-purple-200 transition">
                                                <RotateCwIcon />
                                            </div>
                                            <h4 className="font-medium">Revisar</h4>
                                        </div>
                                        <p className="text-sm text-gray-600 mb-2">Assista novamente ao vídeo tutorial</p>
                                        <div className="flex items-center text-purple-600 text-sm font-medium">
                                            <span>Repetir</span>
                                            <ChevronRight
                                                className='ml-1 transition-transform group-hover:translate-x-1'
                                            />
                                        </div>
                                    </div>
                                </a>



                                {
                                    exercicio.proxTarefa != null &&

                                    <Link reloadDocument={true} to='/exercicios/$categoriaExercicio' replace={true} params={{ categoriaExercicio: exercicio.proxTarefa ?? '' }}>
                                        <div
                                            className="bg-blue-50 p-4 rounded-lg border border-blue-200 hover:border-blue-400 transition h-full">
                                            <div className="flex items-center gap-3 mb-3">
                                                <div
                                                    className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center text-blue-600 group-hover:bg-blue-200 transition">
                                                    <i className="fas fa-hands"></i>
                                                    <ArrowBigRight />
                                                </div>
                                                <h4 className="font-medium">Próximo exercício</h4>
                                            </div>
                                            <p className="text-sm text-gray-600 mb-2">Avançar para o sinal {exercicio.proxTarefa}</p>
                                            <div className="flex items-center text-blue-600 text-sm font-medium">
                                                <span> Começar agora </span>
                                                <ChevronRight
                                                    className='ml-1 transition-transform group-hover:translate-x-1'
                                                />
                                            </div>
                                        </div>
                                    </Link>
                                }

                            </div>
                        </div>
                    </div>
                </section>
            </main>
        </div>
    </Layout>

}
