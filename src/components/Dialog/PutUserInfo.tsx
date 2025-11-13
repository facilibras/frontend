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
import { Check } from "lucide-react"
import { DialogClose } from "@radix-ui/react-dialog"

interface UserInfo {
    apelido: string | null,
    cor_img_fundo: string | null,
    arquivo: File | null
}

export function DialogUserInfo({ nome }: { nome: string }) {

    const { states: { user } } = useUserStore();
    const [selectedColor, setSelectedColor] = useState<string | null>(null);
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
            headers: {
                'Content-Type': "multipart/form-data",
            }
        })

        if (res.status === 200) {
            toast.success(res.data.mensagem)
        }
        else {
            toast.error(res.data.mensagem)
        }

        document.location.reload();
    }

    useEffect(() => {
        console.log(userInfo)
    }, [userInfo])

    const selectColor = (color: string) => {

        setUser({ ...userInfo, cor_img_fundo: `from-${color}-700 to-${color}-400` })
        setSelectedColor(color)
    }

    return (
        <Dialog>
            <DialogTrigger asChild>
                <Button variant="outline" className="text-black p-2 rounded-full top-1 right-1 absolute">
                    <Pen />
                </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-md">
                <DialogHeader>
                    <DialogTitle>Informações do úsuario</DialogTitle>
                    <DialogDescription>
                        Atualize suas informações de perfil aqui. <br />
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
                            defaultValue={nome}
                        />
                    </div>

                    <div className="flex flex-col flex-1 gap-2 w-full">
                        <Label htmlFor="cor_de_fundo">
                            Foto de perfil
                        </Label>
                        <Input
                            id="image"
                            type="file"
                            onChange={(e) => setUser({ ...userInfo, arquivo: e.target.files ? e.target.files[0] : null })}
                        />
                    </div>

                    <div className="flex flex-col flex-1 gap-2 w-full">
                        <Label htmlFor="cor_de_fundo">
                            Cor de fundo do perfil
                        </Label>

                        <div className="flex items-center gap-2">
                            <div
                                className="w-8 h-8 bg-gradient-to-r from-blue-700 to-blue-400 relative cursor-pointer"
                                onClick={() => selectColor('blue')}
                                aria-label="Selecionar azul"
                            >
                                <div className={selectedColor === 'blue' ? 'border-blue-900 border-4 w-8 h-8 relative flex items-start justify-start' : 'border-blue-900 border-4 w-8 h-8 relative hidden'}>
                                    <div className="bg-blue-900 absolute w-2 h-2 right-0 top-0 flex items-center justify-center">
                                        <Check color="white" size={nineOrTen()} />
                                    </div>
                                </div>
                            </div>

                            <div
                                className="w-8 h-8 bg-gradient-to-r from-red-700 to-red-400 relative cursor-pointer"
                                onClick={() => selectColor('red')}
                                aria-label="Selecionar vermelho"
                            >
                                <div className={selectedColor === 'red' ? 'border-red-900 border-4 w-8 h-8 relative flex items-start justify-start' : 'border-red-900 border-4 w-8 h-8 relative hidden'}>
                                    <div className="bg-red-900 absolute w-2 h-2 right-0 top-0 flex items-center justify-center">
                                        <Check color="white" size={9} />
                                    </div>
                                </div>
                            </div>

                            <div
                                className="w-8 h-8 bg-gradient-to-r from-purple-700 to-purple-400 relative cursor-pointer"
                                onClick={() => selectColor('purple')}
                                aria-label="Selecionar roxo"
                            >
                                <div className={selectedColor === 'purple' ? 'border-purple-900 border-4 w-8 h-8 relative flex items-start justify-start' : 'border-purple-900 border-4 w-8 h-8 relative hidden'}>
                                    <div className="bg-purple-900 absolute w-2 h-2 right-0 top-0 flex items-center justify-center">
                                        <Check color="white" size={9} />
                                    </div>
                                </div>
                            </div>

                            <div
                                className="w-8 h-8 bg-gradient-to-r from-green-700 to-green-400 relative cursor-pointer"
                                onClick={() => selectColor('green')}
                                aria-label="Selecionar verde"
                            >
                                <div className={selectedColor === 'green' ? 'border-green-900 border-4 w-8 h-8 relative flex items-start justify-start' : 'border-green-900 border-4 w-8 h-8 relative hidden'}>
                                    <div className="bg-green-900 absolute w-2 h-2 right-0 top-0 flex items-center justify-center">
                                        <Check color="white" size={9} />
                                    </div>
                                </div>
                            </div>

                            <div
                                className="w-8 h-8 bg-gradient-to-r from-cyan-700 to-cyan-400 relative cursor-pointer"
                                onClick={() => selectColor('cyan')}
                                aria-label="Selecionar ciano"
                            >
                                <div className={selectedColor === 'cyan' ? 'border-cyan-900 border-4 w-8 h-8 relative flex items-start justify-start' : 'border-cyan-900 border-4 w-8 h-8 relative hidden'}>
                                    <div className="bg-cyan-900 absolute w-2 h-2 right-0 top-0 flex items-center justify-center">
                                        <Check color="white" size={9} />
                                    </div>
                                </div>
                            </div>

                            <div
                                className="w-8 h-8 bg-gradient-to-r from-amber-700 to-amber-400 relative cursor-pointer"
                                onClick={() => selectColor('amber')}
                                aria-label="Selecionar Âmbar"
                            >
                                <div className={selectedColor === 'amber' ? 'border-amber-900 border-4 w-8 h-8 relative flex items-start justify-start' : 'border-amber-900 border-4 w-8 h-8 relative hidden'}>
                                    <div className="bg-amber-900 absolute w-2 h-2 right-0 top-0 flex items-center justify-center">
                                        <Check color="white" size={9} />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                </div>
                <DialogFooter className="sm:justify-start">
                    <DialogClose>
                        <Button type="button" variant="secondary" onClick={updateUserInfo}>
                            Atualizar
                        </Button>
                    </DialogClose>
                </DialogFooter>
            </DialogContent>
        </Dialog >
    )
}

function nineOrTen() { return 9 }
