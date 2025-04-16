import { createFileRoute } from '@tanstack/react-router'
import { Link } from '@tanstack/react-router'
import Layout from '../../components/Layout'

export const Route = createFileRoute('/exercicios/')({
  component: RouteComponent,
})


function RouteComponent() {


  const alfabeto = [
    {
      id: 1,
      title: "Letra A",
      description: "Aprenda o sinal da letra A em Libras",
      param: {
        letra: "A",
        idGesto: "",
        titulo: "Letra A",
      }
    },
    {
      id: 2,
      title: "Letra B",
      description: "Aprenda o sinal da letra B em Libras",
      param: {
        titulo: "Letra B",
        letra: "B",
        idGesto: ""
      }
    },

  ]

  return <Layout children={
    <div className="flex w-full items-center flex-col gap-4">

      <div className='w-[90%] h-16 m-2 bg-blue-400 rounded-2xl'>
        <p className='text-center text-3xl h-full'> Exercicios </p>
      </div>

      <div className=''>

        <div className='w-full'>
          <p className='text-xl'> Fácil </p>
          <hr />
          <div className='flex justify-center items-center gap-2 '>

            {
              alfabeto.map((exercicio) => (
                <Link to='/exercicios/$categoriaExercicio' params={{ categoriaExercicio: exercicio.param.titulo, params: exercicio.param}} key={exercicio.id}>
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

