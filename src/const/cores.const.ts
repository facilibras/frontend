import {Hand, ALargeSmall, Apple, IdCardIcon, PersonStandingIcon, MessageCircleMore} from "lucide-react"

interface Propriedades {
  texto: string,
  bg: string,
  bgColor: string,
  icon: React.ComponentType<{size:number, color:string}>
  hex: string
}
interface CategoriaCores {
  [key: string]: Propriedades
}

export const categoriaColor: CategoriaCores = {
  "Alfabeto": {
    texto: "text-blue-600",
    bg: "bg-blue-50",
    bgColor: "bg-blue-600",
    icon: ALargeSmall,
    hex: "#2563EB"
  },
  "Números": { 
    texto: "text-green-600",
    bg: "bg-green-50",
    bgColor: "bg-green-600",
    icon: Hand,
    hex: "#16A34A"
  },
  "Alimentos": {
    texto: "text-red-600",
    bg: "bg-red-50",
    bgColor: "bg-red-600",
    icon: Apple,
    hex: "#DC2626"
  },
  "Identidade": {
    texto: "text-yellow-600",
    bg: "bg-yellow-50",
    bgColor: "bg-yellow-600",
    icon: IdCardIcon,
    hex: "#CA8A04"
  },
  "Outros": {
    texto: "text-purple-600",
    bg: "bg-purple-50",
    bgColor: "bg-purple-600",
    icon: Hand,
    hex: "#7C3AED"
  },
  "Verbos": {
    texto: "text-pink-600",
    bg: "bg-pink-50",
    bgColor: "bg-pink-600",
    icon: Hand,
    hex: "#DB2777"
  },
  "Saudações": {
    texto: "text-indigo-600",
    bg: "bg-indigo-50",
    bgColor: "bg-indigo-600",
    icon: PersonStandingIcon,
    hex: "#4F46E5"
  },
  "Frases":{
    texto:"text-gray-600",
    bg:"bg-gray-50",
    bgColor:"bg-gray-600",
    icon: MessageCircleMore,
    hex: "#4B5563"
  },
  "Primeiro Sinal":{
    texto: "text-indigo-600",
    bg: "bg-indigo-50",
    bgColor: "bg-indigo-600",
    icon: Hand,
    hex: "#4F46E5"
  }
}