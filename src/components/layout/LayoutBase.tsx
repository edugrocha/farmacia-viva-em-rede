/**
 * Farmácia Viva em Rede - Layout base com cabeçalho, conteúdo e rodapé
 */

import React from 'react';
import { Cabecalho } from './Cabecalho';
import { Rodape } from './Rodape';
import { WidgetFlutuanteIA } from '../ia/WidgetFlutuanteIA';
import { WidgetFlutuanteMobile } from '../ui/WidgetFlutuanteMobile';
import { CORES } from '../../core/tema/tokens';
import { useIsMobile } from '../../core/tema/useMediaQuery';

export const LayoutBase: React.FC<{ children?: React.ReactNode }> = ({ children }) => {
  const isMobile = useIsMobile();
  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        minHeight: '100vh',
        backgroundColor: CORES.fundo,
        color: CORES.textoPrincipal,
        fontFamily: "'Inter', sans-serif",
      }}
    >
      <Cabecalho />
      <main
        style={{
          flexGrow: 1,
          flexShrink: 0,
          flexBasis: 'auto',
          maxWidth: '1280px',
          width: '100%',
          margin: '0 auto',
          padding: isMobile ? '1rem' : '1.5rem',
          display: 'flex',
          flexDirection: 'column',
          gap: isMobile ? '1.5rem' : '2rem',
        }}
      >
        {children}
      </main>
      <Rodape />
      <WidgetFlutuanteIA />
      <WidgetFlutuanteMobile />
    </div>
  );
};
