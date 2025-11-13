import type { Config } from 'tailwindcss' 
import plugin from 'tailwindcss/plugin'

const config: Config = {
  darkMode: 'class',
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'teste-rapido': '#FF00FF',
      }
    },
  },
  plugins: [

  ],
}

export default config