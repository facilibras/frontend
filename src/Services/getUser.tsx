import { backendConnection } from "../utils/axios";
import { usuario } from "../const/usuario.conts";


export const getUser = async (id_usuario: string) => {

    const cacheBuster = { _: new Date().getTime() };

    const userdata: usuario = await backendConnection.useAxiosConnection({
        method: 'GET',
        path: `/perfil/${id_usuario}`,
        params: cacheBuster

    })
    if (userdata) {

        try {
            
            const fileBlob: Blob = await backendConnection.useAxiosConnection({
                method: 'GET',
                path: userdata.imagemPerfil.toString(),
                responseType: 'blob',
                params: cacheBuster
            });

            if (!fileBlob || fileBlob.size === 0) {
                userdata.imagemPerfil = ''; 
                return userdata;
            }

            if (fileBlob.type.includes('svg')) {

                const svgString = await fileBlob.text();

                const svgclass = '<svg xmlns="http://www.w3.org/2000/svg" width="100%" height="100%" viewBox="0 0 50 50" class="rounded-full border-4 border-white shadow-md">';
                const imgfullsize = svgString.replace(/<svg\b[^>]*>/, svgclass);

                userdata.imagemPerfil = imgfullsize; 

            } else {

                userdata.imagemPerfil = fileBlob; 
            }

        } catch (error) {
            console.error("Erro ao buscar arquivo de imagem/svg:", error);
            userdata.imagemPerfil = '';
        }

        return userdata;

    }
}