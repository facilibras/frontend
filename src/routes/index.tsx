import { createFileRoute } from '@tanstack/react-router'


export const Route = createFileRoute('/')({
    component: RouteComponent,
})

function RouteComponent() {

    return (
        <div className="p-2 flex w-full justify-center items-center h-screen">
            <h3 className='font-bold'>Welcome Home!</h3>
        </div>
    )
}