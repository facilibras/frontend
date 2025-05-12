import React from 'react'
// import { useNavigate } from '@tanstack/react-router'
// import { isAuthenticated } from '../utils/isAuthenticated'
// import { toast } from 'react-toastify'

export const ProtectedRoute: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // const navigate = useNavigate()
  
  // const isAuth = isAuthenticated()

  // if (!isAuth.status) {
  //   navigate({ to: '/login' })
  //   toast.warning(<span className='flex flex-col'>
  //     <p>Você precisa estar logado para acessar essa página!</p>
  //     <br />
  //     <span className='text-sm'>{isAuth.message}</span>
  //   </span>,{
  //   })

  //   return null
  // }
  
  return <>{children}</>
}