/**
 * Farmácia Viva em Rede - Componente de Campo de Entrada Padrão
 * Input estilizado com 8px de raio de borda.
 */

import React from 'react';
import { CORES, RAIO_BORDA } from '../../core/tema/tokens';

export interface CampoEntradaProps extends React.InputHTMLAttributes<HTMLInputElement> {
  rotulo?: string;
  mensagemErro?: string;
}

export const CampoEntrada: React.FC<CampoEntradaProps> = ({
  rotulo,
  mensagemErro,
  style,
  id,
  ...props
}) => {
  const idCampo = id || rotulo?.toLowerCase().replace(/\s+/g, '-');

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '0.4rem' }}>
      {rotulo && (
        <label
          htmlFor={idCampo}
          style={{
            fontSize: '0.85rem',
            fontWeight: 600,
            color: CORES.textoPrincipal,
            fontFamily: "'Inter', sans-serif",
          }}
        >
          {rotulo}
        </label>
      )}
      <input
        id={idCampo}
        style={{
          padding: '0.75rem 1rem',
          border: mensagemErro ? `2px solid ${CORES.erro}` : `1px solid ${CORES.bordaSuave}`,
          borderRadius: RAIO_BORDA,
          fontFamily: "'Inter', sans-serif",
          fontSize: '0.95rem',
          color: CORES.textoPrincipal,
          backgroundColor: CORES.superficie,
          outline: 'none',
          transition: 'border-color 0.15s ease, box-shadow 0.15s ease',
          ...style,
        }}
        onFocus={(e) => {
          e.currentTarget.style.borderColor = CORES.primaria;
          e.currentTarget.style.boxShadow = `0 0 0 3px ${CORES.primariaSuave}`;
        }}
        onBlur={(e) => {
          e.currentTarget.style.borderColor = mensagemErro ? CORES.erro : CORES.bordaSuave;
          e.currentTarget.style.boxShadow = 'none';
        }}
        {...props}
      />
      {mensagemErro && (
        <span style={{ fontSize: '0.75rem', color: CORES.erro, fontFamily: "'Inter', sans-serif" }}>
          {mensagemErro}
        </span>
      )}
    </div>
  );
};
