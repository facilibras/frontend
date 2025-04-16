import { createFileRoute } from '@tanstack/react-router'
import Layout from '../../components/Layout'

export const Route = createFileRoute('/aulas/')({
  component: RouteComponent,
})

function RouteComponent() {
  return <Layout children={<div className="p-2 flex w-full justify-center items-center h-screen">

    <div className='flex flex-col gap-2 mt-4'>
      <p> Aulas </p>
    </div>
  </div>}>

  </Layout>
}
