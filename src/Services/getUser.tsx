import { backendConnection } from "../utils/axios";
import { usuario } from "../const/usuario.conts";


export const getUser = async (id_usuario: string) => {

    const userdata: usuario = await backendConnection.useAxiosConnection({
        method: 'GET',
        path: `/perfil/${id_usuario}`,

    })
    if (userdata) {


        try {
            // 2. BUSCA O ARQUIVO (imagem OU svg) COMO BLOB
            const fileBlob: Blob = await backendConnection.useAxiosConnection({
                method: 'GET',
                path: userdata.imagemPerfil.toString(),
                responseType: 'blob' // 👈 Pedimos SEMPRE 'blob'
            });

            if (!fileBlob || fileBlob.size === 0) {
                userdata.imagemPerfil = ''; // Arquivo vazio
                return userdata;
            }

            // 3. VERIFICA O TIPO DO BLOB
            if (fileBlob.type.includes('svg')) {

                // --- É um SVG ---
                const svgString = await fileBlob.text(); // Converte o Blob para texto

                const svgclass = '<svg xmlns="http://www.w3.org/2000/svg" width="100%" height="100%" viewBox="0 0 50 50" class="rounded-full border-4 border-white shadow-md">';
                const imgfullsize = svgString.replace(/<svg\b[^>]*>/, svgclass);

                userdata.imagemPerfil = imgfullsize; // Salva a STRING do SVG

            } else {

                // --- É uma IMAGEM (jpeg, png, etc.) ---
                userdata.imagemPerfil = fileBlob; // Salva o BLOB da imagem
            }

        } catch (error) {
            console.error("Erro ao buscar arquivo de imagem/svg:", error);
            userdata.imagemPerfil = ''; // Falha na requisição
        }

        return userdata;

    }
}