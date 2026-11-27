/**
 * Farmácia Viva em Rede — Página de Detalhes do Jardim
 *
 * Layout mobile-first (coluna única) com seção expandível por espécie.
 * Cada planta disponível no jardim pode ter seus dados botânicos detalhados
 * exibidos via InformacoesEspecie quando um slug correspondente existe no mock.
 */

import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { repositorioJardins } from '../data/repositorios';
import { buscarEspeciePorSlug } from '../data/mocks/especiesMock';
import { MapaLeaflet } from '../components/mapa/MapaLeaflet';
import { Cartao } from '../components/ui/Cartao';
import { Cracha } from '../components/ui/Cracha';
import { Botao } from '../components/ui/Botao';
import { BrotoBotanico } from '../components/ui/BrotoBotanico';
import { InformacoesEspecie } from '../components/especies';
import { ModalAgendarVisita } from '../components/visitas/ModalAgendarVisita';
import { CORES, FONTES, RAIO_BORDA } from '../core/tema/tokens';
import type { JardimMedicinal } from '../core/modelos/entidades';
import type { EspeciePlanta } from '../core/modelos/entidades';

// ─────────────────────────────────────────────────────────────────────────────
// Componente
// ─────────────────────────────────────────────────────────────────────────────

export const PaginaJardimDetalhes: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navegar = useNavigate();

  const [jardim, setJardim] = useState<JardimMedicinal | null>(null);
  const [carregando, setCarregando] = useState(true);
  const [modalVisitaAberto, setModalVisitaAberto] = useState(false);
  const [mensagemSucesso, setMensagemSucesso] = useState('');
  const [especieSelecionada, setEspecieSelecionada] = useState<EspeciePlanta | null>(null);

  useEffect(() => {
    const carregar = async () => {
      if (!id) return;
      try {
        const encontrado = await repositorioJardins.buscarPorId(Number(id));
        setJardim(encontrado);
      } catch (erro) {
        console.error('Erro ao carregar jardim:', erro);
      } finally {
        setCarregando(false);
      }
    };
    carregar();
  }, [id]);

  if (carregando) {
    return (
      <div style={{ padding: '2rem', textAlign: 'center', color: CORES.textoSuave }}>
        Carregando detalhes do jardim…
      </div>
    );
  }

  if (!jardim) {
    return (
      <Cartao>
        <p>Jardim não encontrado.</p>
        <Botao variante="contorno" onClick={() => navegar('/jardins')}>
          Voltar para Jardins
        </Botao>
      </Cartao>
    );
  }

  // Resolve espécies com dados botânicos disponíveis
  const slugsCatalogados: string[] = jardim.especies_slugs ?? [];

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
      {/* ── Banner de sucesso ─────────────────────────────────────────────── */}
      {mensagemSucesso && (
        <div
          role="status"
          aria-live="polite"
          style={{
            padding: '0.75rem',
            borderRadius: RAIO_BORDA,
            backgroundColor: CORES.primariaSuave,
            color: CORES.primaria,
            fontWeight: 600,
            fontFamily: FONTES.corpo,
            display: 'flex',
            alignItems: 'center',
            gap: '0.5rem',
          }}
        >
          <BrotoBotanico />
          <span>{mensagemSucesso}</span>
        </div>
      )}

      {/* ── Cabeçalho ────────────────────────────────────────────────────── */}
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'flex-start',
          flexWrap: 'wrap',
          gap: '0.75rem',
        }}
      >
        <div>
          <Cracha variante="primaria">Detalhes do Jardim</Cracha>
          <h1
            style={{
              fontFamily: FONTES.titulos,
              fontSize: 'clamp(1.1rem, 5vw, 1.5rem)',
              fontWeight: 700,
              color: CORES.textoPrincipal,
              marginTop: '0.4rem',
              marginBottom: 0,
            }}
          >
            {jardim.nome}
          </h1>
        </div>
        <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
          <Botao variante="contorno" onClick={() => navegar('/jardins')}>
            ← Voltar
          </Botao>
          <Botao variante="acao" onClick={() => setModalVisitaAberto(true)}>
            Agendar Visita
          </Botao>
        </div>
      </div>

      {/* ── Grid: info + mapa ─────────────────────────────────────────────── */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 320px), 1fr))',
          gap: '1.25rem',
        }}
      >
        {/* Informações do Jardim */}
        <Cartao>
          <SectionHeader>Informações do Jardim</SectionHeader>
          <InfoList>
            <InfoItem label="Responsável" valor={jardim.nome_responsavel} />
            <InfoItem label="Contato" valor={jardim.contato_responsavel} />
            <InfoItem label="Endereço" valor={jardim.endereco} />
            <InfoItem
              label="Tipo"
              valor={jardim.tipo_jardim === 'publico' ? 'Público' : 'Particular'}
            />
          </InfoList>
          {jardim.aviso_colheita_ativo && (
            <div style={{ marginTop: '0.75rem' }}>
              <Cracha variante="acao">Colheita Ativa</Cracha>
            </div>
          )}
        </Cartao>

        {/* Mapa */}
        <MapaLeaflet
          jardins={[jardim]}
          coordenadasUsuario={null}
          altura="320px"
          aoSolicitarVisita={() => setModalVisitaAberto(true)}
        />
      </div>

      {/* ── Espécies disponíveis ──────────────────────────────────────────── */}
      <Cartao>
        <SectionHeader>Espécies Disponíveis</SectionHeader>
        <p style={{ fontSize: '0.82rem', color: CORES.textoSuave, margin: '0 0 0.75rem', fontFamily: FONTES.corpo }}>
          Selecione uma espécie para ver informações botânicas detalhadas.
        </p>

        {/* Grade de chips clicáveis */}
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.4rem', marginBottom: '1rem' }}>
          {jardim.plantas_disponiveis.map((planta, idx) => {
            const slug = slugsCatalogados[idx];
            const especie = buscarEspeciePorSlug(slug);
            const ativa = especieSelecionada?.slug === slug;

            return (
              <button
                key={`${jardim.id}-planta-${idx}`}
                onClick={() => {
                  if (!especie) return;
                  setEspecieSelecionada(ativa ? null : especie);
                }}
                style={{
                  all: 'unset',
                  boxSizing: 'border-box',
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '0.3rem',
                  padding: '0.4rem 0.9rem',
                  borderRadius: RAIO_BORDA,
                  fontFamily: FONTES.corpo,
                  fontSize: '0.82rem',
                  fontWeight: 600,
                  letterSpacing: '0.02em',
                  cursor: especie ? 'pointer' : 'default',
                  border: `2px solid ${ativa ? CORES.primaria : CORES.bordaForte}`,
                  backgroundColor: ativa ? CORES.primariaSuave : CORES.superficie,
                  color: ativa ? CORES.primaria : CORES.textoPrincipal,
                  transition: 'all 0.15s ease',
                }}
                aria-pressed={ativa}
                aria-label={`${planta}${especie ? ' — ver informações botânicas' : ' — sem dados botânicos disponíveis'}`}
                title={especie ? 'Ver informações botânicas' : 'Dados botânicos não disponíveis ainda'}
              >
                {planta}
                {especie ? (
                  <span style={{ fontSize: '0.7rem', opacity: 0.7 }}>{ativa ? '▲' : '▼'}</span>
                ) : (
                  <span style={{ fontSize: '0.7rem', color: CORES.textoSuave }}>(em breve)</span>
                )}
              </button>
            );
          })}
        </div>

        {/* Painel de informações da espécie selecionada */}
        {especieSelecionada && (
          <div
            style={{
              borderTop: `1px solid ${CORES.bordaSuave}`,
              paddingTop: '1rem',
              animation: 'fadeIn 0.2s ease',
            }}
          >
            <InformacoesEspecie especie={especieSelecionada} />
          </div>
        )}
      </Cartao>

      {/* Modal de agendamento */}
      <ModalAgendarVisita
        aberto={modalVisitaAberto}
        aoFechar={() => setModalVisitaAberto(false)}
        aoAgendarSucesso={() => {
          setMensagemSucesso('Visita agendada com sucesso!');
          setTimeout(() => setMensagemSucesso(''), 4000);
        }}
        jardimPreSelecionado={jardim}
        jardinsDisponiveis={[jardim]}
      />
    </div>
  );
};

// ─────────────────────────────────────────────────────────────────────────────
// Micro-componentes locais
// ─────────────────────────────────────────────────────────────────────────────

const SectionHeader: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <h3
    style={{
      fontFamily: FONTES.titulos,
      fontSize: '1rem',
      fontWeight: 700,
      color: CORES.primaria,
      margin: '0 0 0.75rem',
    }}
  >
    {children}
  </h3>
);

const InfoList: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <dl style={{ margin: 0, display: 'flex', flexDirection: 'column', gap: '0.4rem' }}>{children}</dl>
);

const InfoItem: React.FC<{ label: string; valor: string }> = ({ label, valor }) => (
  <div style={{ display: 'flex', gap: '0.4rem', fontSize: '0.88rem', fontFamily: FONTES.corpo }}>
    <dt style={{ fontWeight: 600, color: CORES.textoPrincipal, minWidth: '7rem', flexShrink: 0 }}>
      {label}:
    </dt>
    <dd style={{ margin: 0, color: CORES.textoSuave }}>{valor}</dd>
  </div>
);
