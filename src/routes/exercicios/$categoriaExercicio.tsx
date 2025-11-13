import { createFileRoute, Link } from '@tanstack/react-router'
import { ResponseUpload, CameraComponent } from '../../components/CameraComp';
import Variation from '../../components/Variation';
import { backendConnection } from '../../utils/axios';
import Layout from '../../components/Layout';
import { useState, useEffect } from 'react';
import { exercicio } from '../../const/exercicios.const';
import { ProtectedRoute } from '../../components/ProtectedRoute';
import { Loader, Camera, Video, Check, X } from 'lucide-react';
import { Button } from '../../components/ui/button';
import { ScrollArea } from '../../components/ui/scroll-area';
import { Steps } from '../../components/Exercise/Page/Steps';

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
    const [respostaRecinhecido, setRespostaReconhecimento] = useState<ResponseUpload>({ sucesso: false, feedback: [] })
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
            let possuiVariacao = true
            let nextpath = getexercicio.variacao

            while (possuiVariacao) {

                const variacaoExercicio = await backendConnection.useAxiosConnection({
                    method: 'GET',
                    path: `/exercicios/${nextpath}`,
                })


                if (variacaoExercicio) {
                    setListaVariacoes(prev => [...prev, variacaoExercicio])
                    nextpath = variacaoExercicio.variacao
                    if (variacaoExercicio.variacao == null) {
                        possuiVariacao = false
                    }
                }
            }
        }
    }

    useEffect(() => {
        const funcao = async () => await getExercicio()

        funcao()
    }, [])

    return <Layout>
        <div className='w-full flex justify-center items-center flex-col'>
            <main className="container mx-auto px-4 py-8">

                <section className="mb-8">
                    <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
                        <div>
                            <div className="flex items-center gap-2 mb-2">
                                <Link to='/exercicios' className='text-blue-600 hover:text-blue-800 transition flex items-center'> Voltar para exercícios </Link>
                                <span className="bg-blue-100 text-blue-600 text-xs px-2 py-1 rounded-full capitalize"> {exercicio.secao} </span>
                            </div>
                            <h2 className="text-3xl md:text-4xl font-bold capitalize text-gray-800 mb-2 dark:text-white">Exercício:
                                {" "}
                                {exercicio.titulo.split('_')[0]}
                                {" "}
                                {exercicio.titulo.split("_")[1]}
                            </h2>
                            <p className="text-lg text-gray-600 dark:text-white"> Aprenda e pratique o sinal de saudação básica em Libras.</p>
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
                                    <CameraComponent
                                        titulo={variacao.titulo}
                                        setRealizandoExercicio={setRealizandoExercicio}
                                        setRespostaReconhecimento={setRespostaReconhecimento}
                                    />
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
                                        <div className="w-full flex flex-col justify-center">
                                            {realizandoExercicio && <Loader className='animate-spin' />}
                                            <div>
                                                {
                                                    respostaRecinhecido.sucesso ?
                                                        <p className='text-green-600 font-bold'> Parabéns Você Realizou o Sinal Corretamente</p> :
                                                        <p className='text-red-600 font-bold'> Sinal Não Reconhecido Tente Novamente </p>
                                                }
                                            </div>


                                            <ScrollArea className="sm:max-w-lg max-w-sm max-h-72 rounded-md mt-6">
                                                <div className='flex flex-col'>
                                                    {
                                                        respostaRecinhecido.feedback.map((feed, index) => (
                                                            <div key={index} className={`flex gap-3 ${feed.correto ? 'text-green-600 font-bold' : 'text-red-600 font-bold'}`}>

                                                                <div className='w-auto h-auto rounded-full shadow p-1 flex items-center justify-center'>
                                                                    {feed.correto ? <Check color='green' /> : <X color='red' />}
                                                                </div>

                                                                {feed.mensagem}
                                                            </div>
                                                        ))
                                                    }
                                                </div>
                                            </ScrollArea>
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

                <Steps exercicio={exercicio}/>
            </main>
        </div>
    </Layout>

}
