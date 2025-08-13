import { Outlet, createRootRoute } from '@tanstack/react-router'
import { ToastContainer } from 'react-toastify';
import { useUserStore } from '../store/user';
import { Contrast, AArrowUp, AArrowDown } from 'lucide-react'
import { Button } from '../components/ui/button';
import React from 'react';


export const Route = createRootRoute({
  component: RootComponent,
})

function RootComponent() {
  const { actions: { addUser } } = useUserStore();

  React.useEffect(() => {
    const token = localStorage.getItem('token') as string
    if (token) {
      addUser(token)
    }
  }, [])


  const contrastBtn =  ()=> {
    document.body.classList.toggle('high-contrast');
  };

  const fontIncrease =  () => {
    const tamanhoAtual = parseFloat(getComputedStyle(document.body).fontSize);
    document.body.style.fontSize = (tamanhoAtual + 1) + 'px';
  }


  const fontDecrease = () => {
    const tamanhoAtual = parseFloat(getComputedStyle(document.body).fontSize);
    if (tamanhoAtual > 12) {
      document.body.style.fontSize = (tamanhoAtual - 1) + 'px';
    }
  }

  return (
    <div className='bg-neutral-200'>
      <div className="">
        <ToastContainer />
        <Outlet />
      </div>
      <div
        className="accessibility-toolbar fixed top-1/3 right-0 z-50 bg-transparent text-white p-2 flex flex-col items-end gap-4 rounded-l-lg">
        <Button onClick={contrastBtn} id="contrastBtn"
          className="group flex items-center px-3 py-1 bg-white text-blue-600 rounded-lg hover:bg-blue-50 transition-all overflow-hidden whitespace-nowrap">
          <Contrast className="w-4 h-4" />
          <span className="max-w-0 overflow-hidden group-hover:max-w-xs transition-all duration-300 ml-2">
            Alto Contraste</span>
        </Button>
        <Button onClick={fontIncrease} id="fontIncreaseBtn"
          className="group flex items-center px-3 py-1 bg-white text-blue-600 rounded-lg hover:bg-blue-50 transition-all overflow-hidden whitespace-nowrap">
          <AArrowUp className="w-4 h-4"
          />
          <span className="max-w-0 overflow-hidden group-hover:max-w-xs transition-all duration-300 ml-2">
            Aumentar Fonte
          </span>
        </Button>
        <Button onClick={fontDecrease} id="fontDecreaseBtn"
          className="group flex items-center px-3 py-1 bg-white text-blue-600 rounded-lg hover:bg-blue-50 transition-all overflow-hidden whitespace-nowrap">
          <AArrowDown className="w-4 h-4" />
          <span className="max-w-0 overflow-hidden group-hover:max-w-xs transition-all duration-300 ml-2">Restaurar
            Fonte</span>
        </Button>
      </div>
      
      <footer id="contato" className="bg-gray-900 text-white pt-12 pb-6">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-4 gap-8 mb-8">
            <div>
              <div className="flex items-center mb-4">
                <div
                  className="w-10 h-10 bg-blue-600 rounded-full flex items-center justify-center text-white font-bold text-xl mr-3">
                  F
                </div>
                <h3 className="text-2xl font-bold">Facilibras</h3>
              </div>
              <p className="text-gray-400 mb-4">Facilitando o aprendizado da Língua Brasileira de Sinais.</p>
              <div className="flex gap-4">
                <a href="#"
                  className="w-10 h-10 bg-gray-800 rounded-full flex items-center justify-center text-gray-300 hover:text-white hover:bg-red-600 transition">
                  <i className="fab fa-youtube"></i>
                </a>
                <a href="#"
                  className="w-10 h-10 bg-gray-800 rounded-full flex items-center justify-center text-gray-300 hover:text-white hover:bg-black transition">
                  <i className="fab fa-github"></i>
                </a>
              </div>
            </div>

            <div>
              <h4 className="text-lg font-semibold mb-4">Links Úteis</h4>
              <ul className="space-y-2">
                <li><a href="#" className="text-gray-400 hover:text-white transition">Página Inicial</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white transition">Exercícios</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white transition">Perfil de Usuário</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white transition">Ranking</a></li>
              </ul>
            </div>

            <div>
              <h4 className="text-lg font-semibold mb-4">Aprenda Sinais em Libras</h4>
              <ul className="space-y-2">
                <li><a href="#" className="text-gray-400 hover:text-white transition">Categoria: Letras</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white transition">Categoria: Números</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white transition">Categoria: Saudações</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white transition">Ver todas categorias</a></li>
              </ul>
            </div>

            <div>
              <h4 className="text-lg font-semibold mb-4">Contato</h4>
              <ul className="space-y-3">
                <li className="flex items-start gap-3">
                  <i className="fas fa-envelope mt-1 text-blue-400"></i>
                  <span className="text-gray-400">contato@facilibras.com.br</span>
                </li>
              </ul>
            </div>
          </div>

          <div className="border-t border-gray-800 pt-6 flex flex-col md:flex-row justify-between items-center">
            <p className="text-gray-400 mb-4 md:mb-0">© {new Date().getFullYear()} Facilibras. Todos os direitos reservados.</p>
          </div>
        </div>
      </footer>
    </div>

  )
}