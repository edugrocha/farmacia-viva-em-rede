/**
 * Farmácia Viva em Rede - Página de detalhes de um jardim específico
 */

import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { repositorioJardins } from '../data/repositorios';
import { MapaLeaflet } from '../components/mapa/MapaLeaflet';
import { Cartao } from '../components/ui/Cartao';
import { Cracha } from '../components/ui/Cracha';
import { Botao } from '../components/ui/Botao';
import { ModalAgendarVisita } from '../components/visitas/ModalAgendarVisita';
import { CORES } from '../core/tema/tokens';
import type { JardimMedicinal } from '../core/modelos/entidades';

export const PaginaJardimDetalhes: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navegar = useNavigate();

  const [jardim, setJardim] = useState<JardimMedicinal | null>(null);
  const [carregando, setCarregando] = useState(true);
  const [modalVisitaAberto, setModalVisitaAberto] = useState(false);
  const [mensagemSucesso, setMensagemSucesso] = useState('');

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
    return <p>Carregando detalhes do jardim...</p>;
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

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
      {mensagemSucesso && (
        <div
          role="status"
          style={{
            padding: '0.75rem',
            borderRadius: '8px',
            backgroundColor: '#E8F1ED',
            color: '#0C5C3E',
            fontWeight: 600,
          }}
        >
          {mensagemSucesso}
        </div>
      )}

      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'flex-start',
          flexWrap: 'wrap',
          gap: '1rem',
        }}
      >
        <div>
          <Cracha variante="primaria">Detalhes do Jardim</Cracha>
          <h1
            style={{
              fontFamily: "'Montserrat', sans-serif",
              fontSize: '1.5rem',
              fontWeight: 700,
              marginTop: '0.5rem',
              marginBottom: 0,
            }}
          >
            {jardim.nome}
          </h1>
        </div>
        <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
          <Botao variante="contorno" onClick={() => navegar('/jardins')}>
            Voltar
          </Botao>
          <Botao variante="acao" onClick={() => setModalVisitaAberto(true)}>
            Agendar Visita
          </Botao>
        </div>
      </div>

      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
          gap: '1.5rem',
        }}
      >
        <Cartao>
          <h3
            style={{
              marginTop: 0,
              fontFamily: "'Montserrat', sans-serif",
              color: CORES.primaria,
            }}
          >
            Informações do Jardim
          </h3>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.6rem', fontSize: '0.9rem' }}>
            <div>
              <strong>Responsável:</strong> {jardim.nome_responsavel}
            </div>
            <div>
              <strong>Contato:</strong> {jardim.contato_responsavel}
            </div>
            <div>
              <strong>Endereço:</strong> {jardim.endereco}
            </div>
            <div>
              <strong>Tipo:</strong>{' '}
              {jardim.tipo_jardim === 'publico' ? 'Público' : 'Particular'}
            </div>
            <div>
              <strong>Latitude:</strong> {jardim.latitude}
            </div>
            <div>
              <strong>Longitude:</strong> {jardim.longitude}
            </div>
            {jardim.aviso_colheita_ativo && (
              <Cracha variante="acao">Colheita Ativa</Cracha>
            )}
          </div>

          <h4
            style={{
              marginTop: '1rem',
              marginBottom: '0.5rem',
              fontFamily: "'Montserrat', sans-serif",
            }}
          >
            Plantas Disponíveis
          </h4>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.35rem' }}>
            {jardim.plantas_disponiveis.map((planta, indice) => (
              <Cracha key={`${jardim.id}-planta-${indice}`} variante="neutra">
                {planta}
              </Cracha>
            ))}
          </div>
        </Cartao>

        <MapaLeaflet
          jardins={[jardim]}
          coordenadasUsuario={null}
          altura="380px"
          aoSolicitarVisita={() => setModalVisitaAberto(true)}
        />
      </div>

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
