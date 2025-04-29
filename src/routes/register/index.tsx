import { createFileRoute } from '@tanstack/react-router'
import { Input } from '../../components/ui/input'
import { Button } from '../../components/ui/button'
import { backendConnection } from '../../utils/axios'
import { useNavigate } from '@tanstack/react-router'

export const Route = createFileRoute('/register/')({
  component: RouteComponent,
})

function RouteComponent() {
  const navigate = useNavigate({ from: '/register' })

  const Login = async () => {

    const nomeInput = document.getElementById('nome') as HTMLInputElement | null;
    const senhaInput = document.getElementById('senha') as HTMLInputElement | null;
    const senhaInputVerficador = document.getElementById('senhaVerficador') as HTMLInputElement | null;

    if (senhaInput?.value !== senhaInputVerficador?.value) {
      alert('As senhas não coincidem!')
      return
    }

    const data = await backendConnection.useAxiosConnection({
      method: 'POST',
      path: '/registrar',
      dataValues: {
        nome: nomeInput?.value,
        senha: senhaInput?.value,
      }
    })

    if (data.status === 200) {
      alert('Cadastro realizado com sucesso!')
      navigate({ to: '/login' })
    }
    else{
      alert('Erro ao realizar o cadastro!')
    }
  }

  return <div className='p-6 flex w-full justify-center items-center h-screen'>

    <div className='min-w-[320px] w-full max-w-[640px] h-fit bg-gray-200 rounded-3xl shadow-2xl flex flex-col gap-4 p-4'>
      <p className='font-bold text-center text-2xl'> Registre-Se Agora !</p>

      <div>
        <label> Nome </label>
        <Input placeholder='Digite seu nome ...' type='text' id='nome' />
      </div>
      <div>
        <label> Senha </label>
        <Input
          placeholder='Senha'
          type='password'
          className='border-black'
          id='senha'
        />
      </div>
      <div>
        <label> Confirme sua Senha </label>
        <Input
          placeholder='Senha'
          type='password'
          className='border-black'
          id='senhaVerficador'
        />
      </div>
      {}
      <Button onClick={Login}> Registrar </Button>

      {/* <div className='flex flex-col items-start justify-center gap-2 mt-4'>
      <p>Esqueceu a senha?</p>
      <p>Ainda não faz parte <Link to='/register'>Cadastre-se</Link></p>
    </div> */}

    </div>

  </div>
}
