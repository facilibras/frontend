import { createFileRoute } from '@tanstack/react-router'
import { Link } from '@tanstack/react-router'
export const Route = createFileRoute('/exercicios/')({
  component: RouteComponent,
})


function RouteComponent() {

  const exercicios = [
    {
      id: 1,
      title: 'Dias do mês',
      description: 'Aprenda os dias do mês em inglês',
      param: 'dias-do-mes',
    },
    {
      id: 2,
      title: 'Dias da semana',
      description: 'Aprenda os dias da semana em inglês',
      param: 'dias-da-semana',
    }
  ]


  return <div className="flex items-center flex-col gap-4">

    <div className='w-[90%] h-16 bg-blue-400 rounded-2xl'>
      <p className='text-center text-3xl'> Exercicios </p>
    </div>

    <div className=''>

      <div className='w-full'>
        <p className='text-xl'> Fácil </p>
        <hr />

        <div className='flex justify-center items-center gap-2 '>

          {
            exercicios.map((exercicio) => (
              <Link to='/exercicios/$categoriaExercicio' params={{ categoriaExercicio: exercicio.param }} key={exercicio.id}>
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
}
