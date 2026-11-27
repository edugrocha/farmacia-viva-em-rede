/**
 * Farmácia Viva em Rede - Modal de login simulado
 * Versão MVP apenas com UI de seleção de perfil, sem backend de autenticação.
 */

import React from 'react';
import { usarAutenticacao } from '../../core/autenticacao/ContextoAutenticacao';
import { Cartao } from '../ui/Cartao';
import { Botao } from '../ui/Botao';
import { Cracha } from '../ui/Cracha';
import { CORES } from '../../core/tema/tokens';
import { useDialogA11y } from '../../core/tema/useDialogA11y';

export interface ModalLoginProps {
  aberto: boolean;
  aoFechar: () => void;
}

export const ModalLogin: React.FC<ModalLoginProps> = ({ aberto, aoFechar }) => {
  const { perfisPreConfigurados, autenticarPorPapel } = usarAutenticacao();

  const dialogRef = useDialogA11y<HTMLDivElement>(aoFechar, aberto);

  if (!aberto) return null;

  return (
    <div
      ref={dialogRef}
      role="dialog"
      aria-modal="true"
      aria-labelledby="titulo-modal-login"
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 9999,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'rgba(46, 64, 69, 0.6)',
        padding: '1rem',
      }}
    >
      <Cartao
        style={{
          width: '100%',
          maxWidth: '480px',
          display: 'flex',
          flexDirection: 'column',
          gap: '1rem',
        }}
      >
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div>
            <Cracha variante="primaria">MVP</Cracha>
            <h2
              id="titulo-modal-login"
              style={{
                margin: '0.5rem 0 0',
                fontFamily: "'Montserrat', sans-serif",
                color: CORES.primaria,
              }}
            >
              Entrar no Sistema
            </h2>
          </div>
          <button
            type="button"
            onClick={aoFechar}
            aria-label="Fechar login"
            style={{
              background: 'none',
              border: 'none',
              fontSize: '1.5rem',
              cursor: 'pointer',
              color: CORES.textoPrincipal,
              lineHeight: 1,
            }}
          >
            ×
          </button>
        </div>

        <p style={{ margin: 0, color: CORES.textoSuave, fontSize: '0.85rem' }}>
          Versão MVP: selecione um perfil pré-configurado para acessar o sistema.
        </p>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
          {perfisPreConfigurados.map((perfil) => (
            <button
              key={perfil.id}
              type="button"
              onClick={() => {
                autenticarPorPapel(perfil.tipo_usuario);
                aoFechar();
              }}
              style={{
                padding: '0.75rem',
                borderRadius: '8px',
                border: `1px solid ${CORES.bordaSuave}`,
                backgroundColor: CORES.superficie,
                cursor: 'pointer',
                textAlign: 'left',
                transition: 'border-color 0.15s ease',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.borderColor = CORES.primaria;
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.borderColor = CORES.bordaSuave;
              }}
            >
              <div style={{ fontWeight: 700, color: CORES.primaria }}>{perfil.nome}</div>
              <div style={{ fontSize: '0.8rem', color: CORES.textoSuave }}>{perfil.email}</div>
            </button>
          ))}
        </div>

        <Botao variante="contorno" onClick={aoFechar}>
          Cancelar
        </Botao>
      </Cartao>
    </div>
  );
};
