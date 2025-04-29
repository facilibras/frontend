import * as React from 'react'
import { Outlet, createRootRoute } from '@tanstack/react-router'
import { ToastContainer } from 'react-toastify';


export const Route = createRootRoute({
  component: RootComponent,
})

function RootComponent() {

  return (
    <React.Fragment>
        <ToastContainer />

        <Outlet />
    </React.Fragment>
  )
}