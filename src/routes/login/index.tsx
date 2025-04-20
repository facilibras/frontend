import { createFileRoute, Link } from '@tanstack/react-router'
import { backendConnection } from '../../utils/axios'
import { Input } from '../../components/ui/input'
import { Button } from '../../components/ui/button'
import { useNavigate } from '@tanstack/react-router'
import {useUserStore} from '../../store/user'


export const Route = createFileRoute('/login/')({
  component: RouteComponent,
})

function RouteComponent() {

  const { actions: { addUser } } = useUserStore();

  const navigate = useNavigate({ from: '/login' })

  const realizarLogin = async () => {

    const nomeInput = document.getElementById('nome') as HTMLInputElement | null;
    const senhaInput = document.getElementById('senha') as HTMLInputElement | null;

    console.log(nomeInput?.value, senhaInput?.value)

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
      alert('Credenciais inválidas!')
    }
  }



  return <div className='p-2 flex w-full justify-center items-center h-screen'>

    <div className='w-1/2 h-2/3 bg-gray-200 rounded-3xl shadow-2xl flex flex-col gap-4 p-4'>
      <p className='font-bold text-center text-2xl'> Bem Vindo de Volta ao Facilibras !</p>


      <div>
        <label> Nome </label>
        <Input
          placeholder='Email'
          type='text'
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

      <div className='flex flex-col items-start justify-center gap-2 mt-4'>
        <p>Esqueceu a senha?</p>
        <p>Ainda não faz parte <Link to='/register'>Cadastre-se</Link></p>
      </div>

    </div>

  </div>
}
