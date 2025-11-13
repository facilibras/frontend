import { useEffect, useState } from "react"
import { GetExerciciosSecoes } from "../../Services/GetExerciciosSecoes"
import { Secao } from "../../Models/Secao";
import { ExerciseCard } from "../Exercise/ExerciseCard/Index";
import { Colors } from "../../utils/ColorsCard";
import { Link } from "@tanstack/react-router";
import { Skeleton } from "../ui/skeleton";

export const ExerciseSection = () => {
    const [secoes, setSecoes] = useState<Secao[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        let mounted = true;

        (async () => {
            try {
                const res = await GetExerciciosSecoes();
                if (mounted && res) setSecoes(res.splice(0, 3));
            } finally {
                if (mounted) setLoading(false);
            }
        })();

        return () => { mounted = false; }
    }, []);

    return (
        <section id="recursos" className="mb-20">
        <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-800 mb-4">Exercícios de Libras</h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">Aprenda Libras com diferentes exercícios através do
                reconhecimento de gestos.</p>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
            {loading ? (
                <>
                    <Skeleton className="bg-indigo-100 h-72 w-full col-span-3 md:col-span-1" />

                    <Skeleton className="bg-indigo-100 h-72 w-full col-span-3 md:col-span-1" />

                    <Skeleton className="bg-indigo-100 h-72 w-full col-span-3 md:col-span-1" />
                </>
            ) : (
                secoes.length > 0 && secoes.map((secao: Secao, index: number) => (
                    <ExerciseCard.Root key={index}>
                        <ExerciseCard.Header variant={secao.nome} Icon={Colors[secao.nome].Icon}/>

                        <ExerciseCard.Body
                            variationsCount={secao.qtdEx}
                            variant={secao.nome}
                            exerciseTitle={secao.nome}
                            exerciseDescription='Pratique o vocabulário básico de Libras com este exercício interativo.'
                        >
                            <Link to={`/exercicios`} className="text-sm block text-blue-500 hover:underline">
                                Acessar Exercício
                            </Link>
                        </ExerciseCard.Body>
                    </ExerciseCard.Root>
                ))
            )}
        </div>
    </section>
    )
}