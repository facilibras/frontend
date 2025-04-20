import { jwtDecode } from "jwt-decode";
import {User} from '../store/user'


export const jwtDecodeToken =  (token: string) => {
  
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

export const verifyExpiration = (expTime: number | undefined):boolean => {

    if (expTime == undefined){
        return false 
    } 

    const currentTime = Math.floor(Date.now() / 1000);
    
    return currentTime > expTime;
}