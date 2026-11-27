/**
 * Farmácia Viva em Rede - Página Principal (Início)
 * Apresenta indicadores, mapa interativo e formulário de contato.
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
import { Botao } from '../components/ui/Botao';
import { FormularioContatoExtensionista } from '../components/contato/FormularioContatoExtensionista';
import { CORES } from '../core/tema/tokens';


export const PaginaInicio: React.FC = () => {
  const navegar = useNavigate();

  const [jardins, setJardins] = useState<JardimMedicinal[]>([]);
  const [visitas, setVisitas] = useState<VisitaAgendada[]>([]);
  const [carregando, setCarregando] = useState(true);
  const [erro, setErro] = useState(false);

  const carregarDados = async () => {
    setCarregando(true);
    setErro(false);
    try {
      const [listaJardins, listaVisitas] = await Promise.all([
        repositorioJardins.listarTodos(),
        repositorioVisitas.listarTodas(),
      ]);
      setJardins(listaJardins);
      setVisitas(listaVisitas);
    } catch (falha) {
      console.error('Falha ao obter dados dos repositórios:', falha);
      setErro(true);
    } finally {
      setCarregando(false);
    }
  };

  useEffect(() => {
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

      <section aria-label="Indicadores quantitativos da rede">
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 220px))',
            gap: '1rem',
          }}
        >
          <Cartao>
            <div style={{ textAlign: 'center', padding: '0.5rem' }}>
              <div style={{ fontSize: '2.25rem', fontWeight: 700, color: CORES.acao }}>
                {jardins.filter((j) => j.aviso_colheita_ativo).length}
              </div>
              <div style={{ fontSize: '0.85rem', color: CORES.textoSuave, marginTop: '0.25rem' }}>
                Colheitas Ativas
              </div>
            </div>
          </Cartao>

          <Cartao>
            <div style={{ textAlign: 'center', padding: '0.5rem' }}>
              <div style={{ fontSize: '2.25rem', fontWeight: 700, color: CORES.primaria }}>
                {especiesUnicas}
              </div>
              <div style={{ fontSize: '0.85rem', color: CORES.textoSuave, marginTop: '0.25rem' }}>
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
            fontSize: '1.5rem',
            fontWeight: 700,
            marginTop: '0.5rem',
            marginBottom: '1rem',
          }}
        >
          Jardins Medicinais Próximos de Você
        </h2>
        {carregando ? (
          <p style={{ color: CORES.textoSuave }}>Carregando mapa de jardins...</p>
        ) : erro ? (
          <div
            role="alert"
            style={{
              padding: '1rem',
              borderRadius: '8px',
              backgroundColor: CORES.erroSuave,
              color: CORES.erro,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'flex-start',
              gap: '0.75rem',
            }}
          >
            <span>Não foi possível carregar os jardins. Verifique sua conexão e tente novamente.</span>
            <Botao variante="contorno" tamanho="pequeno" onClick={carregarDados}>
              Tentar novamente
            </Botao>
          </div>
        ) : jardins.length === 0 ? (
          <p style={{ color: CORES.textoSuave }}>
            Nenhum jardim cadastrado ainda. Cadastre o primeiro em "Jardins e Mapeamento".
          </p>
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
            fontSize: '1.5rem',
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
