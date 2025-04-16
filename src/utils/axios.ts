import axios, {AxiosInstance} from "axios";

export interface requestProps{
    method: string,
    path: string
    subpath?: string,
    data?: object
}

class AxiosConnection {

    private axioConnection: AxiosInstance;

    constructor(){

        this.axioConnection = axios.create({
            baseURL:'',
            headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },

        })
    }

    async useAxiosConnection({method, path, subpath, data}:requestProps){

        let finalPath = path;
        if (subpath) finalPath += `/${subpath}`

        if (method === 'GET'){
            try {
                const { data } = await this.axioConnection.get(finalPath)
                return data
            } catch (error) {
                return data
            }
            
        }
        if (method === 'POST'){

            try {
                return await this.axioConnection.post(finalPath,data)
            } catch (error) {
                
            }
            
        }
        if (method === 'PUT'){
            return await this.axioConnection.put(finalPath)
        }
        if (method === 'DELETE'){
            return await this.axioConnection.delete(finalPath)
        }
    }
}

export const backendConnection = new AxiosConnection()
