import { createFileRoute } from '@tanstack/react-router'
import { Link } from '@tanstack/react-router'
import Layout from '../../components/Layout'
import { ProtectedRoute } from '../../components/ProtectedRoute'
import { backendConnection } from '../../utils/axios'
import { useEffect, useState } from 'react'
import { exercicio, secao } from '../../const/exercicios.const'
import { X, CheckCheck } from 'lucide-react'
import { Separator } from '../../components/ui/separator'
import { Checkbox } from '../../components/ui/checkbox'

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
  const [checkeds, setChecked] = useState<Array<string>>([]);

  const handleChecked = (value: string) => {
    if (checkeds.includes(value)) {
      setChecked(checkeds.filter((item) => item !== value));

      return;
    }

    setChecked([...checkeds, value]);
  }

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
    <div className="flex w-full items-center flex-col gap-4 mt-4 p-5">
      <p className='font-bold text-3xl text-left w-full'> Exercícios </p>

        <div className='flex gap-2 justify-start items-center w-full'>
          {
            secoes.map((secao, index) => (
              <div className='flex gap-3 justify-start items-center rounded-md border border-slate-300 py-0.5 px-2.5 text-center text-sm transition-all shadow-sm text-slate-600' key={index}>
                {secao.nome}
                <div className='rounded-full bg-gray-300 px-1 flex items-center justify-center'>
                  {secao.qtd_ex}
                </div>
              </div>
            ))
          }
        </div>

        <div className='flex flex-col justify-center items-start gap-4 w-full'>

          { secoes.map(secao => (
            <div className='flex flex-col gap-2 w-full border' key={secao.nome}>
              <p className='text-xl font-bold'> { secao.nome } </p>

              <Separator className='w-full bg-neutral-500'/>

              <div className='flex gap-2 justify-between items-center cursor-pointer' onClick={() => handleChecked(secao.nome)}>
                <p className='text-lg'>
                  Fácil
                </p>

                <Checkbox id={secao.nome} checked={checkeds.includes(secao.nome)} className='border border-black'/>
              </div>

              <div className={`flex-col gap-2 justify-center items-start rounded-md w-full ${ checkeds.includes(secao.nome) ? 'opacity-100 flex pointer-events-auto': 'opacity-0 hidden pointer-events-none' } transition-all duration-500 ease`}>
                {exercicios.map(exercicio => (
                  <>
                    {exercicio.secao == secao.nome && (
                      <Link to='/exercicios/$categoriaExercicio' params={{ categoriaExercicio: exercicio.titulo }} key={exercicio.titulo} className='w-full'>
                        <div className='w-full flex justify-between gap-2 bg-gray-300 rounded-2xl p-6'>
                          <div>
                            <h2 className='font-bold text-2xl text-black'> {exercicio.titulo.split('_')[0]} {exercicio.titulo.replace("_"," ").split(" ")[1].toUpperCase()} </h2>
                            <p> {exercicio.descricao}</p>
                          </div>
                          <div>
                            {
                              exercicio.status == null ? <X color='red' /> : <CheckCheck color='green' />
                            }
                          </div>
                        </div>
                      </Link>
                    )}
                  </>
                )) }
              </div>
              
          </div>
          )) }
        </div>
      </div>
  } />
}
