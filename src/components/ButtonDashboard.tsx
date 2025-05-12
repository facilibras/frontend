import { Link } from '@tanstack/react-router'
interface ButtonDashboardProps {
    nome: string,
    Icone: React.ComponentType<{ size: number, color: string }>,
    rota: string
}
export const ButtonDashboard: React.FC<ButtonDashboardProps> = ({ nome, Icone, rota }) => {

    return (
        <div className='bg-blue-400 w-full h-32 rounded-xl cursor-pointer hover:bg-blue-600 transition-all duration-300'>
            <Link to={rota} className='w-full h-full flex flex-col items-center justify-center'>
                <Icone size={40} color="white"/>
                <h2 className='font-medium text-3xl text-white'> {nome} </h2>
            </Link>
        </div>
    )
}