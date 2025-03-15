import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/exercicios/$categoriaExercicio')({
  component: RouteComponent,

})

function RouteComponent() {

  const { categoriaExercicio } = Route.useParams()
  return <div>Post {categoriaExercicio}</div>
  
}
