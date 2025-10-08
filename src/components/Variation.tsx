interface VariationProps {
    instrucoes: string[];
    linkvideo: string;
}

export default function Variation({ instrucoes, linkvideo }: VariationProps) {

    return (
        <div id="variation1" className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="w-full p-4">
                <div className="aspect-w-16 aspect-h-9 relative mb-4 video-placeholder">
                    <div className="w-full h-64 bg-gray-200 flex items-center justify-center rounded-2xl">
                        <span className="absolute top-1 right-1 font-bold bg-blue-500 text-white rounded-sm p-1">Variação 1</span>
                        <iframe
                            src={linkvideo}
                            allow="autoplay"
                            className='w-full h-full'
                        >
                        </iframe>
                        <i className="fas fa-play-circle text-5xl text-blue-500"></i>
                    </div>
                </div>
            </div>
            <div className="w-full pb-4 pl-4 relative vertical-divider">
                <h4 className="text-lg font-medium text-gray-800 mb-2"> Como fazer: </h4>
                <ul className="list-disc pl-5 text-gray-700 space-y-1">
                    {
                        instrucoes.map((instrucao, index) => (
                            <li key={index}>{instrucao}</li>
                        ))
                    }

                </ul>
            </div>
        </div>
    );
}