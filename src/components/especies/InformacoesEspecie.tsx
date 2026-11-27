/**
 * Farmácia Viva em Rede — InformacoesEspecie (container)
 * Composição mobile-first de todos os sub-painéis de uma espécie vegetal.
 * Layout: coluna única em mobile, grid 2 colunas em ≥ 768px.
 */

import React, { useState } from 'react';
import type { EspeciePlanta } from '../../core/modelos/entidades';
import { CORES, FONTES, RAIO_BORDA, SOMBRAS } from '../../core/tema/tokens';
import { Cartao } from '../ui/Cartao';
import { CarrosselFotosEspecie } from './CarrosselFotosEspecie';
import { NomenclaturaEspecie } from './NomenclaturaEspecie';
import { MorfologiaEspecie } from './MorfologiaEspecie';
import { AgronomiaEspecie } from './AgronomiaEspecie';

type Aba = 'morfologia' | 'agronomia';

interface Props {
  especie: EspeciePlanta;
}

export const InformacoesEspecie: React.FC<Props> = ({ especie }) => {
  const [aba, setAba] = useState<Aba>('morfologia');

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
      {/* Cabeçalho: nomenclatura */}
      <Cartao>
        <NomenclaturaEspecie especie={especie} />
      </Cartao>

      {/* Fotos da espécie (carrossel mobile / grid desktop) */}
      {especie.fotos.length > 0 && (
        <Cartao>
          <SectionTitle>Fotos da Espécie</SectionTitle>
          <CarrosselFotosEspecie fotos={especie.fotos} nomePopular={especie.nome_popular} />
        </Cartao>
      )}

      {/* Tabs: Morfologia | Agronomia */}
      <Cartao style={{ padding: 0, overflow: 'hidden' }}>
        {/* Tab bar */}
        <div
          role="tablist"
          aria-label="Informações da espécie"
          style={{
            display: 'grid',
            gridTemplateColumns: '1fr 1fr',
            borderBottom: `1px solid ${CORES.bordaSuave}`,
          }}
        >
          <TabBtn
            id="tab-morfologia"
            panelId="panel-morfologia"
            ativo={aba === 'morfologia'}
            onClick={() => setAba('morfologia')}
          >
            Morfologia
          </TabBtn>
          <TabBtn
            id="tab-agronomia"
            panelId="panel-agronomia"
            ativo={aba === 'agronomia'}
            onClick={() => setAba('agronomia')}
          >
            Agronomia
          </TabBtn>
        </div>

        {/* Painéis */}
        <div style={{ padding: '1rem' }}>
          <div
            id="panel-morfologia"
            role="tabpanel"
            aria-labelledby="tab-morfologia"
            hidden={aba !== 'morfologia'}
          >
            <SectionTitle>Características Morfológicas</SectionTitle>
            <MorfologiaEspecie morfologia={especie.morfologia} />
          </div>

          <div
            id="panel-agronomia"
            role="tabpanel"
            aria-labelledby="tab-agronomia"
            hidden={aba !== 'agronomia'}
          >
            <AgronomiaEspecie especie={especie} />
          </div>
        </div>
      </Cartao>
    </div>
  );
};

// ── Helpers ───────────────────────────────────────────────────────────────────
const SectionTitle: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <h3
    style={{
      fontFamily: FONTES.titulos,
      fontSize: '0.85rem',
      fontWeight: 700,
      color: CORES.primaria,
      margin: '0 0 0.75rem',
      textTransform: 'uppercase',
      letterSpacing: '0.04em',
    }}
  >
    {children}
  </h3>
);

interface TabBtnProps {
  id: string;
  panelId: string;
  ativo: boolean;
  onClick: () => void;
  children: React.ReactNode;
}

const TabBtn: React.FC<TabBtnProps> = ({ id, panelId, ativo, onClick, children }) => (
  <button
    id={id}
    role="tab"
    aria-selected={ativo}
    aria-controls={panelId}
    onClick={onClick}
    style={{
      all: 'unset',
      boxSizing: 'border-box',
      padding: '0.75rem 0.5rem',
      textAlign: 'center',
      fontFamily: FONTES.corpo,
      fontSize: '0.85rem',
      fontWeight: ativo ? 700 : 500,
      color: ativo ? CORES.primaria : CORES.textoSuave,
      borderBottom: ativo ? `3px solid ${CORES.primaria}` : '3px solid transparent',
      cursor: 'pointer',
      transition: 'all 0.15s ease',
      backgroundColor: ativo ? CORES.primariaSuave : 'transparent',
    }}
  >
    {children}
  </button>
);
