import { createFileRoute, Link, useNavigate } from '@tanstack/react-router'
import { backendConnection } from '../../utils/axios'
import { Input } from '../../components/ui/input'
import { Button } from '../../components/ui/button'
import { useUserStore } from '../../store/user'
import { toast } from 'react-toastify'
import { LockKeyhole, Mail, Eye, EyeOff } from 'lucide-react'
import { useState } from 'react'

export const Route = createFileRoute('/login/')({
  component: RouteComponent,
})

function RouteComponent() {

  const { actions: { addUser } } = useUserStore();
  const navigate = useNavigate({from: '/login'})
  
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  const realizarLogin = async () => {

    if (!email || !password) {
      toast.warn("Por favor, preencha o email e a senha.");
      return;
    }

    try {
      const data = await backendConnection.useAxiosConnection({
        method: 'POST',
        path: '/login',
        dataValues: { username: email, password: password },
        headers: {
          'Content-Type': "application/x-www-form-urlencoded",
        }
      });

      
      if (data.status === 200) {

        localStorage.setItem('token', data.data.token);
        addUser(data.data.token);
        toast.success("Login realizado com sucesso!");
        navigate({to: '/dashboard' });
      }
      else{
        toast.error(data.data.detail || "Erro ao fazer login. Tente novamente.");
      }
    } catch (error: any) {
      const errorMessage = error?.response?.data?.detail || "Erro ao fazer login. Tente novamente.";
      toast.error(errorMessage);
    }
  };



  return (
    <div className='p-6 flex w-full justify-center items-center h-screen bg-gradient-to-tr from-indigo-100 to-blue-400'>

      <div className='min-w-[320px] w-full max-w-[640px] h-fit bg-gray-200 rounded-2xl shadow-2xl flex flex-col gap-4 p-8 '>

        <div>
          <p className='font-bold text-center text-2xl'> Faça Login na sua conta!</p>
          <p className='text-center text-md'> Bem Vindo de Volta ao Facilibras</p>
        </div>

        <form action={realizarLogin} className='flex flex-col gap-2'>
          <div>
            <label className='block text-sm font-medium text-gray-700 mb-2'> Email </label>
            <div className='relative'>
              <div className='absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none'>
                <Mail className='text-gray-400' size={16} />
              </div>
              <Input
                placeholder='seu.email@exemplo.com'
                type='email'
                id='nome'
                className='w-full pl-10 pr-3 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200'
                required
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
          </div>

          <div>
            <label className='block text-sm font-medium text-gray-700 mb-2'> Senha </label>
            <div className='relative'>
              <div className='absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none'>
                <LockKeyhole className='text-gray-400' size={16} />
              </div>
              <Input
                placeholder='••••••••'
                type={showPassword ? 'text' : 'password'}
                id='senha'
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className='w-full pl-10 pr-10 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200'
                required
              />
              <div className='absolute inset-y-0 right-0 pr-3 flex items-center'>
                <button
                  type='button'
                  onClick={() => setShowPassword(!showPassword)}
                  className="p-1 text-gray-500 hover:text-gray-700"
                  aria-label={showPassword ? "Ocultar senha" : "Mostrar senha"}
                >
                  {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                </button>
              </div>
            </div>
          </div>

          <Button
            type='submit'
            className='mt-2 cursor-pointer w-full bg-gradient-to-r from-blue-600 to-indigo-700 text-white font-semibold py-3 px-4 rounded-lg hover:from-blue-700 hover:to-indigo-800 transform hover:-translate-y-0.5 transition-all duration-200 shadow-lg hover:shadow-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2'
          > Entrar </Button>
        </form>

        <div className='flex-grow h-[1px] bg-gray-500' />

        <div className='flex flex-col items-start justify-center gap-2'>
          <p>Ainda não faz parte? <Link to='/register'> <span className='underline'>Cadastre-se</span></Link></p>

          <small className='text-red-800 text-sm'>Esqueceu a senha? <span className='underline'>Clique aqui</span></small>
        </div>

      </div>

    </div>
  )
}
