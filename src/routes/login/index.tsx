import { createFileRoute, Link } from '@tanstack/react-router'
import { backendConnection } from '../../utils/axios'
import { Input } from '../../components/ui/input'
import { Button } from '../../components/ui/button'
import { useNavigate } from '@tanstack/react-router'
import {useUserStore} from '../../store/user'
import { toast } from 'react-toastify'


export const Route = createFileRoute('/login/')({
  component: RouteComponent,
})

function RouteComponent() {

  const { actions: { addUser } } = useUserStore();

  const navigate = useNavigate({ from: '/login' })

  const realizarLogin = async () => {

    const nomeInput = document.getElementById('nome') as HTMLInputElement | null;
    const senhaInput = document.getElementById('senha') as HTMLInputElement | null;

    const data = await backendConnection.useAxiosConnection({
      method: 'POST',
      path: '/login',
      dataValues:{
        username: nomeInput?.value,
        password: senhaInput?.value
      },
      headers:{
        'Content-Type': "application/x-www-form-urlencoded",
      }
    })

    if (data.status === 200) {

      addUser(data.data.token)
      navigate({ to: '/dashboard' })
    }
    else {
      toast.error('Erro ao realizar o login!')
    }
  }



  return (
    <div className='p-6 flex w-full justify-center items-center h-screen'>
      <div className='min-w-[320px] w-full max-w-[640px] h-fit bg-gray-200 rounded-3xl shadow-2xl flex flex-col gap-4 p-4'>
        <p className='font-bold text-center text-2xl'> Bem Vindo de Volta ao Facilibras !</p>

        <div>
          <label> Email </label>
          <Input
            placeholder='Email'
            type='email'
            id='nome'
            className='border-black'
          />
        </div>
        <div>
          <label htmlFor=""> Senha </label>
          <Input
            placeholder='Senha'
            type='password'
            className='border-black'
            id='senha'
          />
        </div>

        <Button onClick={realizarLogin}> Entrar </Button>

        <div className='flex-grow h-[1px] bg-gray-500'/>

        <div className='flex flex-col items-start justify-center gap-2'>
          <p>Ainda não faz parte? <Link to='/register'>Cadastre-se</Link></p>
          
          <small className='text-red-800 text-sm'>Esqueceu a senha? <span className='underline'>Clique aqui</span></small>
        </div>

      </div>

    </div>
  )
}
