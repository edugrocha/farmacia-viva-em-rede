/**
 * Farmácia Viva em Rede - Tela de login simplificado com RBAC
 * Permite alternar entre perfis pré-configurados com 1 clique.
 */

import React from 'react';
import { usarAutenticacao } from '../../core/autenticacao/ContextoAutenticacao';
import { ROTULOS_PAPEIS } from '../../core/autenticacao/permissoes';
import { Cartao } from '../ui/Cartao';
import { Cracha } from '../ui/Cracha';
import { Botao } from '../ui/Botao';
import { CORES } from '../../core/tema/tokens';

export const TelaLoginSimplificado: React.FC = () => {
  const { perfisPreConfigurados, autenticarPorPapel } = usarAutenticacao();

  return (
    <Cartao>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
        <div>
          <Cracha variante="primaria">Acesso Rápido</Cracha>
          <h3
            style={{
              margin: '0.5rem 0 0',
              fontFamily: "'Montserrat', sans-serif",
              color: CORES.primaria,
            }}
          >
            Selecione seu Perfil
          </h3>
        </div>
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
            gap: '0.75rem',
          }}
        >
          {perfisPreConfigurados.map((perfil) => {
            const rotulo = ROTULOS_PAPEIS[perfil.tipo_usuario];
            return (
              <button
                key={perfil.id}
                type="button"
                onClick={() => autenticarPorPapel(perfil.tipo_usuario)}
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '0.4rem',
                  padding: '1rem',
                  borderRadius: '8px',
                  border: `1px solid ${CORES.bordaSuave}`,
                  backgroundColor: CORES.superficie,
                  cursor: 'pointer',
                  textAlign: 'left',
                  transition: 'border-color 0.15s ease, box-shadow 0.15s ease',
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.borderColor = CORES.primaria;
                  e.currentTarget.style.boxShadow = '0 4px 12px rgba(12,92,62,0.12)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.borderColor = CORES.bordaSuave;
                  e.currentTarget.style.boxShadow = 'none';
                }}
              >
                <div style={{ fontWeight: 700, color: CORES.primaria }}>
                  {perfil.nome}
                </div>
                <div style={{ fontSize: '0.8rem', color: CORES.textoSuave }}>
                  {rotulo.titulo}
                </div>
                <Botao variante="contorno" tamanho="pequeno" style={{ pointerEvents: 'none' }}>
                  Entrar
                </Botao>
              </button>
            );
          })}
        </div>
      </div>
    </Cartao>
  );
};
