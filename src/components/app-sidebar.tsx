import { Link } from "@tanstack/react-router"
import { Book, User2, ChevronUp } from "lucide-react"
import { DropdownMenu, DropdownMenuTrigger, DropdownMenuContent, DropdownMenuItem } from "./ui/dropdown-menu"
import {
    Sidebar,
    SidebarContent,
    SidebarFooter,
    SidebarGroup,
    SidebarGroupLabel,
    SidebarHeader,
    SidebarMenu,
    SidebarMenuItem,
    SidebarMenuButton,


} from "./ui/sidebar"
import { useUserStore } from '../store/user'
import { useEffect, useState } from "react"
import { backendConnection } from "../utils/axios"
import { exercicio } from "../const/exercicios.const"
import { useNavigate } from "@tanstack/react-router"

export function AppSidebar() {

    const { states: { user } } = useUserStore();

    const navigate = useNavigate()
    const [exercicios, setExercicios] = useState<exercicio[]>([])

    async function getExercicios() {

        const getexercicios = await backendConnection.useAxiosConnection({
            method: 'GET',
            path: '/exercicios',
        })
        if (getexercicios) {
            setExercicios(getexercicios)
        }
    }

    useEffect(() => {
        getExercicios()
    }, [])

    const Deslogar = () => {
        localStorage.removeItem("token")
        navigate({to:"/login"})
    }

    return (
        <Sidebar>
            <SidebarHeader className="text-center">
                <Link to="/dashboard"><p className="font-bold text-2xl text-black">Facilibras</p></Link>
            </SidebarHeader>
            <SidebarContent>
                <SidebarGroup >
                    <SidebarGroupLabel>Exercícios</SidebarGroupLabel>
                    {
                        exercicios.map((exercicio, index) => {
                            if (exercicio.status == null && index < 10) {
                                return (
                                    <div className="flex justify-start items-center" key={exercicio.titulo}>
                                        <Book color="black" size={16} className="mr-2" />
                                        <Link to="/exercicios/$categoriaExercicio" params={{ categoriaExercicio: exercicio.titulo }}>
                                            <p className="text-black">{exercicio.titulo.split('_')[0]} {exercicio.titulo.replace("_"," ").split(" ")[1].toUpperCase()} </p>
                                        </Link>
                                    </div>
                                )
                            }
                        })
                    }
                </SidebarGroup>
                <SidebarGroup >
                    <SidebarGroupLabel>
                        Aulas
                    </SidebarGroupLabel>
                </SidebarGroup>
            </SidebarContent>
            <SidebarFooter>
                <SidebarMenu>
                    <SidebarMenuItem>
                        <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                                <SidebarMenuButton className="text-white hover:text-white">
                                    <User2 color="white" />
                                    {user?.nome_usuario || 'Usuario'}
                                    <ChevronUp className="ml-auto" />
                                </SidebarMenuButton>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent
                                side="top"
                                className="w-[--radix-popper-anchor-width]"
                            >
                                <DropdownMenuItem onClick={Deslogar}>
                                    <span> Sair </span>
                                </DropdownMenuItem>
                            </DropdownMenuContent>
                        </DropdownMenu>
                    </SidebarMenuItem>
                </SidebarMenu>
            </SidebarFooter>
        </Sidebar>
    )
}
