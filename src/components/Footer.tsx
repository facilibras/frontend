import { Github, Youtube } from "lucide-react";
import Logo from '../assets/logo.webp'
import { Link } from "@tanstack/react-router";
import { useUserStore } from "../store/user";


export default function Footer() {

    const { states: { user } } = useUserStore();


    return (
        <footer id="contato" className="bg-gray-900 text-white pt-6 pb-3 h-auto">
            <div className="container mx-auto px-4">
                <div className="grid md:grid-cols-4 gap-8 mb-8">
                    <div>
                        <div className="flex items-center mb-4">
                            <img src={Logo} alt="Logo" width={44} height={44} />

                            <h3 className="text-2xl font-bold ml-2">Facilibras</h3>
                        </div>
                        <p className="text-gray-400 mb-4">Facilitando o aprendizado da Língua Brasileira de Sinais.</p>
                        <div className="flex gap-4">
                            <a href="#"
                                className="w-10 h-10 bg-gray-800 rounded-full flex items-center justify-center text-gray-300 hover:text-white hover:bg-red-600 transition">
                                <Youtube size={20} />
                            </a>
                            <a href="#"
                                className="w-10 h-10 bg-gray-800 rounded-full flex items-center justify-center text-gray-300 hover:text-white hover:bg-black transition">
                                <Github size={20} />
                            </a>
                        </div>
                    </div>

                    {/* <div>
                        <h4 className="text-lg font-semibold mb-4">Links Úteis</h4>
                        <div className="space-y-2 flex flex-col">
                            <Link className="text-gray-400 hover:text-white transition" to="/dashboard"> Página Inicial</Link>
                            <Link className="text-gray-400 hover:text-white transition" to="/exercicios">Exercícios</Link>
                            <Link className="text-gray-400 hover:text-white transition" to="/perfil/$idUsuario" params={{
                                idUsuario: user?.id_usuario.toString() || "1"
                            }}>Perfil</Link>
                            <Link className="text-gray-400 hover:text-white transition" to="/ranking">Ranking</Link>
                        </div>
                    </div>

                    <div>
                        <h4 className="text-lg font-semibold mb-4">Aprenda Sinais em Libras</h4>
                        <ul className="space-y-2">
                            <li><a href="#" className="text-gray-400 hover:text-white transition">Categoria: Letras</a></li>
                            <li><a href="#" className="text-gray-400 hover:text-white transition">Categoria: Números</a></li>
                            <li><a href="#" className="text-gray-400 hover:text-white transition">Categoria: Saudações</a></li>
                            <li><a href="#" className="text-gray-400 hover:text-white transition">Ver todas categorias</a></li>
                        </ul>
                    </div>

                    <div>
                        <h4 className="text-lg font-semibold mb-4">Contato</h4>
                        <ul className="space-y-3">
                            <li className="flex items-start gap-3">
                                <i className="fas fa-envelope mt-1 text-blue-400"></i>
                                <span className="text-gray-400"></span>
                            </li>
                        </ul>
                    </div> */}
                </div>

                <div className="border-t border-gray-800 pt-6 flex flex-col md:flex-row justify-between items-center">
                    <p className="text-gray-400 mb-4 md:mb-0">© {new Date().getFullYear()} Facilibras. Todos os direitos reservados.</p>
                </div>
            </div>
        </footer>
    )
}