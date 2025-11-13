import { PlayCircle } from "lucide-react";
import { ExerciseVariants } from "../../../Models/ExerciseVariants";
import { Colors } from "../../../utils/ColorsCard";

interface BodyCardProps {
    variationsCount: number;
    variant: ExerciseVariants['type'];
    exerciseTitle: string;
    exerciseDescription: string;
    children?: React.ReactNode;
}

export const BodyCard = ({ variationsCount, exerciseTitle, exerciseDescription, children, variant }: BodyCardProps) => {
    return (
        <div className="p-4">
            <h3 className="text-xl font-semibold text-gray-800 mb-2">{exerciseTitle}</h3>
            <p className="text-gray-600 text-sm mb-4">{exerciseDescription}</p>
            <div className="flex justify-between items-center">
                <div className="flex items-center">
                    <PlayCircle className={`${Colors[variant].iconColor} mr-1`} />
                    <span className="text-xs text-gray-500">{variationsCount} variações</span>
                </div>
                
                {children}
            </div>
        </div>  
    )
}