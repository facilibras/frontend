import { createFileRoute, Link } from '@tanstack/react-router'
import { backendConnection,requestProps } from '../../utils/axios'
import { Input } from '../../components/ui/input'
import { Button } from '../../components/ui/button'

export const Route = createFileRoute('/login/')({
  component: RouteComponent,
})

function RouteComponent() {

  backendConnection.useAxiosConnection({method:'GET', path:'login'} as requestProps)


  return <div className='p-2 flex w-full justify-center items-center h-screen'>

    <div className='w-1/2 h-2/3 bg-amber-200 rounded-3xl flex flex-col gap-4 p-4'>
      <p className='font-bold text-center text-2xl'> Bem Vindo de Volta ao Facilibras !</p>


      <div>
        <label> Email </label>
        <Input placeholder='Email' type='email' />
      </div>
      <div>
        <label htmlFor=""> Senha </label>
        <Input
          placeholder='Senha'
          type='password'
          className='border-black'
        />
      </div>
      <Button> Entrar </Button>

      <div className='flex flex-col items-start justify-center gap-2 mt-4'>
        <p>Esqueceu a senha?</p>
        <p>Ainda não faz parte <Link to='/register'>Cadastre-se</Link></p>
      </div>

    </div>

  </div>
}
