/**
 * Farmácia Viva em Rede — AgronomiaEspecie
 * Dados agronômicos: ciclo, propagação, requisitos climáticos/edáficos,
 * épocas de plantio/colheita e potencial produtivo.
 */

import React from 'react';
import type { EspeciePlanta, MetodoPropagacao, ParteUtilizada } from '../../core/modelos/entidades';
import { CORES, FONTES, RAIO_BORDA } from '../../core/tema/tokens';
import { Cracha } from '../ui/Cracha';

// ── Labels de enumerações ─────────────────────────────────────────────────────
const LABEL_PROPAGACAO: Record<MetodoPropagacao, string> = {
  sementes: 'Sementes',
  estaquia: 'Estaquia',
  divisao_touceira: 'Divisão de touceira',
  rizomas: 'Rizomas',
  estoloes: 'Estolões',
  enxertia: 'Enxertia',
  mergulhia: 'Mergulhia',
  microestaquia: 'Micro-estaquia',
};

const LABEL_PARTE: Record<ParteUtilizada, string> = {
  folhas: 'Folhas',
  flores: 'Flores',
  frutos: 'Frutos',
  raizes: 'Raízes',
  cascas: 'Cascas',
  sementes: 'Sementes',
  rizomas: 'Rizomas',
  resina: 'Resina',
  latex: 'Látex',
  óleo_essencial: 'Óleo essencial',
};

const LABEL_CICLO: Record<EspeciePlanta['ciclo_desenvolvimento'], string> = {
  anual: 'Anual',
  bianual: 'Bianual',
  perene: 'Perene',
};

const LABEL_SOLAR: Record<EspeciePlanta['requisitos_climaticos']['exposicao_solar'], string> = {
  pleno_sol: 'Pleno sol',
  meia_sombra: 'Meia-sombra',
  sombra: 'Sombra',
};

const LABEL_DRENAGEM: Record<EspeciePlanta['requisitos_edaficos']['drenagem'], string> = {
  boa: 'Boa',
  moderada: 'Moderada',
  mal_drenado: 'Mal drenado',
};

interface Props {
  especie: Pick<
    EspeciePlanta,
    | 'partes_utilizadas'
    | 'ciclo_desenvolvimento'
    | 'metodos_propagacao'
    | 'requisitos_climaticos'
    | 'requisitos_edaficos'
    | 'epoca_plantio'
    | 'epoca_colheita'
    | 'potencial_produtivo'
    | 'origem'
    | 'distribuicao_geografica'
  >;
}

export const AgronomiaEspecie: React.FC<Props> = ({ especie }) => (
  <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>

    {/* Origem & Distribuição */}
    <Secao titulo="Origem & Distribuição">
      <InfoRow label="Origem" valor={especie.origem} />
      <InfoRow label="Distribuição" valor={especie.distribuicao_geografica} />
    </Secao>

    {/* Partes utilizadas */}
    <Secao titulo="Partes Utilizadas">
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.35rem', paddingTop: '0.25rem' }}>
        {especie.partes_utilizadas.map((p: ParteUtilizada) => (
          <Cracha key={p} variante="secundaria">{LABEL_PARTE[p]}</Cracha>
        ))}
      </div>
    </Secao>

    {/* Ciclo & Propagação */}
    <Secao titulo="Ciclo & Propagação">
      <InfoRow label="Ciclo" valor={LABEL_CICLO[especie.ciclo_desenvolvimento]} />
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.35rem', marginTop: '0.4rem' }}>
        {especie.metodos_propagacao.map((m: MetodoPropagacao) => (
          <Cracha key={m} variante="primaria">{LABEL_PROPAGACAO[m]}</Cracha>
        ))}
      </div>
    </Secao>

    {/* Requisitos climáticos */}
    <Secao titulo="Requisitos Climáticos">
      <InfoRow
        label="Temperatura"
        valor={`${especie.requisitos_climaticos.temperatura_min_c}–${especie.requisitos_climaticos.temperatura_max_c} °C`}
      />
      <InfoRow label="Chuvas" valor={especie.requisitos_climaticos.precipitacao_descricao} />
      <InfoRow label="Insolação" valor={LABEL_SOLAR[especie.requisitos_climaticos.exposicao_solar]} />
      {especie.requisitos_climaticos.tolerancia_seca !== undefined && (
        <InfoRow
          label="Tolerância à seca"
          valor={especie.requisitos_climaticos.tolerancia_seca ? 'Sim' : 'Não'}
        />
      )}
    </Secao>

    {/* Requisitos edáficos */}
    <Secao titulo="Requisitos Edáficos (Solo)">
      <InfoRow label="Tipo de solo" valor={especie.requisitos_edaficos.tipo_solo} />
      <InfoRow
        label="pH"
        valor={`${especie.requisitos_edaficos.ph_min}–${especie.requisitos_edaficos.ph_max}`}
      />
      <InfoRow label="Drenagem" valor={LABEL_DRENAGEM[especie.requisitos_edaficos.drenagem]} />
      <InfoRow label="Fertilidade" valor={especie.requisitos_edaficos.fertilidade} />
    </Secao>

    {/* Épocas & produtivo */}
    <Secao titulo="Plantio, Colheita & Produção">
      <InfoRow label="Época de plantio" valor={especie.epoca_plantio} />
      <InfoRow label="Época de colheita" valor={especie.epoca_colheita} />
      <InfoRow label="Potencial produtivo" valor={especie.potencial_produtivo} />
    </Secao>
  </div>
);

// ── Sub-componentes auxiliares ────────────────────────────────────────────────
const Secao: React.FC<{ titulo: string; children: React.ReactNode }> = ({ titulo, children }) => (
  <div>
    <h4
      style={{
        fontFamily: FONTES.titulos,
        fontSize: '0.85rem',
        fontWeight: 700,
        color: CORES.primaria,
        margin: '0 0 0.5rem',
        textTransform: 'uppercase',
        letterSpacing: '0.04em',
      }}
    >
      {titulo}
    </h4>
    {children}
  </div>
);

const InfoRow: React.FC<{ label: string; valor: string }> = ({ label, valor }) => (
  <div
    style={{
      display: 'flex',
      gap: '0.5rem',
      fontSize: '0.83rem',
      fontFamily: FONTES.corpo,
      color: CORES.textoPrincipal,
      lineHeight: 1.5,
      paddingBottom: '0.2rem',
    }}
  >
    <span style={{ fontWeight: 600, minWidth: '7.5rem', flexShrink: 0 }}>{label}:</span>
    <span style={{ color: CORES.textoPrincipal }}>{valor}</span>
  </div>
);
