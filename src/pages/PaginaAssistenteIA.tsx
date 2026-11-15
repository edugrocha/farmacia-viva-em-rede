/**
 * Farmácia Viva em Rede - Página Assistente de IA
 */

import React from 'react';
import { InterfaceAssistenteIA } from '../components/ia/InterfaceAssistenteIA';
import { Cracha } from '../components/ui/Cracha';
import { CORES } from '../core/tema/tokens';

export const PaginaAssistenteIA: React.FC = () => {
  return (
    <section aria-labelledby="titulo-assistente">
      <div style={{ marginBottom: '1.5rem' }}>
        <Cracha variante="acao">Assistente Institucional</Cracha>
        <h1
          id="titulo-assistente"
          style={{
            fontFamily: "'Montserrat', sans-serif",
            fontSize: '1.5rem',
            fontWeight: 700,
            marginTop: '0.5rem',
            marginBottom: 0,
          }}
        >
          Assistente de IA
        </h1>
        <p style={{ color: CORES.textoSuave, marginTop: '0.5rem' }}>
          Orientações sobre plantas medicinais com base em fontes oficiais brasileiras.
        </p>
      </div>

      <InterfaceAssistenteIA />
    </section>
  );
};
