/**
 * Farmácia Viva em Rede - Widget flutuante do assistente de IA
 * Botão fixo no canto inferior direito que abre um chat flutuante.
 * Versão MVP apenas com UI, sem backend de IA integrado.
 */

import React, { useState } from 'react';
import { CORES, RAIO_BORDA, SOMBRAS } from '../../core/tema/tokens';

export const WidgetFlutuanteIA: React.FC = () => {
  const [aberto, setAberto] = useState(false);
  const [mensagemUsuario, setMensagemUsuario] = useState('');
  const [historico, setHistorico] = useState<
    Array<{ remetente: 'usuario' | 'assistente'; texto: string }>
  >([]);

  const aoEnviar = (evento: React.FormEvent) => {
    evento.preventDefault();
    const texto = mensagemUsuario.trim();
    if (!texto) return;

    setHistorico((anterior) => [
      ...anterior,
      { remetente: 'usuario', texto },
    ]);

    setTimeout(() => {
      setHistorico((anterior) => [
        ...anterior,
        {
          remetente: 'assistente',
          texto:
            'Olá! Sou o assistente institucional da Farmácia Viva em Rede. Em breve poderei responder suas perguntas sobre plantas medicinais com base em fontes oficiais brasileiras.',
        },
      ]);
    }, 450);

    setMensagemUsuario('');
  };

  return (
    <>
      <button
        type="button"
        onClick={() => setAberto((v) => !v)}
        aria-label={aberto ? 'Fechar assistente de IA' : 'Abrir assistente de IA'}
        style={{
          position: 'fixed',
          bottom: 'calc(1.25rem + env(safe-area-inset-bottom))',
          right: '1.25rem',
          zIndex: 10000,
          width: '56px',
          height: '56px',
          borderRadius: '50%',
          border: 'none',
          backgroundColor: CORES.primaria,
          color: '#FFFFFF',
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
          <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
        </svg>
      </button>

      {aberto && (
        <div
          role="dialog"
          aria-label="Assistente de inteligência artificial"
          style={{
            position: 'fixed',
            bottom: 'calc(6.5rem + env(safe-area-inset-bottom))',
            right: '1.25rem',
            zIndex: 10000,
            width: 'min(420px, calc(100vw - 2.5rem))',
            height: '520px',
            backgroundColor: CORES.superficie,
            borderRadius: RAIO_BORDA,
            boxShadow: SOMBRAS.elevada,
            display: 'flex',
            flexDirection: 'column',
            border: `1px solid ${CORES.bordaSuave}`,
            overflow: 'hidden',
          }}
        >
          <div
            style={{
              backgroundColor: CORES.primaria,
              color: '#FFFFFF',
              padding: '1rem 1.25rem',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
            }}
          >
            <div>
              <div style={{ fontFamily: "'Montserrat', sans-serif", fontWeight: 700, fontSize: '1rem' }}>
                Assistente Fitoterápico
              </div>
              <div style={{ fontSize: '0.75rem', opacity: 0.85 }}>
                Orientações baseadas em fontes oficiais brasileiras
              </div>
            </div>
            <button
              type="button"
              onClick={() => setAberto(false)}
              aria-label="Fechar assistente"
              style={{
                background: 'none',
                border: 'none',
                color: '#FFFFFF',
                fontSize: '1.15rem',
                cursor: 'pointer',
                lineHeight: 1,
              }}
            >
              ×
            </button>
          </div>

          <div
            style={{
              flex: 1,
              padding: '1rem',
              display: 'flex',
              flexDirection: 'column',
              gap: '0.6rem',
              overflowY: 'auto',
              backgroundColor: CORES.fundo,
            }}
          >
            {historico.length === 0 ? (
              <div
                style={{
                  textAlign: 'center',
                  color: CORES.textoSuave,
                  fontSize: '0.85rem',
                  padding: '1.5rem 0.5rem',
                  lineHeight: 1.6,
                }}
              >
                Olá! Sou o assistente da Farmácia Viva em Rede. Em breve poderei responder suas
                perguntas sobre plantas medicinais com base em fontes oficiais brasileiras.
              </div>
            ) : (
              historico.map((item, indice) => (
                <div
                  key={indice}
                  style={{
                    alignSelf: item.remetente === 'usuario' ? 'flex-end' : 'flex-start',
                    maxWidth: '80%',
                    padding: '0.75rem 1rem',
                    borderRadius: RAIO_BORDA,
                    fontFamily: "'Inter', sans-serif",
                    fontSize: '0.85rem',
                    lineHeight: 1.45,
                    backgroundColor:
                      item.remetente === 'usuario' ? CORES.primariaSuave : CORES.superficie,
                    border: `1px solid ${CORES.bordaSuave}`,
                  }}
                >
                  {item.texto}
                </div>
              ))
            )}
          </div>

          <form onSubmit={aoEnviar} style={{ display: 'flex', gap: '0.5rem', padding: '0.75rem' }}>
            <input
              type="text"
              value={mensagemUsuario}
              onChange={(e) => setMensagemUsuario(e.target.value)}
              placeholder="Escreva sua pergunta..."
              aria-label="Digite sua mensagem"
              style={{
                flex: 1,
                padding: '0.75rem 1rem',
                borderRadius: RAIO_BORDA,
                border: `1px solid ${CORES.bordaSuave}`,
                fontFamily: "'Inter', sans-serif",
                  fontSize: '1rem',
                  outline: 'none',
                }}
                onFocus={(e) => {
                  e.currentTarget.style.borderColor = CORES.primaria;
                  e.currentTarget.style.boxShadow = `0 0 0 3px ${CORES.primariaSuave}`;
                }}
                onBlur={(e) => {
                  e.currentTarget.style.borderColor = CORES.bordaSuave;
                  e.currentTarget.style.boxShadow = 'none';
                }}
              />
            <button
              type="submit"
              style={{
                padding: '0.75rem 1.25rem',
                borderRadius: RAIO_BORDA,
                border: 'none',
                backgroundColor: CORES.primaria,
                color: '#FFFFFF',
                fontFamily: "'Inter', sans-serif",
                fontWeight: 600,
                cursor: 'pointer',
              }}
            >
              Enviar
            </button>
          </form>
        </div>
      )}
    </>
  );
};
