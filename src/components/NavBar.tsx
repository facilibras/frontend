import { Home } from "lucide-react"

export default function NavBar() {

    return <>
        <div className="w-full bg-purple-500 h-8">
            <div className="w-1/2 flex justify-between">
                <Home color="white" />
                <p className="text-white">Facilibras</p>
            </div>

        </div>
    </>
}