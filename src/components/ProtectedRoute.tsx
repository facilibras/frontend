import React from 'react'
import { useNavigate } from '@tanstack/react-router'
import { isAuthenticated } from '../utils/isAuthenticated'
import { toast } from 'react-toastify'

export const ProtectedRoute: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const navigate = useNavigate()
  
  if (!isAuthenticated()) {
    navigate({ to: '/login' })

    toast.warning('Você precisa estar logado para acessar essa página!')

    return null
  }
  
  return <>{children}</>
}