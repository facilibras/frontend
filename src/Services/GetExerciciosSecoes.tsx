import { toast } from "react-toastify"
import { backendConnection } from "../utils/axios"

export const GetExerciciosSecoes = async () => {
    try {
        const data = await backendConnection.useAxiosConnection({
            method: 'GET',
            path: '/exercicios/secoes',
        })

        return data    
    } catch (error) {
        console.error("Error fetching exercise sections:", error);
        toast.error("Erro ao buscar seções de exercícios.");
    }
}