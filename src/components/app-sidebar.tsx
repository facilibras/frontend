import { Link } from "@tanstack/react-router"
import { Book, User2,ChevronUp } from "lucide-react"
import { DropdownMenu,DropdownMenuTrigger,DropdownMenuContent,DropdownMenuItem } from "./ui/dropdown-menu"
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
import {useUserStore} from '../store/user'

export function AppSidebar() {

    const { states: { user }} = useUserStore();

    return (
        <Sidebar>
            <SidebarHeader className="text-center">
                <Link to="/dashboard"><p className="font-bold text-2xl text-black">Facilibras</p></Link>
            </SidebarHeader>
            <SidebarContent>
                <SidebarGroup >
                    <SidebarGroupLabel>Exercícios</SidebarGroupLabel>

                    <div className="flex justify-start items-center">
                        <Book color="black" size={16} className="mr-2" />
                        <Link to="/exercicios/$categoriaExercicio" params={{ categoriaExercicio: 'dias-do-mes' }}>
                            <p className="text-black">Dias do mes</p>
                        </Link>
                    </div>
                    <div className="flex justify-start items-center">
                        <Book color="black" size={16} className="mr-2" />
                        <Link to="/exercicios/$categoriaExercicio" params={{ categoriaExercicio: 'dias-da-semana' }}>
                            <p className="text-black">Dias da Semana</p>
                        </Link>
                    </div>
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
                                    <User2 color="white"/> 
                                    {user?.nome_usuario || 'Usuario'}
                                    <ChevronUp className="ml-auto" />
                                </SidebarMenuButton>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent
                                side="top"
                                className="w-[--radix-popper-anchor-width]"
                            >
                                <DropdownMenuItem>
                                    <span>Account</span>
                                </DropdownMenuItem>
                                <DropdownMenuItem>
                                    <span>Billing</span>
                                </DropdownMenuItem>
                                <DropdownMenuItem>
                                    <span>Sign out</span>
                                </DropdownMenuItem>
                            </DropdownMenuContent>
                        </DropdownMenu>
                    </SidebarMenuItem>
                </SidebarMenu>
            </SidebarFooter>
        </Sidebar>
    )
}
