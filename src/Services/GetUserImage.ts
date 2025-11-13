import { backendConnection } from "../utils/axios"

const cacheBuster = { _: new Date().getTime() };

export const GetUserImage = async (element: any) => {

    if (!element.imagemPerfil || typeof element.imagemPerfil !== 'string') {
        element.imagemPerfil = '';
        return element;
    }

    try {

        const fileBlob: Blob = await backendConnection.useAxiosConnection({
            method: 'GET',
            path: element.imagemPerfil,
            responseType: 'blob',
            params: cacheBuster
        });

        if (!fileBlob || fileBlob.size === 0) {
            element.imagemPerfil = '';
            return element;
        }

        if (fileBlob.type.includes('svg')) {

            const svgString = await fileBlob.text();

            const svgclass = '<svg xmlns="http://www.w3.org/2000/svg" width="100%" height="100%" viewBox="0 0 50 50" class="rounded-full border-4 border-white shadow-md">';
            const imgfullsize = svgString.replace(/<svg\b[^>]*>/, svgclass);

            element.imagemPerfil = imgfullsize;

        } else {

            element.imagemPerfil = fileBlob;
        }

        return element;

    } catch (error) {

        element.imagemPerfil = '';
        console.error("Erro ao buscar arquivo de imagem/svg:", error);
        
    }

    return element;
}