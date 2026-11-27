/**
 * Farmácia Viva em Rede - Tokens de tema visual
 * Paleta oficial de cores, tipografia, raios e espaçamentos do design system.
 */

/**
 * Paleta oficial de cores
 */
export const CORES = {
  primaria: '#0C5C3E',
  primariaEscura: '#084E33',
  primariaSuave: '#E8F1ED',
  primariaSuaveForte: '#D5E7DD',
  secundaria: '#A489C5',
  secundariaEscura: '#8C6FB3',
  secundariaSuave: '#F3EDFA',
  acao: '#FAA825',
  acaoEscura: '#E09516',
  acaoSuave: '#FFF4D6',
  fundo: '#F4F8F5',
  superficie: '#FFFFFF',
  textoPrincipal: '#2E4045',
  textoSuave: '#5A6B70',
  bordaSuave: '#E0E8E4',
  bordaForte: '#CBD8D2',
  erro: '#B3261E',
  erroSuave: '#FBE9E7',
  sucesso: '#0C5C3E',
  sucessoSuave: '#E8F1ED',
} as const;

/**
 * Famílias tipográficas oficiais
 */
export const FONTES = {
  titulos: "'Montserrat', sans-serif",
  corpo: "'Inter', sans-serif",
} as const;

/**
 * Raio padrão de borda (8px conforme especificação)
 */
export const RAIO_BORDA = '8px';

/**
 * Sombras padronizadas
 */
export const SOMBRAS = {
  suave: '0 1px 3px rgba(46, 64, 69, 0.08)',
  media: '0 4px 12px rgba(46, 64, 69, 0.12)',
  elevada: '0 8px 24px rgba(46, 64, 69, 0.16)',
} as const;
