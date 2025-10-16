import { Camera, CheckCircle, CircleAlert, Hand, Move, Smile, XCircle } from "lucide-react"

export const DemoSection = () => {
    return (
        <section id="demonstracao" className="mb-20 bg-blue-50 rounded-2xl p-8 md:p-12">
            <div className="flex flex-col md:flex-row items-center gap-12">
                <div className="md:w-1/2">
                    <h2 className="text-3xl font-bold text-gray-800 mb-6">Experimente Nosso Reconhecimento de Gestos</h2>
                    <p className="text-lg text-gray-600 mb-6">A tecnologia da Facilibras analisa a posição das suas mãos,
                        expressões faciais e movimentos corporais para te ajudar a aprender os sinais corretamente.</p>

                    <div className="space-y-4">
                        <div className="flex items-start gap-4">
                            <div
                                className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center text-blue-600 mt-1">
                                <Hand className="w-5 h-5" />
                            </div>
                            <div>
                                <h4 className="font-medium text-gray-800">Posição das Mãos</h4>
                                <p className="text-gray-600">Detectamos a forma exata que suas mãos devem fazer para cada
                                    sinal.</p>
                            </div>
                        </div>

                        <div className="flex items-start gap-4">
                            <div
                                className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center text-blue-600 mt-1">
                                <Smile className="w-5 h-5" />
                            </div>
                            <div>
                                <h4 className="font-medium text-gray-800">Expressões Faciais</h4>
                                <p className="text-gray-600">Acompanhamos suas expressões que são fundamentais na Libras.
                                </p>
                            </div>
                        </div>

                        <div className="flex items-start gap-4">
                            <div
                                className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center text-blue-600 mt-1">
                                <Move className="w-5 h-5" />
                            </div>
                            <div>
                                <h4 className="font-medium text-gray-800">Movimentos</h4>
                                <p className="text-gray-600">Analisamos a direção e fluidez dos seus gestos.</p>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="md:w-1/2 h-full">
                    <div className="bg-white p-6 rounded-xl shadow-lg">
                        <div className="aspect-w-16 aspect-h-9 bg-gray-100 rounded-lg overflow-hidden mb-4">
                            <div className="h-32 flex items-center justify-center">
                                <Camera size={64} className=" text-gray-400" />
                            </div>
                        </div>

                        <div className="bg-gray-100 rounded-lg p-4">
                            <div className="flex items-center justify-between mb-2">
                                <span className="font-medium text-gray-700">Sinal: "Oi"</span>
                                <span className="text-sm bg-blue-100 text-blue-800 px-2 py-1 rounded">Novo</span>
                            </div>
                            <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
                                <div className="h-full bg-green-500 rounded-full" style={{ width: '65%' }}></div>
                            </div>
                            <div className="flex justify-between text-xs text-gray-600 mt-1">
                                <span>0%</span>
                                <span>65% de precisão</span>
                                <span>100%</span>
                            </div>
                            <div className="mt-3 text-sm text-gray-700">
                                <p><CheckCircle className="inline-block w-4 h-4 mr-1 text-green-500" /> Posição da mão: 80% correta
                                </p>
                                <p><CircleAlert className="inline-block w-4 h-4 mr-1 text-yellow-500" /> Movimento: 50% correto
                                </p>
                                <p><XCircle className="inline-block w-4 h-4 mr-1 text-red-500" /> Expressão facial: não detectada
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )

}