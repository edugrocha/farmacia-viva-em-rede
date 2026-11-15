/**
 * Farmácia Viva em Rede - Página Principal (Início)
 * Apresenta missão, dashboard, mapa interativo e formulário de contato.
 */

import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  JardimMedicinal,
  VisitaAgendada,
} from '../core/modelos/entidades';
import {
  repositorioJardins,
  repositorioVisitas,
} from '../data/repositorios';
import { SecaoHero } from '../components/layout/SecaoHero';
import { MapaLeaflet } from '../components/mapa/MapaLeaflet';
import { Cartao } from '../components/ui/Cartao';
import { Cracha } from '../components/ui/Cracha';
import { FormularioContatoExtensionista } from '../components/contato/FormularioContatoExtensionista';


export const PaginaInicio: React.FC = () => {
  const navegar = useNavigate();

  const [jardins, setJardins] = useState<JardimMedicinal[]>([]);
  const [visitas, setVisitas] = useState<VisitaAgendada[]>([]);
  const [carregando, setCarregando] = useState(true);

  useEffect(() => {
    const carregarDados = async () => {
      try {
        const [listaJardins, listaVisitas] = await Promise.all([
          repositorioJardins.listarTodos(),
          repositorioVisitas.listarTodas(),
        ]);
        setJardins(listaJardins);
        setVisitas(listaVisitas);
      } catch (erro) {
        console.error('Falha ao obter dados dos repositórios:', erro);
      } finally {
        setCarregando(false);
      }
    };

    carregarDados();
  }, []);

  const especiesUnicas = new Set(jardins.flatMap((j) => j.plantas_disponiveis)).size;

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '2.5rem' }}>
      <SecaoHero
        totalJardins={jardins.length}
        totalVisitas={visitas.length}
        totalComunidades={4}
        aoClicarAcao={() => navegar('/jardins')}
        aoClicarSecundario={() => navegar('/forum')}
      />

      <section aria-labelledby="titulo-missao">
        <Cartao destacado>
          <div style={{ textAlign: 'center', padding: '1rem' }}>
            <Cracha variante="primaria">Nossa Missão</Cracha>
            <h2
              id="titulo-missao"
              style={{
                fontFamily: "'Montserrat', sans-serif",
                fontSize: '1.5rem',
                fontWeight: 700,
                color: '#0C5C3E',
                marginTop: '0.75rem',
                marginBottom: '0.75rem',
              }}
            >
              Conectando comunidades a jardins medicinais
            </h2>
            <p
              style={{
                fontSize: '1rem',
                lineHeight: 1.7,
                color: '#2E4045',
                maxWidth: '720px',
                margin: '0 auto',
              }}
            >
              O Farmácia Viva em Rede é uma plataforma comunitária que facilita o mapeamento
              de hortos medicinais urbanos, o agendamento de visitas técnicas, a troca de
              saberes tradicionais e a orientação respaldada por fontes oficiais de saúde.
              Junte-se a nós para promover saúde natural e fortalecer redes colaborativas
              na atenção básica.
            </p>
          </div>
        </Cartao>
      </section>

      <section aria-label="Indicadores quantitativos da rede">
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))',
            gap: '1rem',
          }}
        >
          <Cartao>
            <div style={{ textAlign: 'center', padding: '0.5rem' }}>
              <div style={{ fontSize: '2.25rem', fontWeight: 700, color: '#0C5C3E' }}>
                {jardins.length}
              </div>
              <div style={{ fontSize: '0.85rem', color: '#6B7B80', marginTop: '0.25rem' }}>
                Jardins Cadastrados
              </div>
            </div>
          </Cartao>

          <Cartao>
            <div style={{ textAlign: 'center', padding: '0.5rem' }}>
              <div style={{ fontSize: '2.25rem', fontWeight: 700, color: '#FAA825' }}>
                {jardins.filter((j) => j.aviso_colheita_ativo).length}
              </div>
              <div style={{ fontSize: '0.85rem', color: '#6B7B80', marginTop: '0.25rem' }}>
                Colheitas Ativas
              </div>
            </div>
          </Cartao>

          <Cartao>
            <div style={{ textAlign: 'center', padding: '0.5rem' }}>
              <div style={{ fontSize: '2.25rem', fontWeight: 700, color: '#A489C5' }}>
                {visitas.length}
              </div>
              <div style={{ fontSize: '0.85rem', color: '#6B7B80', marginTop: '0.25rem' }}>
                Visitas Registradas
              </div>
            </div>
          </Cartao>

          <Cartao>
            <div style={{ textAlign: 'center', padding: '0.5rem' }}>
              <div style={{ fontSize: '2.25rem', fontWeight: 700, color: '#0C5C3E' }}>
                {especiesUnicas}
              </div>
              <div style={{ fontSize: '0.85rem', color: '#6B7B80', marginTop: '0.25rem' }}>
                Espécies Disponíveis
              </div>
            </div>
          </Cartao>
        </div>
      </section>

      <section aria-labelledby="titulo-mapa-inicio">
        <Cracha variante="primaria">Mapeamento Geoespacial</Cracha>
        <h2
          id="titulo-mapa-inicio"
          style={{
            fontFamily: "'Montserrat', sans-serif",
            fontSize: '1.35rem',
            fontWeight: 700,
            marginTop: '0.5rem',
            marginBottom: '1rem',
          }}
        >
          Jardins Medicinais Próximos de Você
        </h2>
        {carregando ? (
          <p style={{ color: '#6B7B80' }}>Carregando mapa de jardins...</p>
        ) : (
          <MapaLeaflet
            jardins={jardins}
            aoSolicitarVisita={(jardimId) => navegar(`/agendar-visita?jardim=${jardimId}`)}
            altura="420px"
          />
        )}
      </section>

      <section aria-labelledby="titulo-contato">
        <Cracha variante="secundaria">Contato</Cracha>
        <h2
          id="titulo-contato"
          style={{
            fontFamily: "'Montserrat', sans-serif",
            fontSize: '1.35rem',
            fontWeight: 700,
            marginTop: '0.5rem',
            marginBottom: '1rem',
          }}
        >
          Entre em Contato com a Equipe de Extensão
        </h2>
        <FormularioContatoExtensionista />
      </section>
    </div>
  );
};
