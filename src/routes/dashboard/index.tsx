import { createFileRoute } from '@tanstack/react-router'
import { Book, AlignStartVertical } from 'lucide-react'
import { ButtonDashboard } from '../../components/ButtonDashboard'
import { useUserStore } from '../../store/user'
import Layout from '../../components/Layout'
import Flame from "../../assets/Flame.svg"
import { ProtectedRoute } from '../../components/ProtectedRoute'
import React from 'react'
import { usuario } from '../../const/usuario.conts'
import { useEffect, useState } from 'react'
import { getUser } from '../../Services/getUser'
import { highContrastBorder} from '../../const/highcontrat.const'
import { categorias } from '../../const/categorias.const'
import noUser from '../../assets/noUser.webp'

export const Route = createFileRoute('/dashboard/')({
    component: () => (
        <ProtectedRoute>
            <RouteComponent />
        </ProtectedRoute>
    )
})

function RouteComponent() {

    const { states: { user } } = useUserStore();
    const [userInfo, setUserInfo] = useState<usuario>({
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
    const [imageUrl, setImageUrl] = useState<null | string>(null);
    const UserName = user?.nome_usuario || 'Convidado'

    useEffect(() => {

        const fetchUser = async () => setUserInfo(await getUser(user?.id_usuario.toString() as string) as usuario)
        fetchUser()

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
        <div className='flex flex-col lg:pl-8 lg:pr-8'>
            <div className=' flex flex-wrap lg:flex-nowrap gap-6 mb-3'>
                <div className={`bg-blue-600 ${highContrastBorder} rounded-3xl flex flex-col items-center w-full h-auto m-2 p-4 lg:pl-8 lg:pr-8`}>
                    <div className='flex w-full items-center justify-center'>

                        {
                            typeof (userInfo.imagemPerfil) === 'string' ?
                                React.createElement("div", {
                                    dangerouslySetInnerHTML: { __html: userInfo.imagemPerfil },
                                    className: "w-32 h-32"
                                }) :

                                <img src={imageUrl ?? noUser} alt="Foto de perfil"
                                    className="w-32 h-32 rounded-full border-4 border-white shadow-md"
                                />
                        }

                        <div className='ml-2'>
                            <p className='font-bold text-2xl lg:text-3xl text-white highcontrast:text-yellow-300'> Bem Vindo {UserName.split(" ")[0]}</p>
                            <p className='text-white highcontrast:text-yellow-300 text-2xl'> Nível : {userInfo.progresso.nivel}</p>
                            <p className='text-white highcontrast:text-yellow-300 text-2xl'> {categorias[userInfo.progresso.nivel.toString() as keyof typeof categorias]}</p>
                        </div>
                    </div>
                    <div className='mt-8 w-2/3'> {/* Progresso do usuario */}
                        <div>
                            <div className='flex justify-between'>
                                <p className='text-white'>Exercicios</p> <p className='text-white font-bold'>{userInfo?.progresso.msgProgresso}</p>
                            </div>
                            <div className=''> {/* Barra de progresso */}
                                <div className='bg-white w-full h-2 rounded-xl'>
                                    <div className={`bg-black h-full rounded-xl highcontrast:bg-yellow-300`}
                                        style={{ width: userInfo?.progresso.msgProgresso }}
                                    ></div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className='flex w-full lg:w-1/3 h-full'>
                    <div className='p-5 w-full relative bg-blue-600 highcontrast:bg-black highcontrast:border-4 highcontrast:border-white rounded-3xl m-2 overflow-hidden z-10 grow h-[320px]'>
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
            <div className='flex flex-wrap lg:flex-nowrap gap-6 m-2'> {/* Botões */}
                <ButtonDashboard nome='Exercícios' Icone={Book} rota='/exercicios/' />
                <ButtonDashboard nome='Ranking' Icone={AlignStartVertical} rota='/ranking/' />
                {/* <ButtonDashboard nome='Quiz Diário' Icone={Lightbulb} rota='/quiz/' /> */}
            </div>

            <div className='flex items-center justify-items-start gap-2'>
                {/* Novidades */}
                <div className={`bg-blue-600 h-1/2 rounded-3xl m-2 p-13 w-full ${highContrastBorder}`}>
                    <p className='text-white font-bold text-2xl text-center'>
                        Mais 50 Palavras adicionadas no nosso dicionário na última semana
                    </p>
                </div>
            </div>
        </div>
    </Layout>
} 
