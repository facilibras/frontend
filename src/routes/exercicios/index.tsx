import Layout from '../../components/Layout'
import { createFileRoute } from '@tanstack/react-router'
import { Link } from '@tanstack/react-router'
import { ProtectedRoute } from '../../components/ProtectedRoute'
import { backendConnection } from '../../utils/axios'
import { useEffect, useState } from 'react'
import { exercicio, secao } from '../../const/exercicios.const'
import { CheckCheck, CirclePlay, ArrowRight, Hourglass } from 'lucide-react'
import { Input } from '../../components/ui/input'
import { Button } from '../../components/ui/button'
import { categoriaColor } from '../../const/cores.const'
import React from 'react'

export const Route = createFileRoute('/exercicios/')({
  component: () => (
    <ProtectedRoute>
      <RouteComponent />
    </ProtectedRoute>
  )
})

function RouteComponent() {

  const [fetchExercicios, setFetchExercicios] = useState([])
  const [exercicios, setExercicios] = useState<exercicio[]>([])
  const [secoes, setSecoes] = useState<secao[]>([])
  const [secaoSelecionada, setSecaoSelecionada] = useState<string | null>(null);

  const exerciciosFiltrados = secaoSelecionada
    ? exercicios.filter((e) => e.secao === secaoSelecionada)
    : exercicios;

  async function getExercicios() {

    const getexercicios = await backendConnection.useAxiosConnection({
      method: 'GET',
      path: '/exercicios',
    })

    if (getexercicios) {
      setExercicios(getexercicios)
      setFetchExercicios(getexercicios)
    }

    const getSecoes = await backendConnection.useAxiosConnection({
      method: 'GET',
      path: '/exercicios/secoes'
    })

    if (getSecoes) {
      setSecoes(getSecoes)
    }
  }

  useEffect(() => {
    getExercicios()
  }, [])

  async function getExerciciosPorSecao(secao: string) {

    const getexercicios = await backendConnection.useAxiosConnection({
      method: 'GET',
      path: `/exercicios/secoes/${secao}`,
    })
    if (getexercicios) {
      setExercicios(getexercicios)
      setSecaoSelecionada(secaoSelecionada === secao ? null : secao)
    }
  }


  return <Layout>
    <div className="flex w-full items-center flex-col gap-4 mt-4 p-5">
      <p className='font-bold text-3xl text-left w-full'> Exercícios </p>

      <div className='flex gap-2 justify-between flex-wrap items-center w-full'>
        <div className='flex gap-2 items-center w-full flex-wrap'>
          {
            secoes.map((secao, index) => (
              <Button
                key={index}
                onClick={() =>{
                  
                  if (secaoSelecionada === secao.nome) {
                    setExercicios(fetchExercicios);
                    setSecaoSelecionada(null);
                    return;
                  }
                  getExerciciosPorSecao(secao.nome)
                }
                  
                }
                className={`rounded-md border  text-sm shadow-sm transition-all border-none
                ${secaoSelecionada === secao.nome
                    ? "bg-blue-600 text-white border-blue-600 hover:bg-blue-800"
                    : "border-slate-300 text-slate-600 hover:bg-slate-100 bg-white"
                  }`}
              >
                {secao.nome}
                <span className={`p-2 w-full text-md
                    ${secaoSelecionada === secao.nome
                      ? " text-white"
                      : " text-gray-700"
                    }
                  `}>
                  {secao.qtdEx}
                </span>
              </Button>
            ))
          }
        </div>
        <div>
          <Input
            type="text"
            placeholder="Pesquisar exercício..."
            className="w-64 border-2 border-black"
            onChange={(e) => {
              const searchTerm = e.target.value.toLowerCase();
              if (searchTerm === "") {
                setExercicios(fetchExercicios);
                return;
              }
              setExercicios((prev) =>
                prev.filter((ex) =>
                  ex.titulo.toLowerCase().includes(searchTerm)
                )
              );
            }}
          />
        </div>
      </div>

      <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 w-full'>

        {
          exerciciosFiltrados.map((exercicio) => (
            <Link
              to="/exercicios/$categoriaExercicio"
              params={{ categoriaExercicio: exercicio.titulo }}
              key={exercicio.titulo}
              className="w-full"
            >
              <div className="sign-card bg-white rounded-xl shadow-md overflow-hidden transform hover:-translate-y-1 transition">
                <div
                  className={`h-48 ${categoriaColor[exercicio.secao]?.bg || "bg-gray-100"
                    } flex items-center justify-center relative`}
                >
                  <div className="flex flex-col items-center justify-center h-full">
                    
                    {
                      categoriaColor[exercicio.secao].icon &&
                      React.createElement(categoriaColor[exercicio.secao].icon, { size: 50, color: categoriaColor[exercicio.secao].hex } )
                    }
                    
                    <p className={`font-medium ${categoriaColor[exercicio.secao]?.texto || "text-gray-700"}`}>
                      Praticar agora
                    </p>
                  </div>
                  <span
                    className={`absolute top-3 left-3 ${categoriaColor[exercicio.secao]?.bgColor || "bg-gray-500"
                      } text-white text-xs px-2 py-1 rounded`}
                  >
                    Básico
                  </span>
                </div>
                <div className="p-4">
                  <div className="flex justify-between items-center mb-2">
                    <h3 className="text-xl text-center font-semibold text-gray-800 mb-2 capitalize">
                      {exercicio.titulo.split("_")[0]}{" "}
                      {exercicio.titulo.split("_")[1]?.toLocaleUpperCase()}
                    </h3>
                    <div>
                      {exercicio.status == null ? (
                        <Hourglass color="red" size={20} />
                      ) : (
                        <CheckCheck color="green" />
                      )}
                    </div>
                  </div>
                  <div className="flex justify-between items-center">
                    <div className="flex items-center gap-1">
                      <CirclePlay
                        className={
                          categoriaColor[exercicio.secao]?.texto ||
                          "text-gray-700"
                        }
                        size={20}
                      />
                      <span className="text-xs text-gray-500">

                        {exercicio.variacao == null ? " 1 Variação" : "2 Variações"}
                      
                      </span>
                    </div>
                    <div className="flex justify-center items-center gap-2">
                      <button
                        className={`${categoriaColor[exercicio.secao]?.texto ||
                          "text-gray-700"
                          } hover:text-blue-800 font-medium text-sm transition`}
                      >
                        Praticar
                      </button>
                      <ArrowRight
                        className={`${categoriaColor[exercicio.secao]?.texto || "text-gray-700"} transition-transform group-hover:translate-x-1`}
                        size={15}
                      />
                    </div>
                  </div>
                </div>
              </div>
            </Link>
          ))}
      </div>
    </div>
  </Layout>
}
