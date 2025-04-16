import { createFileRoute } from '@tanstack/react-router'
import {Link } from '@tanstack/react-router'


export const Route = createFileRoute('/')({
    component: RouteComponent,
})

function RouteComponent() {

    return (
        <div className="p-2 flex w-full justify-center items-center h-screen">
            <h3 className='font-bold'>Bem vindo ao Facilibras</h3>
        
            <div className='flex flex-col gap-2 mt-4'>
                <Link to="/login" className='bg-blue-500 p-2 rounded-md'>
                    <p className='text-white'>Login</p>
                </Link>
                <Link to="/register" className='bg-blue-500 p-2 rounded-md'>
                    <p className='text-white'> Registrar</p>
                </Link>
            </div>
        </div>
        
    )
}