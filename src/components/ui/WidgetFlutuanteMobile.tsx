/**
 * Farmácia Viva em Rede - Widget flutuante de download do aplicativo móvel
 * Botão fixo no canto inferior esquerdo indicando download do app.
 */

import React, { useState } from 'react';
import { CORES, RAIO_BORDA, SOMBRAS } from '../../core/tema/tokens';

export const WidgetFlutuanteMobile: React.FC = () => {
  const [aberto, setAberto] = useState(false);

  return (
    <>
      <button
        type="button"
        onClick={() => setAberto((v) => !v)}
        aria-label="Baixar aplicativo móvel"
        style={{
          position: 'fixed',
          bottom: 'calc(1.25rem + env(safe-area-inset-bottom))',
          left: '1.25rem',
          zIndex: 10000,
          width: '56px',
          height: '56px',
          borderRadius: '50%',
          border: 'none',
          backgroundColor: CORES.acao,
          color: CORES.textoPrincipal,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          cursor: 'pointer',
          boxShadow: SOMBRAS.elevada,
          transition: 'transform 0.15s ease',
        }}
        onMouseEnter={(e) => (e.currentTarget.style.transform = 'scale(1.08)')}
        onMouseLeave={(e) => (e.currentTarget.style.transform = 'scale(1)')}
      >
        <svg
          width="26"
          height="26"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          aria-hidden="true"
        >
          <path d="M12 17v-6" />
          <path d="M8 13l4 4 4-4" />
          <rect x="6" y="3" width="12" height="18" rx="2" />
        </svg>
      </button>

      {aberto && (
        <div
          role="dialog"
          aria-label="Download do aplicativo móvel"
          style={{
            position: 'fixed',
            bottom: 'calc(6.5rem + env(safe-area-inset-bottom))',
            left: '1.25rem',
            zIndex: 10000,
            width: 'min(320px, calc(100vw - 2.5rem))',
            backgroundColor: CORES.superficie,
            borderRadius: RAIO_BORDA,
            boxShadow: SOMBRAS.elevada,
            border: `1px solid ${CORES.bordaSuave}`,
            padding: '1.25rem',
            display: 'flex',
            flexDirection: 'column',
            gap: '0.75rem',
          }}
        >
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <h3
              style={{
                margin: 0,
                fontFamily: "'Montserrat', sans-serif",
                fontSize: '1rem',
                color: CORES.primaria,
              }}
            >
              Versão Mobile
            </h3>
            <button
              type="button"
              onClick={() => setAberto(false)}
              aria-label="Fechar"
              style={{
                background: 'none',
                border: 'none',
                fontSize: '1.15rem',
                cursor: 'pointer',
                color: CORES.textoPrincipal,
                lineHeight: 1,
              }}
            >
              ×
            </button>
          </div>
          <p style={{ margin: 0, fontSize: '0.85rem', color: CORES.textoSuave }}>
            Em breve estará disponível o aplicativo móvel da Farmácia Viva em Rede para Android e
            iOS. Salve este link e acompanhe o lançamento.
          </p>
          <button
            type="button"
            onClick={() => setAberto(false)}
            style={{
              padding: '0.75rem',
              borderRadius: RAIO_BORDA,
              border: 'none',
              backgroundColor: CORES.acao,
              color: CORES.textoPrincipal,
              fontFamily: "'Inter', sans-serif",
              fontWeight: 700,
              cursor: 'pointer',
            }}
          >
            Entendi
          </button>
        </div>
      )}
    </>
  );
};
