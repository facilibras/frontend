import { Contrast, AArrowUp, AArrowDown } from 'lucide-react'
import { Button } from '../ui/button';
import { useThemeStore } from '../../store/theme';
import { useConfig } from '../../store/config';


export const Toolbar = () => {

    const { theme, setTheme } = useThemeStore();
    const { config } = useConfig()

    const contrastBtn = () => {
        setTheme(theme === 'highcontrast' ? 'light' : 'highcontrast')
    };

    const fontIncrease = () => {
        const tamanhoAtual = parseFloat(getComputedStyle(document.body).fontSize);
        document.body.style.fontSize = (tamanhoAtual + 1) + 'px';
    }


    const fontDecrease = () => {
        const tamanhoAtual = parseFloat(getComputedStyle(document.body).fontSize);
        if (tamanhoAtual > 12) {
            document.body.style.fontSize = (tamanhoAtual - 1) + 'px';
        }
    }

    return (
        <>
            {config && (<div
                className="fixed top-1/3 right-0 z-50 bg-transparent text-white p-2 flex flex-col items-end gap-4 rounded-l-lg ">

                <Button onClick={contrastBtn} id="contrastBtn"
                    className="group flex items-center px-3 py-1 bg-white text-blue-600 rounded-lg hover:bg-blue-50 transition-all overflow-hidden whitespace-nowrap ">
                    <Contrast className="w-4 h-4" />
                    <span className="max-w-0 overflow-hidden group-hover:max-w-xs transition-all duration-300 ml-2">
                        Alto Contraste</span>
                </Button>
                <Button onClick={fontIncrease} id="fontIncreaseBtn"
                    className="group flex items-center px-3 py-1 bg-white text-blue-600 rounded-lg hover:bg-blue-50 transition-all overflow-hidden whitespace-nowrap">
                    <AArrowUp className="w-4 h-4"
                    />
                    <span className="max-w-0 overflow-hidden group-hover:max-w-xs transition-all duration-300 ml-2">
                        Aumentar Fonte
                    </span>
                </Button>
                <Button onClick={fontDecrease} id="fontDecreaseBtn"
                    className="group flex items-center px-3 py-1 bg-white text-blue-600 rounded-lg hover:bg-blue-50 transition-all overflow-hidden whitespace-nowrap">
                    <AArrowDown className="w-4 h-4" />
                    <span className="max-w-0 overflow-hidden group-hover:max-w-xs transition-all duration-300 ml-2">Restaurar
                        Fonte</span>
                </Button>
            </div>)}
        </>
    )
}