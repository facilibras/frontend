import { createFileRoute } from '@tanstack/react-router'
import { Book, Lightbulb, AlignStartVertical } from 'lucide-react'
import { ButtonDashboard } from '../../components/ButtonDashboard'
import { useUserStore } from '../../store/user'
import Layout from '../../components/Layout'
import Flame from "../../assets/Flame.svg"
import { ProtectedRoute } from '../../components/ProtectedRoute'
import { backendConnection } from '../../utils/axios'
import { usuario } from '../../const/usuario.conts'
import { useEffect, useState } from 'react'

export const Route = createFileRoute('/dashboard/')({
    component: () => (
        <ProtectedRoute>
            <RouteComponent />
        </ProtectedRoute>
    )
})

function RouteComponent() {

    const { states: { user } } = useUserStore();
    const [userInfo, setUserInfo] = useState<usuario>()
    async function getUserData() {

        const userdata: usuario = await backendConnection.useAxiosConnection({
            method: 'GET',
            path: `/perfil/${user?.id_usuario}`,

        })
        if (userdata) {
            setUserInfo(userdata)
            console.log(userdata)
        }
    }

    useEffect(() => {
        getUserData()
    }, [])

    const UserName = user?.nome_usuario || 'Convidado'
    const Nivel = 'Iniciante'

    return <Layout>
        <div className='flex flex-col'>
            <div className=' flex flex-wrap lg:flex-nowrap mb-5'>
                <div className='bg-blue-600 rounded-3xl w-full lg:w-1/2 h-auto m-2 p-4'> {/* Informações do usuario */}
                    <div className='flex'> {/* Imagem e nome do usuario */}
                        <img className='w-1/3 lg:w-2/5 rounded-full' src={userInfo?.imagemPerfil} alt="" />
                        <div className='ml-2'>
                            <p className='font-bold text-2xl lg:text-3xl text-white'> Bem Vindo {UserName.split(" ")[0]}</p>
                            <p className='text-white text-2xl'> Nível : {Nivel}</p>
                        </div>
                    </div>
                    <div className='m-3'> {/* Progresso do usuario */}
                        <div>
                            <div className='flex justify-between'>
                                <p className='text-white'>Exercicios</p> <p className='text-white font-bold'>{userInfo?.progresso.msgProgresso}</p>
                            </div>
                            <div className=''> {/* Barra de progresso */}
                                <div className='bg-white w-full h-2 rounded-xl'>
                                    <div className={`bg-black h-full rounded-xl`}
                                        style={{ width: userInfo?.progresso.msgProgresso }}
                                    ></div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className='flex w-full h-full'> {/* Noticias */}
                    <div className='bg-blue-600 h-[320px] rounded-3xl m-2 flex items-center justify-center w-full cursor-pointer hover:bg-blue-700 transition-all duration-300'> {/* Novo Quiz */}
                        <p className='text-white font-bold text-2xl'> Novo Quiz disponivel</p>
                    </div>
                    <div className='p-5 w-full relative bg-blue-600 rounded-3xl m-2 overflow-hidden z-10 grow h-[320px]'> {/* Ofensiva */}
                        <div className='relative z-10'>
                            <p className='w-full font-bold p-2 text-white text-2xl text-center'>
                                Palavras aprendidas até agora
                            </p>
                            <p className='text-9xl font-bold text-white'>{userInfo?.progresso.qtdSinaisAprendidos}</p>
                        </div>
                        <div className='absolute z-0 left-2/4 bottom-0 w-2/3'>
                            <img src={Flame} alt="Flame Icon" />
                        </div>
                    </div>
                </div>
            </div>
            <div className='flex flex-wrap lg:flex-nowrap gap-2 m-2'> {/* Botões */}
                <ButtonDashboard nome='Exercícios' Icone={Book} rota='/exercicios/' />
                <ButtonDashboard nome='Quiz Diário' Icone={Lightbulb} rota='/quiz/' />
                <ButtonDashboard nome='Ranking' Icone={AlignStartVertical} rota='/ranking/' />
            </div>

            <div className='flex items-center justify-items-start gap-2'>
                {/* Novidades */}
                <div className='bg-blue-600 h-1/2 rounded-3xl m-2 p-13 w-full'>
                    <p className='text-white font-bold text-2xl text-center'>
                        Mais 50 Palavras adicionadas no nosso dicionario na ultima semana
                    </p>
                </div>
            </div>
        </div>
    </Layout>
} 
