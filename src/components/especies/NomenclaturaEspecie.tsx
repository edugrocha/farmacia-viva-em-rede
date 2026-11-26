/**
 * Farmácia Viva em Rede — NomenclaturaEspecie
 * Exibe nomenclatura botânica formal: nome popular, científico, sinonímias e família.
 */

import React from 'react';
import type { EspeciePlanta } from '../../core/modelos/entidades';
import { CORES, FONTES } from '../../core/tema/tokens';
import { Cracha } from '../ui/Cracha';

interface Props {
  especie: Pick<
    EspeciePlanta,
    'nome_popular' | 'nome_cientifico' | 'sinonimias' | 'familia_botanica'
  >;
}

export const NomenclaturaEspecie: React.FC<Props> = ({ especie }) => (
  <div style={{ display: 'flex', flexDirection: 'column', gap: '0.4rem' }}>
    <Cracha variante="primaria">{especie.familia_botanica}</Cracha>
    <h2
      style={{
        fontFamily: FONTES.titulos,
        fontSize: 'clamp(1.1rem, 4vw, 1.5rem)',
        fontWeight: 700,
        color: CORES.textoPrincipal,
        margin: 0,
      }}
    >
      {especie.nome_popular}
    </h2>
    <p
      style={{
        fontFamily: FONTES.corpo,
        fontStyle: 'italic',
        fontSize: '0.95rem',
        color: CORES.textoSuave,
        margin: 0,
      }}
    >
      {especie.nome_cientifico}
    </p>
    {especie.sinonimias && especie.sinonimias.length > 0 && (
      <p style={{ fontSize: '0.78rem', color: CORES.textoSuave, margin: 0, fontFamily: FONTES.corpo }}>
        <strong>Sin.:</strong>{' '}
        <em>{especie.sinonimias.join('; ')}</em>
      </p>
    )}
  </div>
);
