import {jwtDecodeToken, verifyExpiration} from './token'
interface AuthRespose {
  message: string
  status: boolean
}
export const isAuthenticated = ():AuthRespose => {
    
    let response: AuthRespose = {
      message: 'Token não encontrado',
      status: false
    }
    const token = localStorage.getItem('token')

    if (token) {
      
      const user = jwtDecodeToken(token)
      
      if (verifyExpiration(user?.exp)) {

        localStorage.removeItem('token')
        return response = {
          message: 'Token expirado',
          status: false
        }
      }
        return response = {
          message: 'Token válido',
          status: true
        }
    }

    return response
}