import axios, { AxiosInstance } from "axios";

export interface requestProps {
    method: string,
    path: string
    subpath?: string,
    dataValues?: object
}

class AxiosConnection {

    private axioConnection: AxiosInstance;

    constructor() {

        this.axioConnection = axios.create({
            baseURL: 'http://127.0.0.1:8000',
            headers: {
                Authorization: `Bearer ${localStorage.getItem('token')}`,
                'Content-Type': "application/x-www-form-urlencoded",
            },

        })
    }

    async useAxiosConnection({ method, path, subpath, dataValues }: requestProps) {

        let finalPath = path;
        if (subpath) finalPath += `/${subpath}`

        if (method === 'GET') {
            try {
                const { data } = await this.axioConnection.get(finalPath)
                return data

            } catch (error) {
                return error
            }

        }
        if (method === 'POST') {

            try {
                const data = await this.axioConnection.post(finalPath, dataValues)
                return data

            } catch (error) {
                return error
            }

        }
        if (method === 'PUT') {
            return await this.axioConnection.put(finalPath)
        }
        if (method === 'DELETE') {
            return await this.axioConnection.delete(finalPath)
        }
    }
}

export const backendConnection = new AxiosConnection()
