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


  const contrastBtn = () => {
    document.body.classList.toggle('high-contrast');
  };

  const fontIncrease = () => {
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
    <body className='bg-gray-50 min-h-screen w-full'>
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
    </body>

  )
}