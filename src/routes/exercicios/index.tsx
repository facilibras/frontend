import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/exercicios/')({
  component: RouteComponent,
})

function RouteComponent() {
  return <div>Hello "/exercicios/"!</div>
}
