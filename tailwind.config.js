/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        /* Paleta de Cores Institucional - Farmácia Viva em Rede */
        primaria: {
          DEFAULT: '#0C5C3E',
          escura: '#08402B',
          clara: '#147A53',
        },
        secundaria: {
          DEFAULT: '#A489C5',
          escura: '#8767AF',
          clara: '#C4B2DC',
        },
        acao: {
          DEFAULT: '#FAA825',
          escura: '#E09215',
          clara: '#FBC05A',
        },
        'fundo-neutro': {
          DEFAULT: '#F4F8F5',
          claro: '#FFFFFF',
          escuro: '#E7EFEA',
        },
        'texto-principal': {
          DEFAULT: '#2E4045',
          suave: '#506368',
          escuro: '#1D2A2E',
        },
      },
      fontFamily: {
        /* Hierarquia Tipográfica Oficial */
        titulos: ['Montserrat', 'Poppins', 'sans-serif'],
        subtitulos: ['Montserrat', 'Open Sans', 'sans-serif'],
        corpo: ['Inter', 'Roboto', 'sans-serif'],
      },
      borderRadius: {
        /* Raio de Borda Padronizado em 8px conforme diretriz de UI/UX */
        padrao: '8px',
        DEFAULT: '8px',
      },
      boxShadow: {
        suave: '0 4px 16px rgba(12, 92, 62, 0.08)',
        destaque: '0 8px 24px rgba(12, 92, 62, 0.14)',
      },
    },
  },
  plugins: [],
};

