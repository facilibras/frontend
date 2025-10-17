import { Link } from "@tanstack/react-router"
import { RankingUser } from "../../Models/RankingUser"
import { TooltipContent } from "../ui/tooltip"

interface RankingPodioProps {
  user: RankingUser
}

export const RankingInfoUserPopUp = ({ user }: RankingPodioProps) => {
    return (
            <TooltipContent className="bg-white border border-gray-300" side="left" align="end">
                <div className="flex items-center mb-4">
                    <img src={user.imagemPerfil} alt="Foto de perfil" className="w-16 h-16 rounded-full mr-4" />
                    <div>
                        <h4 className="font-bold text-gray-800 truncate">{user.nomeOuApelido}</h4>
                        <div className="flex items-center mt-1"></div>
                    </div>
                </div>

                <div className="grid grid-cols-2 gap-2 mb-4">
                    <div className="bg-blue-50 p-2 rounded text-center">
                        <div className="font-bold text-blue-600">{user.totalSinais}</div>
                        <div className="text-xs text-gray-600">Sinais</div>
                    </div>
                    <div className="bg-purple-50 p-2 rounded text-center">
                        <div className="font-bold text-purple-600">{user.pontos}</div>
                        <div className="text-xs text-gray-600">Pontos</div>
                    </div>
                </div>

                <Link to={user.linkPerfil}>
                    <button className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition">Ver Perfil</button>
                </Link>
            </TooltipContent>
    )
}