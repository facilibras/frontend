import { Link } from "@tanstack/react-router"
import { Colors } from "../../../utils/ColorsCard";
import { ExerciseVariants } from "../../../Models/ExerciseVariants";

interface ActionCardProps {
    link: string;
    children?: React.ReactNode;
    variant: ExerciseVariants['type'];
}

export const ActionCard = ({ link, children, variant }: ActionCardProps) => {
    return (
        <Link to={link}>
            <button className={`${Colors[variant].buttonBG} font-medium text-sm transition`}>
                {children}
            </button>
        </Link>
    )
}