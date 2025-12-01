import { create } from 'zustand';

interface configProps {
    config: boolean;
    stateConfig: () => void;
}

export const useConfig = create<configProps>((set) => ({
    config: true,
    stateConfig: () => {
        set((state) => ({
            config: !state.config 
        }
    ));
    }
}));