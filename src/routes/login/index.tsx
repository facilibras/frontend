import { createFileRoute, Link } from '@tanstack/react-router'
import { backendConnection } from '../../utils/axios'
import { Input } from '../../components/ui/input'
import { Button } from '../../components/ui/button'
import { useNavigate } from '@tanstack/react-router'
import { useUserStore } from '../../store/user'
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
      dataValues: {
        username: nomeInput?.value,
        password: senhaInput?.value
      },
      headers: {
        'Content-Type': "application/x-www-form-urlencoded",
      }
    })

    if (data.status === 200) {

      localStorage.setItem('token', data.data.token)

      addUser(data.data.token)
      navigate({ to: '/dashboard' })
    }
    else {
      toast.error(data.response.data.detail)
    }
  }



  return (
    <div className='p-6 flex w-full justify-center items-center h-screen bg-gradient-to-tr from-indigo-100 to-blue-400'>

      <div className='min-w-[320px] w-full max-w-[640px] h-fit bg-gray-200 rounded-2xl shadow-2xl flex flex-col gap-4 p-8 '>
        <p className='font-bold text-center text-2xl'> Bem Vindo de Volta ao Facilibras !</p>

        <form action={realizarLogin} className='flex flex-col gap-2'>
          <div>
            <label> Email </label>
            <Input
              placeholder='Email'
              type='email'
              id='nome'
              className='border-black'
              required
            />
          </div>
          <div>
            <label htmlFor=""> Senha </label>
            <Input
              placeholder='Senha'
              type='password'
              className='border-black'
              id='senha'
              required
            />
          </div>

          <Button
            type='submit'
            className='bg-blue-500 hover:bg-blue-600 w-full text-white font-bold py-2 px-4 cursor-pointer'
          > Entrar </Button>
        </form>

        <div className='flex-grow h-[1px] bg-gray-500' />

        <div className='flex flex-col items-start justify-center gap-2'>
          <p>Ainda não faz parte? <Link to='/register'>Cadastre-se</Link></p>

          <small className='text-red-800 text-sm'>Esqueceu a senha? <span className='underline'>Clique aqui</span></small>
        </div>

      </div>

    </div>
  )
}
