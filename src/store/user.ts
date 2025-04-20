import { create } from 'zustand'
import { jwtDecodeToken } from '../utils/token';

export interface User {
  id_usuario: string
  nome_usuario: string
  super_usuario: boolean
  exp: number
}

interface stateProps {
  user: User | null
}

interface actionsProps {
  addUser: (token: string) => void
  removeUser: () => void
}

interface storeProps {
  actions: actionsProps
  states: stateProps
}



export const useUserStore = create<storeProps>((set) => ({
  actions: {
    addUser: (user) => set(() => ({ states: { user: jwtDecodeToken(user) },})),
    removeUser: () => set(() => ({ states: { user: null } })), 
  },
  states: {
    user: null,
  },
}))