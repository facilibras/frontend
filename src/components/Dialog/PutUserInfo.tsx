import { backendConnection } from "../../utils/axios"
import { Button } from "../ui/button"
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "../ui/dialog"
import { Input } from "../ui/input"
import { Label } from "../ui/label"
import { Pen } from "lucide-react"
import { useEffect, useState } from "react"
import { useUserStore } from '../../store/user'
import { toast } from 'react-toastify'

interface UserInfo {
    apelido: string | null,
    cor_img_fundo: string | null,
    arquivo: File | null
}

export function DialogUserInfo() {


    const { states: { user } } = useUserStore();
    const [userInfo, setUser] = useState<UserInfo>({
        apelido: null,
        cor_img_fundo: null,
        arquivo: null
    })
    const updateUserInfo = async () => {
        
        const res = await backendConnection.useAxiosConnection({
            method: 'PUT',
            path: `/perfil/${user?.id_usuario}`,
            dataValues: userInfo,
            headers:{
                'Content-Type': "multipart/form-data",
            }
        })
        
        if (res.status === 200){
            toast.success(res.data.mensagem)
        }
        else{
            toast.error(res.data.mensagem)
        }
    }

    useEffect(()=>{
        console.log(userInfo)
    }, [userInfo])

    return (
        <Dialog>
            <DialogTrigger asChild>
                <Button variant="outline" className="text-black p-2 rounded-full top-1 right-1 absolute"><Pen /></Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-md">
                <DialogHeader>
                    <DialogTitle>Informações do úsuario</DialogTitle>
                    <DialogDescription>
                        Atualize suas informações de perfil aqui. <br/>
                        Essas informações serão visíveis para outros usuários.
                    </DialogDescription>
                </DialogHeader>
                <div className="flex flex-col  items-center gap-2">
                    <div className="flex flex-col flex-1 gap-2 w-full">
                        <Label htmlFor="nome" >
                            Nome
                        </Label>
                        <Input
                            id="nome"
                            defaultValue={"Nome do usuário"}
                        />
                    </div>

                    <div className="flex flex-col flex-1 gap-2 w-full">
                        <Label htmlFor="cor_de_fundo">
                            Foto de perfil
                        </Label>
                        <Input
                            id="image"
                            type="file"
                            onChange={(e)=> setUser({...userInfo, arquivo: e.target.files ? e.target.files[0] : null})}
                        />
                    </div>

                    <div className="flex flex-col flex-1 gap-2 w-full">
                        <Label htmlFor="cor_de_fundo">
                            Cor de fundo do perfil
                        </Label>
                        <Input
                            id="color"
                            type="color"
                            onChange={(e)=> setUser({...userInfo, cor_img_fundo: e.target.value})}
                        />
                    </div>

                </div>
                <DialogFooter className="sm:justify-start">
                        <Button type="button" variant="secondary" onClick={updateUserInfo}>
                            Atualizar
                        </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    )
}
