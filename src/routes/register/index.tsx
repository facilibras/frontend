import { createFileRoute, Link } from '@tanstack/react-router'
import { Input } from '../../components/ui/input'
import { Button } from '../../components/ui/button'
import { Label } from '../../components/ui/label'
import { backendConnection } from '../../utils/axios'
import { useNavigate } from '@tanstack/react-router'
import { toast } from 'react-toastify'
import { CircleX, CircleCheck, LockKeyhole, Eye, Mail, User } from 'lucide-react'
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
    const isEqual = CadastroValues.senha === CadastroValues.senhaVerficador

    if (hasUpperLowerNum && hasSpecial && has8caracter) {
      setCadastroValues({ ...CadastroValues, readyToSend: true, senha: senha })
    }
    else {
      setCadastroValues({ ...CadastroValues, readyToSend: false, senha: senha })
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
        nome_usuario: CadastroValues.nome,
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
        <p> Já possui uma conta? <Link to={"/login"} className='text-black'>Faça Login</Link></p>
      </div>

      <form action={Login}>
        <div className='flex flex-col gap-3'>
          <div className='flex flex-col gap-1'>
            <Label className='block text-sm font-medium text-gray-700'> Nome Completo {<span className='text-red-500'> * </span>} </Label>
            <div className='relative'>
              <div className='absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none'>
                <User className='text-gray-400' size={16} />
              </div>
              <Input
                placeholder='Digite seu Nome ...'
                type='text'
                id='nome'
                className='w-full pl-10 pr-3 py-3 border border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200'
                required
                onChange={(e) => {
                  setCadastroValues({ ...CadastroValues, nome: e.target.value })
                }}
              />
            </div>
          </div>
          <div className='flex flex-col gap-1'>
            <Label className='block text-sm font-medium text-gray-700'> Email  {<span className='text-red-500'> * </span>} </Label>
            <div className='relative'>
              <div className='absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none'>
                <Mail className='text-gray-400' size={16} />
              </div>
              <Input
                placeholder='seu.email@exemplo.com'
                type='email'
                id='email'
                className='w-full pl-10 pr-3 py-3 border border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200'
                required
                onChange={(e) => {
                  setCadastroValues({ ...CadastroValues, email: e.target.value })
                }}
              />
            </div>
          </div>
          <div className='flex flex-col gap-1'>
            <Label className='block text-sm font-medium text-gray-700'> Senha {<span className='text-red-500'> * </span>}</Label>
            <div className='relative'>
              <div className='absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none'>
                <LockKeyhole className='text-gray-400' size={16} />
              </div>

              <Input
                placeholder='••••••••'
                type='password'
                className='w-full pl-10 pr-3 py-3 border border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200'
                id='senha'
                required
                onChange={(e) => VerificarSenha(e.target.value)}
              />
              <div className='absolute inset-y-0 right-0 pr-3 flex items-center cursor-pointer'>
                <button type='button' className='text-gray-400 hover:text-gray-600 focus:outline-none'
                  onClick={() => {
                    const inputSenha = document.getElementById('senha') as HTMLInputElement
                    if (inputSenha.type === 'password') {
                      inputSenha.type = 'text'
                    }
                    else {
                      inputSenha.type = 'password'
                    }
                  }}>

                  <Eye size={16} />
                </button>
              </div>
            </div>
          </div>
          <div className='flex flex-col gap-1'>
            <Label className='block text-sm font-medium text-gray-700'> Confirme sua Senha {<span className='text-red-500'> * </span>}</Label>
            <div className='relative'>
              <div className='absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none'>
                <LockKeyhole className='text-gray-400' size={16} />
              </div>
              <Input
                placeholder='••••••••'
                type='password'
                className='w-full pl-10 pr-3 py-3 border border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200'
                id='confirmesenha'
                required
                onChange={(e) => {
                  setCadastroValues({ ...CadastroValues, senhaVerficador: e.target.value })
                }}
              />
              <div className='absolute inset-y-0 right-0 pr-3 flex items-center cursor-pointer'>
                <button type='button' className='text-gray-400 hover:text-gray-600 focus:outline-none'
                  onClick={() => {
                    const inputSenha = document.getElementById('confirmesenha') as HTMLInputElement
                    if (inputSenha.type === 'password') {
                      inputSenha.type = 'text'
                    }
                    else {
                      inputSenha.type = 'password'
                    }
                  }}>
                  <Eye size={16} />
                </button>
              </div>
            </div>
          </div>
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

    </div>
  </div>
}
