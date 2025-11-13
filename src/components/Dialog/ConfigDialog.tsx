import { Dialog, DialogTrigger, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "../ui/dialog"
import { Button } from "../ui/button"
import { Settings } from "lucide-react"
import { ThemeToggle } from "../ThemeToggle"

export const ConfigDialog = () => {


    return (

        <Dialog>
            <DialogTrigger>
                <Button className="rounded-full p-4 bg-black hover:bg-zinc-400 text-white hover:text-white ">
                    <Settings />
                </Button>
            </DialogTrigger>
            <DialogContent className="dark:bg-gray-700">
                <DialogHeader>
                    <DialogTitle> Configurações do usuário </DialogTitle>
                    <DialogDescription>
                        Ajuste as sua preferências por aqui.
                    </DialogDescription>
                </DialogHeader>

                <div className="flex flex-col gap-2 items-start w-full">
                    <div className="flex justify-center items-center gap-2 border-2 rounded-full " >
                        <p> Ativar modo escuro </p>
                        <ThemeToggle />
                    </div>

                    <div className="flex justify-center items-center gap-2" >
                        <p> Botoes de Acessibilidade </p>
                        <input type="checkbox" name="" id="" />
                    </div>
                </div>
            </DialogContent>

        </Dialog>

    )

}