import { createFileRoute, Link } from '@tanstack/react-router'
import { Input } from '../../components/ui/input'
import { Button } from '../../components/ui/button'
import { backendConnection } from '../../utils/axios'
import { useNavigate } from '@tanstack/react-router'
import { toast } from 'react-toastify'
import { CircleX, CircleCheck } from 'lucide-react'
import { useEffect, useState } from 'react'

export const Route = createFileRoute('/register/')({
  component: RouteComponent,
})

function RouteComponent() {
  const navigate = useNavigate({ from: '/register' })
  const [button, setButton] = useState(false)
  const [verificadorSenha, setVerificadoSenha] = useState({
    isEqual: false,
    haveNumber: false,
    have8caracter: false,
    haveSpecial: false
  })
  const [CadastroValues, setCadastroValues] = useState({
    nome: '',
    email: '',
    senha: '',
    senhaVerficador: '',
    readyToSend: false
  })
  useEffect(() => {
    const isEqual = CadastroValues.senha === CadastroValues.senhaVerficador
    setVerificadoSenha({ ...verificadorSenha, isEqual: isEqual })
    
    if (CadastroValues.nome && CadastroValues.email && CadastroValues.senha && CadastroValues.readyToSend) {
      console.log('entrou')
      setButton(true)
    }
  }, [CadastroValues])

  const VerificarSenha = (senha: string) => {

    setCadastroValues({ ...CadastroValues, senha: senha })

    const hasUpperLowerNum = /^(?=.*[A-Z])(?=.*[a-z])(?=.*[0-9]).+$/.test(senha)
    const hasSpecial = /^(?=.*[!@#$%^&*(),.?":{}|<>]).+$/.test(senha)
    const has8caracter = senha.length >= 8

    if (verificadorSenha.isEqual && hasUpperLowerNum && hasSpecial && has8caracter) {
      setCadastroValues({ ...CadastroValues, readyToSend: true, senha: senha })
    }

    setVerificadoSenha( 
      {
        ...verificadorSenha,
        haveNumber: hasUpperLowerNum,
        haveSpecial: hasSpecial,
        have8caracter: has8caracter
      }
    )
  }


const Login = async () => {

  if (CadastroValues.senha !== CadastroValues.senhaVerficador) {
    toast.warning('As senhas não conferem!')
    return
  }

  const data = await backendConnection.useAxiosConnection({
    method: 'POST',
    path: '/registrar',
    dataValues: {
      nome: CadastroValues.nome,
      email: CadastroValues.email,
      senha: CadastroValues.senha,
    }
  })  

  if (data.status === 200) {
    toast.success('Cadastro realizado com sucesso! efetue o login!', {
      position: 'top-center'

    })
    navigate({ to: '/login' })
  }
  else {
    toast.error(data.response.data.detail)
  }
}

return <div className='p-6 flex w-full justify-center items-center h-screen bg-gradient-to-tr from-indigo-100 to-blue-400'>

  <div className='min-w-[320px] w-full max-w-[640px] h-fit bg-gray-200 rounded-2xl shadow-2xl flex flex-col gap-4 sm:p-10 p-6'>
    <p className='font-bold text-center text-2xl'> Registre-Se Agora !</p>
    <p className='text-center'> Crie sua conta e comece a aprender agora mesmo!</p>
    <div className='text-center text-black'>
      <p >Já possui uma conta? <Link to={"/login"} className='text-black'>Faça Login</Link></p>
    </div>
    <form action={Login}>
      <div>
        <label> Nome {<span className='text-red-500'> * </span>} </label>
        <Input
          placeholder='Digite seu nome ...'
          type='text'
          id='nome'
          className='border-black'
          required
          onChange={(e) => {
            setCadastroValues({ ...CadastroValues, nome: e.target.value })
          }}
        />
      </div>
      <div>
        <label> Email {<span className='text-red-500'> * </span>} </label>
        <Input placeholder='Digite seu email ...' type='email' id='email' className='border-black' required
          onChange={(e) => {
            setCadastroValues({ ...CadastroValues, email: e.target.value })
          }}
        />
      </div>
      <div>
        <label> Senha {<span className='text-red-500'> * </span>} </label>
        <Input
          placeholder='Digite a Senha'
          type='password'
          className='border-black'
          id='senha'
          onChange={(e) => {
            VerificarSenha(e.target.value)
          }}
        />
      </div>
      <div>
        <label> Confirme sua Senha </label>
        <Input
          placeholder='Confirme a Senha'
          type='password'
          className='border-black'
          id='senhaVerficador'
          onChange={(e) => {
            setCadastroValues({ ...CadastroValues, senhaVerficador: e.target.value })
          }}
        />
      </div>

      <ul className='text-sm p-2'>
        <li className='flex items-center gap-1'>
          {verificadorSenha.isEqual ? < CircleCheck color='green' size={14} /> : <CircleX color='red' size={14} />}
          As senhas devem coincidir
        </li>
        <li className='flex items-center gap-1'>
          {verificadorSenha.haveNumber ? < CircleCheck color='green' size={14} /> : <CircleX color='red' size={14} />}
          Deve conter letras maiusculas, minuculas e números
        </li>
        <li className='flex items-center gap-1'>
          {verificadorSenha.have8caracter ? < CircleCheck color='green' size={14} /> : <CircleX color='red' size={14} />}
          A senha deve conter no mínimo 8 caracteres
        </li>
        <li className='flex items-center gap-1'>
          {verificadorSenha.haveSpecial ? < CircleCheck color='green' size={14} /> : <CircleX color='red' size={14} />}
          A senha deve conter caracteres especiais
        </li>
      </ul>
      <Button
        type='submit'
        className='bg-blue-500 hover:bg-blue-700 w-full'
        disabled={!button}
      >
        Registrar
      </Button>
    </form>


    {/* <div className='flex flex-col items-start justify-center gap-2 mt-4'>
      <p>Esqueceu a senha?</p>
      <p>Ainda não faz parte <Link to='/register'>Cadastre-se</Link></p>
    </div> */}

  </div>

</div>
}
