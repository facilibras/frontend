import { createFileRoute } from '@tanstack/react-router'
import { BookOpen, Book, Lightbulb } from 'lucide-react'
import { ButtonDashboard } from '../../components/ButtonDashboard'
import BarraLateral from '../../components/BarraLateral'
import Layout from '../../components/Layout'
import Flame from "../../assets/Flame.svg"

export const Route = createFileRoute('/dashboard/')({
    component: RouteComponent,
})

function RouteComponent() {

    const UserName = "Samuel"
    const Nivel = 'Iniciante'
    const ProgressoAulas = 1
    const ProgressoExercicios = 50
    const diasOfensiva = 10

    const progresso = `bg-blue-950 w-[${ProgressoAulas}%] h-full rounded-xl`

    return <Layout children={
        <div className='flex flex-col'>
            <div className=' flex flex-wrap lg:flex-nowrap mb-5'>
                <div className='bg-purple-950 rounded-3xl w-full lg:w-1/2 h-auto m-2 p-4'> {/* Informações do usuario */}
                    <div className='flex'> {/* Imagem e nome do usuario */}
                        <img className='rounded-full ' src="21.png" alt="" />
                        <div className='ml-2'>
                            <p className='font-bold text-3xl text-white'> Bem Vindo {UserName}</p>
                            <p className='text-white text-2xl'> Nivél : {Nivel}</p>
                        </div>
                    </div>
                    <div className='m-3'> {/* Progresso do usuario */}
                        <div>
                            <div className='flex justify-between'>
                                <p className='text-white'>Aulas</p> <p className='text-white'>{ProgressoAulas}%</p>
                            </div>
                            <div className=''> {/* Barra de progresso */}
                                <div className='bg-white w-full h-2 rounded-xl'>
                                    <div className={progresso}></div>
                                </div>
                            </div>
                        </div>
                        <div>
                            <div className='flex justify-between'>
                                <p className='text-white'>Exercicios</p> <p className='text-white'>{ProgressoExercicios}%</p>
                            </div>
                            <div className=''> {/* Barra de progresso */}
                                <div className='bg-purple-600 w-full h-2 rounded-xl'>
                                    <div className='bg-purple-900 w-1/2 h-full rounded-xl'></div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className='flex w-full lg:w-1/2 h[220px]'> {/* Noticias */}

                    <div className=' w-1/2 h-full'> {/* Novidades */}
                        <div className='bg-purple-950 h-1/2 rounded-3xl m-2 p-3'>
                            <p className='text-white font-bold text-2xl'>
                                Mais 50 Palavras adicionadas no nosso dicionario na ultima semana
                            </p>
                        </div>
                        <div className='bg-purple-950 h-1/2 rounded-3xl m-2 p-10'>
                            <p className='text-white font-bold text-2xl'> Novo Quiz disponivel</p>
                        </div>
                    </div>
                    <div className='p-5 w-1/2 h-full relative bg-purple-950 rounded-3xl m-2 overflow-hidden z-10'> {/* Ofensiva */}

                        <div className='relative z-10'>
                            <p className='w-full font-bold p-2 text-white text-2xl text-center'>
                                Não deixe sua ofensiva acabar!
                            </p>
                            <p className='text-9xl font-bold text-white'>{diasOfensiva}</p>
                        </div>
                        <div className='absolute z-0 left-2/4 bottom-0 w-2/3'>
                            <img src={Flame} alt="Flame Icon" />
                        </div>
                    </div>
                </div>
            </div>
            <div className='flex flex-wrap lg:flex-nowrap gap-2 m-2'> {/* Botões */}
                <ButtonDashboard nome='Aulas' Icone={BookOpen} rota='/aulas/' />
                <ButtonDashboard nome='Exercicios' Icone={Book} rota='/exercicios/' />
                <ButtonDashboard nome='Quiz Diario' Icone={Lightbulb} rota='/quiz/' />
                <div className='bg-purple-600 w-full h-32 rounded-xl'>
                    <h2>Ranking </h2>
                </div>
            </div>
        </div>
    } />

}
