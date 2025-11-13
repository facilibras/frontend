import { createFileRoute } from '@tanstack/react-router'
import { Button } from '../../components/ui/button'
import Layout from '../../components/Layout'
import React, { useState, useEffect } from 'react'
import { usuario } from '../../const/usuario.conts'
import { CheckCircle, Medal, Star } from 'lucide-react'
import { categoriaColor } from '../../const/cores.const'
import { ProtectedRoute } from '../../components/ProtectedRoute'
import { getUser } from '../../Services/getUser'
import { DialogUserInfo } from '../../components/Dialog/PutUserInfo'
import { useUserStore } from '../../store/user'
import { ListaAtividades } from '../../components/Dialog/ListaAtividades'


export const Route = createFileRoute('/perfil/$idUsuario')({
    component: () => (
        <ProtectedRoute>
            <RouteComponent />
        </ProtectedRoute>
    ),
})

function RouteComponent() {

    const { states: { user } } = useUserStore();
    const [ imageUrl, setImageUrl ] = useState< null | string >(null);
    const { idUsuario } = Route.useParams();
    const [ userInfo, setUserInfo ] = useState<usuario>({
        imagemPerfil: '',
        nomeOuApelido: '',
        aprendendoDesde: '',
        progresso: {
            pontosNivel: 0,
            pontosTotal: 0,
            qtdSinaisAprendidos: 0,
            msgProgresso: '',
            nivel: 0,
            pontosParaSubir: 0
        },
        atividadeRecente: [],
        conquistas: [],
        imagemFundo: ''
    })

    useEffect(() => {
        const fetchUserdata = async () => setUserInfo(await getUser(idUsuario as string) as usuario);
        fetchUserdata();
    }, [])

    useEffect(() => {
        const imagemData = userInfo.imagemPerfil;

        
        if (imagemData && typeof imagemData !== 'string') {
            
            const blob = new Blob([imagemData], { type: 'image/jpeg' });

            const url = URL.createObjectURL(blob);
            setImageUrl(url);

            return () => {
                URL.revokeObjectURL(url);
            };
        }
        
    }, [userInfo.imagemPerfil]);

    return <Layout>
        <div className="flex flex-col justify-center gap-3 lg:ml-16 lg:mr-16 mb-8">

            <section className="bg-white rounded-xl shadow-md mt-0 lg:mt-8">
                <div className="relative">
                    <div id="backgound" className={`lg:rounded-t-xl h-48 bg-gradient-to-r 
                        
                        ${userInfo.imagemFundo ? userInfo.imagemFundo : 'from-blue-700 to-blue-400'} 
                        
                    relative`}>
                    </div>

                    {
                        user?.id_usuario.toString() === idUsuario && <DialogUserInfo nome={userInfo.nomeOuApelido} />
                    }

                    {/* <!-- Profile Picture and Basic Info --> */}
                    <div className="px-6 pb-6 relative">
                        <div className="flex flex-col md:flex-row items-start md:items-end gap-6 -mt-16">
                            <div className="relative">

                                {
                                    typeof(userInfo.imagemPerfil) === 'string' ?
                                        React.createElement("div", {
                                            dangerouslySetInnerHTML: { __html: userInfo.imagemPerfil },
                                            className: "w-32 h-32 "
                                        }) :

                                        <img src={imageUrl ?? ""} alt="Foto de perfil"
                                            className="w-32 h-32 rounded-full border-4 border-white shadow-md"
                                        />
                                }
                            </div>

                            <div className="flex-1">
                                <div className="flex md:flex-row md:items-center flex-wrap justify-between">
                                    <div>
                                        <h1 className="text-2xl font-bold text-gray-800"> {userInfo?.nomeOuApelido} </h1>

                                    </div>
                                    <p className="text-gray-600">Aprendendo Libras desde {userInfo?.aprendendoDesde}</p>

                                </div>


                            </div>
                            {/* <!-- Stats --> */}
                            <div className="mt-4 flex flex-wrap gap-4 justify-end">
                                <div className="flex items-center bg-blue-50 px-4 py-2 rounded-lg">
                                    <Medal color="#155dfc" className='mr-2' />
                                    <span className="font-medium">Nível: <span className="text-blue-600">{userInfo.progresso.nivel}</span></span>
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
                <div className="lg:col-span-2 space-y-6">
                    <div className="bg-white rounded-xl shadow-md p-6">
                        <h3 className="text-xl font-semibold text-gray-800 mb-4">Atividade Recente</h3>
                        <div className="space-y-4">
                            {
                                userInfo?.atividadeRecente.slice(0, 3).map((atividade, index) => (
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
                        <ListaAtividades atividades={userInfo?.atividadeRecente}/>
                    </div>
                </div>


                <div className="space-y-6">
                    <section className="bg-white rounded-xl shadow-md p-6">
                        <h2 className="text-xl font-bold text-gray-800 mb-4">Progresso</h2>

                        <div className="space-y-5">
                            <div>
                                <div className="flex justify-between items-center mb-2">
                                    <h3 className="font-medium text-gray-700">Nível atual</h3>
                                    <span className="text-sm font-medium text-blue-600">{userInfo.progresso.pontosNivel}/{userInfo.progresso.pontosTotal} pontos</span>
                                </div>
                                <div className="w-full bg-gray-200 rounded-full h-2.5">
                                    <div className="bg-blue-600 h-2.5 rounded-full" style={{ width: `${userInfo.progresso.msgProgresso}` }}></div>
                                </div>
                                <p className="text-xs text-gray-500 mt-1">{userInfo?.progresso.msgProgresso}</p>
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
                                userInfo?.conquistas.slice(0,3).map((conquista, index) => (
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
