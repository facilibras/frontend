export const HowItWorksSection = () => {
    return (
          <section id="aprender" className="mb-20 w-full">
            <div className="text-center mb-12">
                <h2 className="text-3xl font-bold text-gray-800 mb-4">Como Aprender com a Facilibras</h2>
                <p className="text-lg text-gray-600 max-w-3xl mx-auto">Nosso sistema de reconhecimento de gestos torna o
                    aprendizado de Libras interativo e divertido.</p>
            </div>

            <div className="grid md:grid-cols-3 gap-8">
                <div className="bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition">
                    <div
                        className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center text-blue-600 text-2xl mb-4">
                        1
                    </div>
                    <h3 className="text-xl font-semibold text-gray-800 mb-3">Assista ao Vídeo</h3>
                    <p className="text-gray-600">Veja demonstrações dos sinais em Libras, com explicações detalhadas.</p>
                </div>

                <div className="bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition">
                    <div
                        className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center text-blue-600 text-2xl mb-4">
                        2
                    </div>
                    <h3 className="text-xl font-semibold text-gray-800 mb-3">Pratique o Sinal</h3>
                    <p className="text-gray-600">Use sua câmera para reproduzir os gestos. Nosso sistema reconhece seus
                        movimentos em tempo real.</p>
                </div>

                <div className="bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition">
                    <div
                        className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center text-blue-600 text-2xl mb-4">
                        3
                    </div>
                    <h3 className="text-xl font-semibold text-gray-800 mb-3">Receba Feedback</h3>
                    <p className="text-gray-600">Obtenha avaliação instantânea sobre sua precisão e dicas para melhorar cada
                        sinal.</p>
                </div>
            </div>
        </section>
    )
}