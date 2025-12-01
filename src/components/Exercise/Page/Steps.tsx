import { Link } from "@tanstack/react-router"
import { ArrowBigRight, AlignJustify, ChevronRight, RotateCwIcon } from "lucide-react"
import { exercicio } from "../../../const/exercicios.const"

interface ExercicioProps {
    exercicio: exercicio;
}

export const Steps = ({ exercicio }: ExercicioProps) => {

    return (
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


                        <a className="cursor-pointer transition" href="#">
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
    )
}