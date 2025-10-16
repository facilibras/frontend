import { Link } from "@tanstack/react-router"
import { UserPlus } from "lucide-react"

export const ReadyToStart = () => {
    return (
        <section className="mb-20 bg-gradient-to-r from-blue-600 to-blue-800 rounded-2xl p-8 md:p-12 text-white">
            <div className="max-w-4xl mx-auto text-center">
                <h2 className="text-3xl md:text-4xl font-bold mb-6">Pronto para começar sua jornada em Libras?</h2>
                <p className="text-xl mb-8 opacity-90">Dê o primeiro passo para aprender Libras com uma plataforma feita
                    para facilitar seu aprendizado.</p>
                
                <Link to="/login">
                    <button
                        className="bg-white cursor-pointer hover:bg-gray-100 text-blue-600 font-bold py-4 px-8 rounded-full text-lg transition flex items-center gap-2 mx-auto">
                        <UserPlus className="h-5 w-5" /> <span>Criar Conta Gratuita</span>
                    </button>
                </Link>
            </div>
        </section>
    )
}