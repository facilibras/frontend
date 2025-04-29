import { createFileRoute } from '@tanstack/react-router'
import { Link } from '@tanstack/react-router'
import Layout from '../../components/Layout'
import {alfabeto} from '../../lib/alfabeto'
import { ProtectedRoute } from '../../components/ProtectedRoute'
import { backendConnection } from '../../utils/axios'
import { useEffect, useState } from 'react'
import { exercicio, secao } from '../../const/exercicios.const'
import { X, CheckCheck } from 'lucide-react'

export const Route = createFileRoute('/exercicios/')({
  component: () => (
    <ProtectedRoute>
        <RouteComponent />
    </ProtectedRoute>
)
})

function RouteComponent() {

  const [exercicios, setExercicios] = useState<exercicio[]>([])
  const [secoes, setSecoes] = useState<secao[]>([])

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



  return <Layout children={
    <div className="flex w-full items-center flex-col gap-4">

      <div className='w-[90%] h-16 m-2 flex justify-center items-center bg-blue-400 rounded-2xl'>
        <p className='font-bold text-3xl'> Exercicios </p>
      </div>

      <div className='w-[100%]'>

        <div className='flex gap-2 justify-center items-center'>
          {
            secoes.map((secao, index) => (
              <div className='flex gap-1 justify-center items-center' key={index}>
                {secao.nome}
                <div className='w-[30px] h-[30px] rounded-full bg-gray-400 p-1 flex items-center justify-center'>
                  {secao.qtd_ex}
                </div>
              </div>
            ))
          }
        </div>

        <div className='w-full p-5'>
          <p className='text-xl'> Fácil </p>
          <hr />

          <div className='flex flex-col w-full gap-2 '>
            {
              exercicios.map((exercicio: exercicio) => (

                <Link to='/exercicios/$categoriaExercicio' params={{ categoriaExercicio: exercicio.titulo }} key={exercicio.titulo}>
                  <div className='w-full flex justify-between gap-2 bg-gray-300 rounded-2xl p-6'>
                    <div>
                      <h2 className='font-bold text-2xl text-black'> {exercicio.titulo} </h2>
                      <p> {exercicio.descricao}</p>
                    </div>
                    <div>
                      {
                        exercicio.status == null ? <X color='red' /> : <CheckCheck color='green' />
                      }
                    </div>
                  </div>
                </Link>
              ))
            }
          </div>
        </div>
        <div>
        </div>
      </div>
    </div>
  } />
}
