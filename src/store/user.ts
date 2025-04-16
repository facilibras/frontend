import { jwtDecode } from 'jwt-decode';
import { create } from 'zustand'

interface User {
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

const jwtDecodeToken =  (token: string) => {
  
    try {
        const tokenDecoded: User = jwtDecode(token)

        console.log(tokenDecoded)

        if (tokenDecoded && typeof tokenDecoded !== 'string') {
            localStorage.setItem('token', token)
            return tokenDecoded as User;
        }

        return null;
  } catch (error) {
    console.log(error)
  }
}

export const useUserStore = create<storeProps>((set) => ({
  actions: {
    addUser: (user) =>
      set(() => ({
        states: {
          user: jwtDecodeToken(user)
        },
      })),
    removeUser: () => set(() => ({ states: { user: null } })), 
  },
  states: {
    user: null,
  },
}))