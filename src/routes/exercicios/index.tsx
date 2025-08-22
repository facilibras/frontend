import Layout from '../../components/Layout'
import { createFileRoute } from '@tanstack/react-router'
import { Link } from '@tanstack/react-router'
import { ProtectedRoute } from '../../components/ProtectedRoute'
import { backendConnection } from '../../utils/axios'
import { useEffect, useState } from 'react'
import { exercicio, secao } from '../../const/exercicios.const'
import { CheckCheck, Hand, CirclePlay, ArrowRight, Hourglass } from 'lucide-react'
import { Separator } from '../../components/ui/separator'
import { Checkbox } from '../../components/ui/checkbox'
import { Button } from '../../components/ui/button'

export const Route = createFileRoute('/exercicios/')({
  component: () => (
    <ProtectedRoute>
      <RouteComponent />
    </ProtectedRoute>
  )
})

const categoriaColor: any = {
  "Alfabeto": {
    texto: "text-blue-600",
    bg: "bg-blue-50",
    bgColor: "bg-blue-600"
  },
  "Números": { //["bg-green-50", "text-green-600", "bg-green-600"],
    texto: "text-green-600",
    bg: "bg-green-50",
    bgColor: "bg-green-600"
  },
  "Animais": {
    texto: "text-red-600",
    bg: "bg-red-50",
    bgColor: "bg-red-600"
  },
}

function RouteComponent() {

  const [exercicios, setExercicios] = useState<exercicio[]>([])
  const [secoes, setSecoes] = useState<secao[]>([])
  const [checkeds, setChecked] = useState<Array<string>>([]);
  const [secaoSelecionada, setSecaoSelecionada] = useState<string | null>(null);

  const handleChecked = (value: string) => {
    if (checkeds.includes(value)) {
      setChecked(checkeds.filter((item) => item !== value));

      return;
    }

    setChecked([...checkeds, value]);
  }

  const exerciciosFiltrados = secaoSelecionada
    ? exercicios.filter((e) => e.secao === secaoSelecionada)
    : exercicios;

  async function getExercicios() {

    const getexercicios = await backendConnection.useAxiosConnection({
      method: 'GET',
      path: '/exercicios',
    })
    console.log(getexercicios)

    if (getexercicios) {

      setExercicios(getexercicios)
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



  return <Layout>
    <div className="flex w-full items-center flex-col gap-4 mt-4 p-5">
      <p className='font-bold text-3xl text-left w-full'> Exercícios </p>

      <div className='flex gap-2 justify-start items-center w-full'>
        {
          secoes.map((secao, index) => (
            <Button

              key={index}
              onClick={() =>
                setSecaoSelecionada(
                  secaoSelecionada === secao.nome ? null : secao.nome
                )
              }
              className={`flex gap-3 items-center rounded-md border py-1 px-3 text-sm shadow-sm transition-all
                ${secaoSelecionada === secao.nome
                  ? "bg-blue-600 text-white border-blue-600"
                  : "border-slate-300 text-slate-600 hover:bg-slate-100 bg-white"
                }`}
            >
              {secao.nome}
              <span className="rounded-full bg-gray-300 px-2 text-xs">
                {secao.qtd_ex}
              </span>
            </Button>
          ))
        }
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
                    <Hand
                      className={`${categoriaColor[exercicio.secao]?.texto || "text-gray-700"
                        }`}
                      size={50}
                    />
                    <p className={`font-medium ${categoriaColor[exercicio.secao]?.texto ||"text-gray-700"}`}
                    >
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
                    <h3 className="text-xl font-semibold text-gray-800 mb-2 capitalize">
                      {exercicio.titulo.split("_")[0]}{" "}
                      {exercicio.titulo.split("_")[1]?.toLocaleUpperCase()}
                    </h3>
                    <div>
                      {exercicio.status == null ? (
                        <Hourglass color="orange" size={20} />
                      ) : (
                        <CheckCheck color="green" />
                      )}
                    </div>
                  </div>
                  <p className="text-gray-600 text-sm mb-4">
                    {exercicio.descricao}
                  </p>
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
                        1 {"1" == "1" ? "Variação" : "Variações"}
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
                        className={`${categoriaColor[exercicio.secao]?.texto ||"text-gray-700"} transition-transform group-hover:translate-x-1`}
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
