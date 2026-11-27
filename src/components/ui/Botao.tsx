/**
 * Farmácia Viva em Rede - Componente de Botão Padrão
 * Variantes visuais padronizadas com 8px de raio de borda.
 */

import React from 'react';
import { CORES, RAIO_BORDA } from '../../core/tema/tokens';

export type VarianteBotao = 'primario' | 'secundario' | 'acao' | 'contorno' | 'texto' | 'perigo';

export interface BotaoProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variante?: VarianteBotao;
  tamanho?: 'pequeno' | 'medio' | 'grande';
  larguraTotal?: boolean;
}

const ESTILOS_VARIANTES: Record<VarianteBotao, React.CSSProperties> = {
  primario: {
    backgroundColor: CORES.primaria,
    color: '#FFFFFF',
    border: 'none',
  },
  secundario: {
    backgroundColor: CORES.secundaria,
    color: '#FFFFFF',
    border: 'none',
  },
  acao: {
    backgroundColor: CORES.acao,
    color: CORES.textoPrincipal,
    border: 'none',
  },
  contorno: {
    backgroundColor: 'transparent',
    color: CORES.primaria,
    border: `2px solid ${CORES.primaria}`,
  },
  texto: {
    backgroundColor: 'transparent',
    color: CORES.primaria,
    border: 'none',
    textDecoration: 'underline',
  },
  perigo: {
    backgroundColor: CORES.erro,
    color: '#FFFFFF',
    border: 'none',
  },
};

const ESTILOS_TAMANHOS: Record<NonNullable<BotaoProps['tamanho']>, React.CSSProperties> = {
  pequeno: {
    padding: '0.5rem 1rem',
    fontSize: '0.8rem',
  },
  medio: {
    padding: '0.75rem 1.5rem',
    fontSize: '0.85rem',
  },
  grande: {
    padding: '1rem 2rem',
    fontSize: '1rem',
  },
};

export const Botao: React.FC<BotaoProps> = ({
  variante = 'primario',
  tamanho = 'medio',
  larguraTotal = false,
  style,
  children,
  disabled,
  ...props
}) => {
  const estiloVariante = ESTILOS_VARIANTES[variante];
  const estiloTamanho = ESTILOS_TAMANHOS[tamanho];

  return (
    <button
      style={{
        ...estiloVariante,
        ...estiloTamanho,
        borderRadius: RAIO_BORDA,
        fontFamily: "'Inter', sans-serif",
        fontWeight: 600,
        cursor: disabled ? 'not-allowed' : 'pointer',
        minHeight: '44px',
        opacity: disabled ? 0.6 : 1,
        width: larguraTotal ? '100%' : 'auto',
        display: 'inline-flex',
        alignItems: 'center',
        justifyContent: 'center',
        gap: '0.5rem',
        transition: 'filter 0.15s ease, transform 0.15s ease',
        ...style,
      }}
      disabled={disabled}
      onMouseEnter={(e) => {
        if (!disabled) e.currentTarget.style.filter = 'brightness(0.92)';
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.filter = 'brightness(1)';
      }}
      {...props}
    >
      {children}
    </button>
  );
};
