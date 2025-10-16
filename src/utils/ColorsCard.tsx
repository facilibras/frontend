import { Apple, BookType, Hand, HandCoins, Handshake, Pointer, User } from "lucide-react";

export const Colors: Record<string, { containerBG: string; iconColor: string; textColor: string; chipBG: string; buttonBG: string, Icon: React.ElementType }> = {
    Alfabeto: {
        containerBG: 'bg-blue-50',
        iconColor: 'text-blue-500',
        textColor: 'text-blue-600',
        chipBG: 'text-blue-500',
        buttonBG: 'bg-blue-500 hover:bg-blue-800 text-white',
        Icon: Hand,
    },
    'Números': {
        containerBG: 'bg-red-50',
        iconColor: 'text-red-500',
        textColor: 'text-red-600',
        chipBG: 'text-red-500',
        buttonBG: 'bg-red-500 hover:bg-red-800 text-white',
        Icon: Pointer,
    },
    Alimentos: {
        containerBG: 'bg-yellow-50',
        iconColor: 'text-yellow-500',
        textColor: 'text-yellow-600',
        chipBG: 'text-yellow-500',
        buttonBG: 'bg-yellow-500 hover:bg-yellow-800 text-white',
        Icon: Apple,
    },
    Verbos: {
        containerBG: 'bg-pink-50',
        iconColor: 'text-pink-500',
        textColor: 'text-pink-600',
        chipBG: 'text-pink-500',
        buttonBG: 'bg-pink-500 hover:bg-pink-800 text-white',
        Icon: BookType,
    },
    'Saudações': {
        containerBG: 'bg-green-50',
        iconColor: 'text-green-500',
        textColor: 'text-green-600',
        chipBG: 'text-green-500',
        buttonBG: 'bg-green-500 hover:bg-green-800 text-white',
        Icon: Handshake,
    },
    Identidade: {
        containerBG: 'bg-indigo-50',
        iconColor: 'text-indigo-500',
        textColor: 'text-indigo-600',
        chipBG: 'text-indigo-500',
        buttonBG: 'bg-indigo-500 hover:bg-indigo-800 text-white',
        Icon: User
    },
    Outros: {
        containerBG: 'bg-gray-50',
        iconColor: 'text-gray-500',
        textColor: 'text-gray-600',
        chipBG: 'text-gray-500',
        buttonBG: 'bg-gray-500 hover:bg-gray-800 text-white',
        Icon: HandCoins
    },
};