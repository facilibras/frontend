import { createFileRoute } from '@tanstack/react-router'
import { BookOpen, Book, Lightbulb, Flame } from 'lucide-react'
import { ButtonDashboard } from '../../components/ButtonDashboard'
import BarraLateral from '../../components/BarraLateral'

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

    return <>
        <BarraLateral Painel={
            <div className='flex flex-col'>
            <div className=' flex flex-wrap lg:flex-nowrap'>
                <div className='bg-purple-950 rounded-3xl w-1/2 h-auto m-2'> {/* Informações do usuario */}
                    <div className='flex'> {/* Imagem e nome do usuario */}
                        <img className='rounded-full ' src="21.png" alt="" />
                        <div>
                            <p className='font-bold text-3xl'> Bem Vindo {UserName}</p>
                            <p> Nivél : {Nivel}</p>
                        </div>
                    </div>
                    <div className='m-3'> {/* Progresso do usuario */}
                        <div>
                            <div className='flex justify-between'>
                                <p>Aulas</p> <p>{ProgressoAulas}%</p>
                            </div>
                            <div className=''> {/* Barra de progresso */}
                                <div className='bg-white w-full h-2 rounded-xl'>
                                    <div className={progresso}></div>
                                </div>
                            </div>
                        </div>
                        <div>
                            <div className='flex justify-between'>
                                <p>Exercicios</p> <p>{ProgressoExercicios}%</p>
                            </div>
                            <div className=''> {/* Barra de progresso */}
                                <div className='bg-purple-600 w-full h-2 rounded-xl'>
                                    <div className='bg-purple-900 w-1/2 h-full rounded-xl'></div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className='flex w-1/2 h-[220px]'> {/* Noticias */}

                    <div className=' w-1/2 h-full'> {/* Novidades */}
                        <div className='bg-purple-950 h-1/2 rounded-sm m-2 p-3'>
                            <p className='text-white font-bold'> Mais 50 Palavras adicionadas no nosso dicionario na ultima semana </p>
                        </div>
                        <div className='bg-purple-950 h-1/2 rounded-sm m-2 p-10'>
                            <p> Novo Quiz disponivel</p>
                        </div>
                    </div>
                    <div className=' w-1/2 h-full bg-purple-950 rounded-2xl m-2'> {/* Ofensiva */}

                        <p className='w-full font-bold'> Não deixe sua ofensiva acabar! </p>
                        <p>{diasOfensiva}</p>
                        <Flame/>

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
        }/> 
    </>
        
    
}
