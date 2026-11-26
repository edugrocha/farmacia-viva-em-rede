/**
 * Farmácia Viva em Rede — MorfologiaEspecie
 * Tabela simplificada de características morfológicas para identificação em campo.
 */

import React from 'react';
import type { EspeciePlanta } from '../../core/modelos/entidades';
import { CORES, FONTES, RAIO_BORDA } from '../../core/tema/tokens';

interface Props {
  morfologia: EspeciePlanta['morfologia'];
}

const CAMPOS: Array<{ chave: keyof EspeciePlanta['morfologia']; label: string }> = [
  { chave: 'habito', label: 'Hábito' },
  { chave: 'folhas', label: 'Folhas' },
  { chave: 'flores', label: 'Flores' },
  { chave: 'frutos', label: 'Frutos' },
  { chave: 'raiz', label: 'Raiz' },
  { chave: 'aroma', label: 'Aroma' },
];

export const MorfologiaEspecie: React.FC<Props> = ({ morfologia }) => (
  <dl style={{ margin: 0, display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
    {CAMPOS.filter(({ chave }) => morfologia[chave]).map(({ chave, label }) => (
      <div
        key={String(chave)}
        style={{
          display: 'grid',
          gridTemplateColumns: '7rem 1fr',
          gap: '0.5rem',
          padding: '0.5rem 0.6rem',
          borderRadius: RAIO_BORDA,
          backgroundColor: CORES.fundo,
          alignItems: 'start',
        }}
      >
        <dt
          style={{
            fontFamily: FONTES.corpo,
            fontSize: '0.82rem',
            fontWeight: 600,
            color: CORES.primaria,
          }}
        >
          {label}
        </dt>
        <dd
          style={{
            margin: 0,
            fontFamily: FONTES.corpo,
            fontSize: '0.82rem',
            color: CORES.textoPrincipal,
            lineHeight: 1.5,
          }}
        >
          {morfologia[chave]}
        </dd>
      </div>
    ))}
  </dl>
);
