import { ExerciseVariants } from "../../../Models/ExerciseVariants";
import { Colors } from "../../../utils/ColorsCard";

interface ChipSubTypeHeaderProps {
   children?: React.ReactNode;
   type: ExerciseVariants['type'];
}

export const ChipSubTypeHeader = ({ children, type }: ChipSubTypeHeaderProps) => {
    return <span 
        className={`absolute top-3 left-3 ${Colors[type].chipBG} text-white text-xs px-2 py-1 rounded`}>
            {children}
        </span>
}