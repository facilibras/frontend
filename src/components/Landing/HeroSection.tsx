import { Link } from "@tanstack/react-router"
import { Button } from "../ui/button"
import { Info, Play } from "lucide-react"
import LogoHero from '../../assets/logo_hero.webp'

export const HeroSection = () => {
    return (
        <section id="inicio" className="mb-20">
            <div className="flex flex-col md:flex-row items-center gap-8">
                <div className="md:w-1/2">
                    <h2 className="text-4xl md:text-5xl font-bold text-gray-800 mb-6">
                        Aprenda Libras de Forma <span className="text-blue-600">Interativa</span>
                    </h2>
                    
                    <p className="text-lg text-gray-600 mb-8">
                        Facilibras utiliza tecnologia de reconhecimento de gestos para
                        te ajudar a aprender a Língua Brasileira de Sinais de maneira prática.
                    </p>

                    <div className="flex flex-wrap gap-4 mb-8">
                        <Link to="/login">
                            <Button
                                className="cursor-pointer bg-blue-600 hover:bg-blue-700 text-white font-medium py-3 px-6 rounded-lg transition-all duration-300 flex items-center gap-2"
                            >
                                <Play className="w-4 h-4"/>  Começar Agora
                            </Button>
                        </Link>
                        <a href="#demonstracao">
                            <Button
                                className="border border-blue-600 bg-transparent cursor-pointer text-blue-600 hover:bg-blue-50 font-medium py-3 px-6 rounded-lg transition flex items-center gap-2">
                                    <Info className="w-4 h-4"/> Saiba Mais
                            </Button>
                        </a>
                    </div>
                </div>

                <div className="md:w-1/2 px-10 h-[440px] shadow-blue-600 rounded-2xl  flex items-center justify-center">
                    <img src={LogoHero}  alt="Logo Facilibras" className="w-full h-full rounded-4xl aspect-square" />
                </div>
            </div>
        </section>
    )
}