import * as React from 'react'
import { Outlet, createRootRoute } from '@tanstack/react-router'
import { ToastContainer } from 'react-toastify';
import { useUserStore } from '../store/user';


export const Route = createRootRoute({
  component: RootComponent,
})

function RootComponent() {
  const { states: { user }, actions: { addUser }} = useUserStore();

  React.useEffect(() => {
    const token = localStorage.getItem('token') as string 

    console.log('token dessa budega',  token)

    if (token) {
      addUser(token)

    }
  }, [])

  return (
    <React.Fragment>
        <ToastContainer />

        <Outlet />
    </React.Fragment>
  )
}