import { Link } from "@tanstack/react-router"
import { Book, } from "lucide-react"
import {
    Sidebar,
    SidebarContent,
    SidebarGroup,
    SidebarGroupLabel,
    SidebarHeader,
} from "./ui/sidebar"
import { useEffect, useState } from "react"
import { backendConnection } from "../utils/axios"
import { exercicio, secao } from "../const/exercicios.const"
import { GetExerciciosSecoes } from "../Services/GetExerciciosSecoes"

export function AppSidebar() {

    const [exercicios, setExercicios] = useState<exercicio[]>([])
    const [secoes, setSecoes] = useState<secao[]>([])
    async function getExercicios() {

        const getexercicios = await backendConnection.useAxiosConnection({
            method: 'GET',
            path: '/exercicios',
        })
        if (getexercicios) {
            setExercicios(getexercicios)
        }
    }
    async function getSecoes() {
        try {
            const secoesData = await GetExerciciosSecoes();
            console.log(secoesData)
            if (secoesData) {
                setSecoes(secoesData);
            }
        }
        catch (error) {
            console.error("Error in getSecoes:", error);
        }
    }

    async function getExerciciosPorSecao(nome: string): Promise<exercicio[]> {
        const exerciciosData = await backendConnection.useAxiosConnection({
            method: 'GET',
            path: `exercicios/secao/${nome}`,
        })
        return exerciciosData
    }

    useEffect(() => {

        getSecoes()
        getExercicios()
    }, [])

    return (
        <Sidebar>
            <SidebarHeader className="text-center">
                <Link to="/dashboard"><p className="font-bold text-2xl text-black">Facilibras</p></Link>
            </SidebarHeader>
            <SidebarContent>
                {
                    secoes.map((secao, index) => (
                        <SidebarGroup key={index} >
                            <SidebarGroupLabel>
                                {secao.nome}
                            </SidebarGroupLabel>
                            {
                                exercicios.filter(exercicio => exercicio.secao === secao.nome).map((exercicioFiltrado: exercicio, idx) => (
                                    !exercicioFiltrado.status && (
                                        <div className="flex justify-start items-center" key={idx}>
                                            <Book color="black" size={16} className="mr-2" />
                                            <Link to="/exercicios/$categoriaExercicio" params={{ categoriaExercicio: exercicioFiltrado.titulo }} reloadDocument>
                                                <p className="text-black capitalize ">{exercicioFiltrado.titulo.split('_')[0]} {exercicioFiltrado.titulo.replace("_", " ").split(" ")[1]} </p>
                                            </Link>
                                        </div>
                                    )
                                ))
                            }
                        </SidebarGroup>
                    ))
                }
            </SidebarContent>
        </Sidebar>
    )
}
