import {
    DropdownMenu,
    DropdownMenuTrigger,
    DropdownMenuContent,
    DropdownMenuItem
} from "./ui/dropdown-menu"
import { Link, useNavigate } from '@tanstack/react-router'
import { useUserStore } from '../store/user'
import { AlignJustify, User2 } from 'lucide-react'
import { useSidebar } from "./ui/sidebar"

export default function DefaultNavBar() {

    const { states: { user } } = useUserStore();
    const { toggleSidebar } = useSidebar()
    const navigate = useNavigate()

    const Deslogar = () => {
        localStorage.removeItem("token")
        navigate({ to: "/" })
    }


    return <>
        <div className="flex items-center justify-between p-4 w-full bg-sidebar shadow-md">
            <button onClick={toggleSidebar} className="bg-blue-500 rounded-full hover:bg-blue-600 transition-all duration-300 px-2 cursor-pointer">
                <AlignJustify color="white" />
            </button>

            <DropdownMenu>
                <DropdownMenuTrigger asChild>
                    <div className="flex flex-col items-center justify-center rounded-full p-3 bg-black hover:bg-zinc-400 text-white hover:text-white ">
                        <User2 color="white" />
                    </div>
                </DropdownMenuTrigger>
                <DropdownMenuContent
                    side="right"
                    className="w-[--radix-popper-anchor-width] mt-4"
                >
                    <DropdownMenuItem>
                        <Link to="/perfil/$idUsuario" params={{ idUsuario: user?.id_usuario.toString() ?? '' }}
                            className="w-full"
                        > <p className="text-black w-full"> Perfil</p> </Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem>
                        <span> Configurações </span>
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={Deslogar}>
                        <span> Sair </span>
                    </DropdownMenuItem>
                </DropdownMenuContent>
            </DropdownMenu>
        </div>
    </>
}