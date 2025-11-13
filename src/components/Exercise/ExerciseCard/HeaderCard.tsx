import { Colors } from "../../../utils/ColorsCard";

interface HeaderCardProps {
   children?: React.ReactNode;
   variant: 'Alfabeto' | 'Números' | 'Alimentos' | 'Verbos' | 'Saudações' | 'Identidade' | 'Outros';
   Icon: React.ElementType;
   title?: string;
}

export const HeaderCard = ({
    children,
    Icon,
    variant,
    title = 'Praticar agora',
}: HeaderCardProps) => {
    return (
        <div className={`h-48 ${Colors[variant].containerBG} flex items-center justify-center relative`}>
            <div className="flex flex-col items-center justify-center text-center">
                <Icon className={`fas fa-hand-paper text-5xl ${Colors[variant].iconColor} mb-3`} size={32}/>
                {title && <p className={`font-medium ${Colors[variant].textColor}`}>{title}</p>}
            </div>
            {children}
        </div>
    );
};