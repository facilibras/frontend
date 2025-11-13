import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogTrigger } from '../ui/dialog';
import { atividadeRes } from '../../const/usuario.conts';
import { Button } from '../ui/button';
import { ScrollArea } from "../ui/scroll-area"


export function ListaAtividades({ atividades }: { atividades: atividadeRes[] }) {

    return (
        <Dialog>
            <DialogTrigger asChild>
                <Button className="mt-4 text-white text-sm font-medium flex items-center">
                    Ver Todas Atividades
                </Button>
            </DialogTrigger>

            <DialogContent className="sm:max-w-lg max-w-sm">
                <ScrollArea className="sm:max-w-lg max-w-sm max-h-72 rounded-md mt-6">
                    <DialogHeader>
                        <DialogTitle> Todas as Atividades </DialogTitle>
                        <DialogDescription>
                            Lista de todas as atividades realizadas pelo usuário
                        </DialogDescription>
                    </DialogHeader>

                    <div>
                        {
                            atividades.length ? atividades.map((atividade, index) => (
                                <div key={index} className="p-2 border-b">
                                    {atividade.atividade}
                                    <br />
                                    <span className="text-gray-500 text-sm">{atividade.data}</span>
                                </div>
                            )) :
                                <span> Nenhuma Atividade Recente </span>
                        }
                    </div>
                </ScrollArea>
            </DialogContent>

        </Dialog >
    )
}