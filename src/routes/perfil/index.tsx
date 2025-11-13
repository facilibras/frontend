import { createFileRoute } from '@tanstack/react-router'
import { ProtectedRoute } from '../../components/ProtectedRoute'

export const Route = createFileRoute('/perfil/')({
  component: ( )=> (
      <ProtectedRoute>
        <RouteComponent/>
      </ProtectedRoute>
    ),
})

function RouteComponent() {
  return <div>Hello "/perfil/"!</div>
}
