/**
 * Farmácia Viva em Rede - Rodapé institucional
 */

import React from 'react';
import { Link } from 'react-router-dom';
import { CORES } from '../../core/tema/tokens';
import { useIsMobile } from '../../core/tema/useMediaQuery';

export const Rodape: React.FC = () => {
  const isMobile = useIsMobile();
  return (
    <footer
      style={{
        backgroundColor: CORES.textoPrincipal,
        color: CORES.fundo,
        padding: isMobile ? '1.5rem 1rem' : '2rem 1.5rem',
      }}
    >
      <div
        style={{
          maxWidth: '1280px',
          margin: '0 auto',
          display: 'flex',
          justifyContent: 'space-between',
          gap: '1.5rem',
          flexWrap: 'wrap',
          alignItems: 'center',
        }}
      >
        <div>
          <div
            style={{
              fontFamily: "'Montserrat', sans-serif",
              fontWeight: 700,
              fontSize: '1rem',
              marginBottom: '0.5rem',
            }}
          >
            Farmácia Viva em Rede
          </div>
          <div style={{ fontSize: '0.8rem', opacity: 0.85 }}>
            Conectando comunidades a jardins medicinais certificados.
          </div>
        </div>
        <div style={{ display: 'flex', gap: '1.25rem', flexWrap: 'wrap' }}>
          <Link to="/" style={{ color: CORES.fundo, textDecoration: 'none', fontSize: '0.85rem' }}>
            Início
          </Link>
          <Link to="/jardins" style={{ color: CORES.fundo, textDecoration: 'none', fontSize: '0.85rem' }}>
            Jardins e Mapeamento
          </Link>
          <Link to="/forum" style={{ color: CORES.fundo, textDecoration: 'none', fontSize: '0.85rem' }}>
            Fórum
          </Link>
          <Link to="/assistente" style={{ color: CORES.fundo, textDecoration: 'none', fontSize: '0.85rem' }}>
            Assistente de IA
          </Link>
        </div>
      </div>
    </footer>
  );
};
