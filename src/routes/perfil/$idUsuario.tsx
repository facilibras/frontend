import { createFileRoute } from '@tanstack/react-router'
import { Button } from '../../components/ui/button'
import { backendConnection } from '../../utils/axios'
import Layout from '../../components/Layout'
import { useState, useEffect } from 'react'
import { usuario } from '../../const/usuario.conts'
import { CheckCircle, Medal, Pen, Star } from 'lucide-react'
import { categoriaColor } from '../../const/cores.const'

export const Route = createFileRoute('/perfil/$idUsuario')({
    component: RouteComponent,
})

function RouteComponent() {

    const { idUsuario } = Route.useParams()
    const [userInfo, setUserInfo] = useState<usuario>()
    async function getUserData() {

        const userdata: usuario = await backendConnection.useAxiosConnection({
            method: 'GET',
            path: `/perfil/${idUsuario}`,

        })
        if (userdata) {
            setUserInfo(userdata)
            console.log(userdata)
        }   
    }

    useEffect(() => {
        getUserData()
    }, [])



    return <Layout>
        <div className="flex flex-col justify-center gap-3 lg:ml-16 lg:mr-16 mb-8">

            <section className="bg-white rounded-xl shadow-md mt-0 lg:mt-8">
                <div className="relative">
                    {/* <!-- Cover Photo --> */}
                    <div id="backgound" className=" lg:rounded-t-xl h-48 bg-gradient-to-r from-blue-500 to-blue-300 relative">
                    </div>
                    <Button className='text-black p-2 rounded-full top-1 right-1 absolute'>
                        <Pen color='white' />
                    </Button>

                    {/* <!-- Profile Picture and Basic Info --> */}
                    <div className="px-6 pb-6 relative">
                        <div className="flex flex-col md:flex-row items-start md:items-end gap-6 -mt-16">
                            <div className="relative">
                                <img src={userInfo?.imagemPerfil} alt="Foto de perfil"
                                    className="w-32 h-32 rounded-full border-4 border-white shadow-md" />
                                <span
                                    className="absolute bottom-3 right-3 w-6 h-6 bg-yellow-500 rounded-full border-2 border-white">
                                </span>
                            </div>

                            <div className="flex-1">
                                <div className="flex md:flex-row md:items-center flex-wrap justify-between gap-4">
                                    <div>
                                        <h1 className="text-3xl font-bold text-gray-800"> {userInfo?.nomeOuApelido} </h1>

                                    </div>
                                    <p className="text-gray-600">Aprendendo Libras desde {userInfo?.aprendendoDesde}</p>

                                </div>


                            </div>
                            {/* <!-- Stats --> */}
                            <div className="mt-4 flex flex-wrap gap-4 justify-end">
                                <div className="flex items-center bg-blue-50 px-4 py-2 rounded-lg">
                                    <Medal color="#155dfc" className='mr-2' />
                                    <span className="font-medium">Nível: <span className="text-blue-600">5</span></span>
                                </div>
                                <div className="flex items-center bg-purple-50 px-4 py-2 rounded-lg">
                                    <Star color="#7e22ce" className='mr-2' fill='#7e22ce' />
                                    <span className="font-medium">Pontos: <span className="text-purple-600">{userInfo?.progresso.pontosNivel}</span></span>
                                </div>
                                <div className="flex items-center bg-green-50 px-4 py-2 rounded-lg">
                                    <CheckCircle color="#16a34a" className='mr-2' />
                                    <span className="font-medium">Sinais aprendidos: <span
                                        className="text-green-600">{userInfo?.progresso.qtdSinaisAprendidos}</span></span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* <!-- Left Column --> */}
                <div className="lg:col-span-2 space-y-6">
                    <div className="bg-white rounded-xl shadow-md p-6">
                        <h3 className="text-xl font-semibold text-gray-800 mb-4">Atividade Recente</h3>
                        <div className="space-y-4">
                            {
                                userInfo?.atividadeRecente.map((atividade, index) => (
                                    <div key={index}>
                                        <div className="activity-dot"></div>
                                        <div className="bg-gray-50 p-3 rounded-lg">
                                            <div className="flex justify-between items-start">
                                                <div>
                                                    <p className="font-medium text-gray-800">{atividade.atividade}</p>
                                                </div>
                                                <span className="text-xs text-gray-400">{atividade.data}</span>
                                            </div>
                                        </div>
                                    </div>
                                ))
                            }
                        </div>
                        <Button className="mt-4 text-white hover:text-blue-800 text-sm font-medium flex items-center">
                            Ver toda atividade <i className="fas fa-chevron-down ml-1"></i>
                        </Button>
                    </div>
                </div>


                {/* <!-- Right Column --> */}
                <div className="space-y-6">
                    {/* <!-- Progress Overview --> */}
                    <section className="bg-white rounded-xl shadow-md p-6">
                        <h2 className="text-xl font-bold text-gray-800 mb-4">Progresso</h2>

                        <div className="space-y-5">
                            {/* <!-- Overall Progress --> */}
                            <div>
                                <div className="flex justify-between items-center mb-2">
                                    <h3 className="font-medium text-gray-700">Nível atual</h3>
                                    <span className="text-sm font-medium text-blue-600">{userInfo?.progresso.pontosNivel}/{userInfo?.progresso.pontosTotal} pontos</span>
                                </div>
                                <div className="w-full bg-gray-200 rounded-full h-2.5">
                                    <div className="bg-blue-600 h-2.5 rounded-full" style={{ width: `${userInfo?.progresso.msgProgresso}` }}></div>
                                </div>
                                <p className="text-xs text-gray-500 mt-1">{userInfo?.progresso.msgProgresso}</p>
                            </div>




                            <div className="flex items-center gap-4 p-3 bg-yellow-50 rounded-lg">
                                <div
                                    className="flex-shrink-0 w-12 h-12 bg-yellow-100 rounded-full flex items-center justify-center text-yellow-600">
                                    <i className="fas fa-fire text-xl"></i>
                                </div>
                                <div>
                                    <h3 className="font-medium text-gray-800">Sequência</h3>
                                    <p className="text-gray-600 text-sm">12 dias consecutivos</p>
                                </div>
                            </div>
                        </div>
                    </section>


                    <section className="bg-white rounded-xl shadow-md p-6">
                        <div className="flex justify-between items-center mb-4">
                            <h2 className="text-xl font-bold text-gray-800">Conquistas</h2>
                            <Button className="text-white hover:text-blue-800 transition">
                                Ver todas
                            </Button>
                        </div>

                        <div className="grid grid-cols-3 gap-3">

                            {
                                userInfo?.conquistas.map((conquista, index) => (
                                    <div key={index} className={`flex flex-col items-center`}>
                                        <div
                                            className={`w-16 h-16 ${categoriaColor[conquista.nome]?.bgColor} rounded-full flex items-center justify-center text-blue-600 mb-2`}>
                                            <Medal color="white" />
                                        </div>
                                        <p className="text-xs text-center font-medium text-black">{conquista.nome}</p>
                                    </div>
                                ))
                            }
                        </div>
                    </section>
                </div>
            </div>
        </div>
    </Layout>
}
