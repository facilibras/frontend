import { Link } from "@tanstack/react-router"
import { Book, User2, ChevronRight } from "lucide-react"
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
    const UserName = `${user?.nome_usuario.split(" ")[0]} ${user?.nome_usuario.split(" ")[2][0].toUpperCase()}.` || 'Convidado'
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
                                        <Link to="/exercicios/$categoriaExercicio" params={{ categoriaExercicio: exercicio.titulo }} reloadDocument>
                                            <p className="text-black capitalize ">{exercicio.titulo.split('_')[0]} {exercicio.titulo.replace("_"," ").split(" ")[1]} </p>
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
        </Sidebar>
    )
}
