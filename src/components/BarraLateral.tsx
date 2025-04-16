import { Link } from '@tanstack/react-router'
import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from "./ui/accordion"
import { ReactNode } from 'react';

export default function BarraLateral({ Painel }: { Painel: ReactNode }) {

    return <div className='flex'>

        <div className='w-1/5 bg-purple-950 rounded-sm m-2 p-2' > {/* Barra Lateral */}

            <h1 className='text-center text-white'> Facilibras </h1>

            <Accordion type="multiple">
                <AccordionItem value="item-1">
                    <AccordionTrigger className='text-white bg-none'> Exercicos</AccordionTrigger>
                    <AccordionContent>
                        <Link to='/exercicios/$categoriaExercicio'
                            params={{ categoriaExercicio: 'meses-do-ano' }}>
                            Mêses do Ano
                        </Link>
                    </AccordionContent>
                    <AccordionContent>
                        <Link to='/exercicios/$categoriaExercicio'
                            params={{ categoriaExercicio: 'dias-da-semana' }}>
                            Dias da Semana
                        </Link>
                    </AccordionContent>
                    <AccordionContent>
                        <Link to='/exercicios/$categoriaExercicio'
                            params={{ categoriaExercicio: 'animais' }}>
                            Animais
                        </Link>
                    </AccordionContent>
                    <AccordionContent>
                        <Link to='/exercicios/$categoriaExercicio'
                            params={{ categoriaExercicio: 'frutas' }}>
                            Frutas
                        </Link>
                    </AccordionContent>
                </AccordionItem>
            </Accordion>

        </div>
        {Painel}
    </div>
}