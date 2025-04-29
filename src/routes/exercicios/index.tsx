import { createFileRoute } from '@tanstack/react-router'
import { Link } from '@tanstack/react-router'
import Layout from '../../components/Layout'
import {alfabeto} from '../../lib/alfabeto'
import { ProtectedRoute } from '../../components/ProtectedRoute'

export const Route = createFileRoute('/exercicios/')({
  component: () => (
    <ProtectedRoute>
        <RouteComponent />
    </ProtectedRoute>
)
})


function RouteComponent() {

  return <Layout children={
    <div className="flex w-full items-center flex-col gap-4">

      <div className='w-[90%] h-16 m-2 bg-blue-400 rounded-2xl'>
        <p className='text-center font-bold text-3xl h-full'> Exercicios </p>
      </div>

      <div className='w-[100%]'>

        <div className='w-full p-5'>
          <p className='text-xl'> Fácil </p>
          <hr />

          <div className='flex w-full flex-wrap items-center gap-2 '>
            {
              alfabeto.map((exercicio) => (
                <Link to='/exercicios/$categoriaExercicio' params={{ categoriaExercicio: exercicio.id.toString()}} key={exercicio.id}>
                  <div className='flex justify-center items-center gap-2 bg-cyan-100 rounded-2xl p-6'>
                    <p className='font-bold text-2xl text-black'> {exercicio.title} </p>
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

