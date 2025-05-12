import { Outlet, createRootRoute } from '@tanstack/react-router'
import { ToastContainer } from 'react-toastify';
import { useUserStore } from '../store/user';
import React from 'react';


export const Route = createRootRoute({
  component: RootComponent,
})

function RootComponent() {
  const { actions: { addUser }} = useUserStore();

  React.useEffect(() => {
    const token = localStorage.getItem('token') as string 

    console.log('token dessa budega',  token)

    if (token) {
      addUser(token)

    }
  }, [])

  return (
    <div className="bg-neutral-200">
        <ToastContainer />

        <Outlet/>
    </div>
  )
}