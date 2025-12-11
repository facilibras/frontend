import { Contrast, AArrowUp, AArrowDown } from 'lucide-react'
import { Button } from '../ui/button';
import { useThemeStore } from '../../store/theme';
import { useConfig } from '../../store/config';
import { useRef } from 'react';

const fontSizes = [
    "",
    "text-lg",
    "text-xl",
    "text-2xl",
    "text-3xl",
    "text-4xl",
    "text-5xl",
];

export const Toolbar = () => {

    const { theme, setTheme } = useThemeStore();
    const { config } = useConfig()
    const fontIndex = useRef(0);

    const applyFontClass = () => {
        fontSizes.forEach(cls => cls && document.body.classList.remove(cls));

        const cls = fontSizes[fontIndex.current];
        if (cls) document.body.classList.add(cls);
    };

    const contrastBtn = () => {
        setTheme(theme === 'highcontrast' ? 'light' : 'highcontrast')
    };

    const fontIncrease = () => {
        if (fontIndex.current < fontSizes.length - 1) {
            fontIndex.current++;
            applyFontClass();
        }
    };

    const fontDecrease = () => {
        if (fontIndex.current > 0) {
            fontIndex.current--;
            applyFontClass();
        }
    };

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
                    <AArrowUp className="w-4 h-4"/>
                    <span className="max-w-0 overflow-hidden group-hover:max-w-xs transition-all duration-300 ml-2">
                        Aumentar Fonte
                    </span>
                </Button>

                <Button onClick={fontDecrease} id="fontDecreaseBtn"
                    className="group flex items-center px-3 py-1 bg-white text-blue-600 rounded-lg hover:bg-blue-50 transition-all overflow-hidden whitespace-nowrap">
                    <AArrowDown className="w-4 h-4" />
                    <span className="max-w-0 overflow-hidden group-hover:max-w-xs transition-all duration-300 ml-2">
                        Diminuir Fonte
                    </span>
                </Button>

            </div>)}
        </>
    )
}
