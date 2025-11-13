import { Outlet, createRootRoute } from '@tanstack/react-router'
import { ToastContainer } from 'react-toastify';
import { useUserStore } from '../store/user';
import { Toolbar } from '../components/Accessibility/Toolbar';
import { useThemeStore } from '../store/theme'
import { useEffect } from 'react';


export const Route = createRootRoute({
  component: RootComponent,
})

function RootComponent() {
  const { actions: { addUser } } = useUserStore();
  const { theme } = useThemeStore()

  useEffect(() => {
    const token = localStorage.getItem('token') as string
    if (token) {
      addUser(token)
    }
  }, [])

  return (
    <div className={`bg-gray-50 min-h-screen w-full ${theme}`}>
      <div className="">
        <ToastContainer />
        <Outlet />
      </div>
      <Toolbar />
    </div>  

  )
}