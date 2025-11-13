import { LogIn } from "lucide-react"
import Logo from '../../assets/logo.webp'
import { Button } from "../ui/button"
import { Link } from "@tanstack/react-router"

export const Navbar = () => {
    return (
        <header className="bg-white shadow-md">
            <div className="container mx-auto px-4 py-6 flex flex-col md:flex-row justify-between items-center">
                <div className="flex items-center justify-center mb-4 md:mb-0">
                    <img src={Logo} alt="Logo" width={44} height={44} />
                    <h1 className="text-4xl font-bold text-blue-600">Facilibras</h1>
                </div>

                <nav aria-label="Navegação principal">
                    <ul className="flex items-center flex-wrap gap-4 md:gap-8">
                        <li><a href="#inicio" className="text-blue-600 font-medium hover:text-blue-800 transition">Início</a>
                        </li>
                        <li><a href="#exercicios" className="text-gray-700 hover:text-blue-600 transition">Exercícios</a>
                        </li>
                        <li><a href="#contato" className="text-gray-700 hover:text-blue-600 transition">Contato</a></li>
                         <li>
                            <Link to="/login">
                                <Button className="bg-blue-400 border border-blue-400 cursor-pointer hover:bg-blue-600 text-white transition-all duration-300  flex items-center">
                                    <LogIn className="w-4 h-4 mr-2" />Login
                                </Button>
                            </Link>
                        </li>
                    </ul>
                </nav>
            </div>
        </header>
    )
}