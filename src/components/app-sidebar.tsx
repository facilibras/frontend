import { Link } from "@tanstack/react-router"
import Logo from '../assets/logo.webp'
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
import { Colors } from "../utils/ColorsCard"
import React from "react"

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
            if (secoesData) {
                setSecoes(secoesData);
            }
        }
        catch (error) {
            console.error("Error in getSecoes:", error);
        }
    }
    useEffect(() => {
        getSecoes()
        getExercicios()
    }, [])

    return (
        <Sidebar>
            <SidebarHeader className="highcontrast:bg-black">

                <Link to="/dashboard" >
                    <div className="text-center flex justify-center gap-3 dark:bg-gray-900 highcontrast:bg-black">
                        <img src={Logo} alt="Logo" width={44} height={44} />
                        <p className="font-bold text-2xl text-black dark:text-white highcontrast:text-yellow-300">Facilibras</p>
                    </div>
                </Link>

            </SidebarHeader>
            <SidebarContent className="w-full highcontrast:bg-black">
                {
                    secoes.map((secao, index) => (
                        <SidebarGroup key={index}>
                            <SidebarGroupLabel >
                                <div className="w-full">
                                    <p className={`${Colors[secao.nome].textColor}`}>{secao.nome}</p>
                                    <hr className={`bg-blue-500 w-full border-1`} />
                                </div>

                            </SidebarGroupLabel>
                            {
                                exercicios.filter(exercicio => exercicio.secao === secao.nome).slice(0, 3).map((exercicioFiltrado: exercicio, idx) => (
                                    !exercicioFiltrado.status && (
                                        <div className="flex justify-start items-center" key={idx}>

                                            {React.createElement(Colors[secao.nome].Icon, { className: `${Colors[secao.nome].iconColor} mr-2`, size: 16 })}
                                            <Link to="/exercicios/$categoriaExercicio" params={{ categoriaExercicio: exercicioFiltrado.titulo }} reloadDocument>
                                                <p className="text-black capitalize dark:text-white highcontrast:text-yellow-300">

                                                    {exercicioFiltrado.titulo.split('_')[0]} {exercicioFiltrado.titulo.split("_")[1]} {exercicioFiltrado.titulo.split("_")[2] ? "- Variação" : ""}
                                                </p>
                                            </Link>
                                        </div>
                                    )
                                ))
                            }
                        </SidebarGroup>
                    ))
                }
            </SidebarContent>
        </Sidebar >
    )
}

