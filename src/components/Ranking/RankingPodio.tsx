import { RankingUser } from "../../Models/RankingUser"
import NoUser from '../../assets/noUser.webp'

interface RankingPodioProps {
  users: RankingUser[]
}

export const RankingPodio = ({ users }: RankingPodioProps) => {
    return (
         <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
                    {/* Segundo lugar */}
                    <div className="bg-white rounded-xl shadow-md p-6 text-center relative scale-[1.05] z-[5]">
                        <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                            <div className="w-12 h-12 bg-gray-300 rounded-full flex items-center justify-center text-white font-bold text-xl">
                                2
                            </div>
                        </div>
                        <div className="mt-8">
                            <img src={users[1]?.imagemPerfil ?? NoUser} alt="Foto de perfil"
                                className="w-20 h-20 rounded-full mx-auto mb-4 border-4 border-gray-300" />
                            <h3 className="text-xl font-bold text-gray-800">{users[1]?.nomeOuApelido ?? 'Usuário Desconhecido'}</h3>
                            <div className="bg-gray-100 rounded-lg py-2 px-4">
                                <span className="font-bold text-gray-800">{users[1]?.sinaisPeriodo ?? 0} sinais</span>
                            </div>
                        </div>
                    </div>

                    <div className="bg-white rounded-xl shadow-lg p-8 text-center relative scale-[1.1] z-10">
                        <div className="absolute -top-6 left-1/2 transform -translate-x-1/2">
                            <div className="w-16 h-16 bg-yellow-400 rounded-full flex items-center justify-center text-white font-bold text-2xl shadow-lg">
                                1
                            </div>
                        </div>
                        <div className="mt-10">
                            <img src={users[0]?.imagemPerfil ?? NoUser} alt="Foto de perfil"
                                className="w-24 h-24 rounded-full mx-auto mb-4 border-4 border-yellow-400" />
                            <h3 className="text-2xl font-bold text-gray-800">{users[0]?.nomeOuApelido ?? 'Usuário Desconhecido'}</h3>
                            <div className="bg-yellow-50 rounded-lg py-3 px-6">
                                <span className="font-bold text-yellow-400">{users[0]?.sinaisPeriodo ?? 0} sinais</span>
                            </div>
                        </div>
                    </div>

                    <div className="bg-white rounded-xl shadow-md p-6 text-center relative scale-[1.02] z-[3]">
                        <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                            <div className="w-12 h-12 bg-amber-700 rounded-full flex items-center justify-center text-white font-bold text-xl">
                                3
                            </div>
                        </div>
                        <div className="mt-8">
                            <img src={users[2]?.imagemPerfil ?? NoUser} alt="Foto de perfil" className="w-20 h-20 rounded-full mx-auto mb-4 border-4 border-amber-700" />
                            <h3 className="text-xl font-bold text-gray-800">{users[2]?.nomeOuApelido ?? 'Usuário Desconhecido'}</h3>
                            <div className="bg-amber-50 rounded-lg py-2 px-4">
                                <span className="font-bold text-amber-700">{users[2]?.sinaisPeriodo ?? 0} sinais</span>
                            </div>
                        </div>
                    </div>
                </div>
    )
}