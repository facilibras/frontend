import { RankingUser } from "../../Models/RankingUser"
import { Tooltip, TooltipTrigger } from "../ui/tooltip"
import { RankingInfoUserPopUp } from "./RankingInfoUserPopUp"
import React, { useEffect, useState } from "react"
import NoUser from '../../assets/noUser.webp'

interface RankingPodioProps {
    user: RankingUser,
    ranking?: number
}

export const RankingInfoUser = ({
    user,
    ranking
}: RankingPodioProps) => {

    const [imageUrl, setImageUrl] = useState<null | string>(null);

    useEffect(() => {
        
        const imagemData = user.imagemPerfil;

        if (imagemData && imagemData instanceof Blob) {

            const url = URL.createObjectURL(imagemData);
            setImageUrl(url);

            return () => {
                URL.revokeObjectURL(url);
            };
        }

    }, [user.imagemPerfil]);


    return (
        <Tooltip>
            <TooltipTrigger asChild>
                <div className="flex items-center p-4 hover:bg-gray-50 rounded-lg transition">
                    <div className="inline-flex items-center justify-center w-8 h-8 bg-gray-200 font-semibold rounded-full mr-4 text-gray-600">{ranking}</div>
                    {
                        typeof (user.imagemPerfil) === 'string' ?
                            React.createElement("div", {
                                dangerouslySetInnerHTML: { __html: user.imagemPerfil },
                                className: "w-12 h-12 rounded-full mr-4"
                            }) :

                            <img src={imageUrl ?? NoUser} alt="Foto de perfil"
                                className="w-12 h-12 rounded-full mr-4"
                            />
                    }
                    <div className="flex-grow">
                        <h4 className="font-bold text-gray-800 truncate">{user.nomeOuApelido}</h4>
                    </div>
                    <div className="text-right">
                        <span className="font-bold text-gray-800">{user.sinaisPeriodo} sinais</span>
                    </div>
                </div>
            </TooltipTrigger>

            <RankingInfoUserPopUp user={user} urlImagem={imageUrl}/>
        </Tooltip>
    )
}