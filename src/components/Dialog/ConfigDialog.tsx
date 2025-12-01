import { Dialog, DialogTrigger, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "../ui/dialog"
import { Button } from "../ui/button"
import { Circle, Settings } from "lucide-react"
import { ThemeToggle } from "../ThemeToggle"
import { useConfig } from "../../store/config"
import { Toggle } from "../ui/toggle"
import { BookmarkIcon } from "lucide-react"

interface configProps {
    stateConfig: () => void,
    config: boolean
}

export const ConfigDialog = () => {

    const { stateConfig, config } = useConfig()

    return (

        <Dialog>
            <DialogTrigger>
                <Button className="rounded-full p-4 bg-black hover:bg-zinc-400 text-white hover:text-white">
                    <Settings />
                </Button>
            </DialogTrigger>
            <DialogContent className="dark:bg-gray-700">
                <DialogHeader className="">
                    <DialogTitle> Configurações do usuário </DialogTitle>
                    <DialogDescription>
                        Ajuste as sua preferências por aqui.
                    </DialogDescription>
                </DialogHeader>

                <div className="flex flex-col gap-2 items-start w-full dark:bg-gray-700">
                    <div className="flex justify-between items-center w-full pl-8 pr-8">
                        <p className="text-center"> Ativar modo escuro </p>
                        <ThemeToggle />
                    </div>

                    <div className="flex justify-between items-center w-full">
                        <p className="text-center"> Botoes de Acessibilidade </p>
                        <div
                            className="cursor-pointer w-1/3   "
                            onClick={stateConfig}
                        >
                            <Toggle
                                aria-label="Toggle bookmark"
                                variant="outline"
                                defaultPressed
                                className="data-[state=on]:bg-transparent relative data-[state=on]:*:[svg]:fill-blue-500 data-[state=on]:*:[svg]:stroke-blue-500 rounded-full w-full cursor-pointer"
                            >

                                <Circle
                                    className={`absolute ml-2 mr-2 ${config ? "right-0" : "left-0"}`}
                                />
                            </Toggle>
                        </div>
                    </div>
                </div>
            </DialogContent>

        </Dialog>

    )

}