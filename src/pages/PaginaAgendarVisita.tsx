/**
 * Farmácia Viva em Rede - Página Agendar Visitas / Jardins Disponíveis
 * Exibe lista completa de jardins com botão de agendamento em cada cartão.
 */

import React, { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { repositorioJardins } from '../data/repositorios';
import { CartaoJardim } from '../components/jardins/CartaoJardim';
import { ModalAgendarVisita } from '../components/visitas/ModalAgendarVisita';
import { Cracha } from '../components/ui/Cracha';
import { CORES } from '../core/tema/tokens';
import type { JardimMedicinal } from '../core/modelos/entidades';

export const PaginaAgendarVisita: React.FC = () => {
  const [searchParams] = useSearchParams();
  const [jardins, setJardins] = useState<JardimMedicinal[]>([]);
  const [carregando, setCarregando] = useState(true);
  const [modalAberto, setModalAberto] = useState(false);
  const [jardimPreSelecionado, setJardimPreSelecionado] = useState<JardimMedicinal | null>(null);
  const [mensagemSucesso, setMensagemSucesso] = useState('');

  useEffect(() => {
    const carregar = async () => {
      try {
        const lista = await repositorioJardins.listarTodos();
        setJardins(lista);
      } catch (erro) {
        console.error('Erro ao carregar jardins:', erro);
      } finally {
        setCarregando(false);
      }
    };

    carregar();
  }, []);

  useEffect(() => {
    const jardimId = searchParams.get('jardim');
    if (jardimId) {
      const id = Number(jardimId);
      const encontrado = jardins.find((j) => j.id === id);
      if (encontrado) {
        setJardimPreSelecionado(encontrado);
        setModalAberto(true);
      }
    }
  }, [searchParams, jardins]);

  const aoAlternarAlertaColheita = async (jardimId: number, estadoAtual: boolean) => {
    try {
      const atualizado = await repositorioJardins.atualizarAvisoColheita(jardimId, !estadoAtual);
      if (atualizado) {
        setJardins((anteriores) =>
          anteriores.map((j) => (j.id === jardimId ? atualizado : j))
        );
      }
    } catch (erro) {
      console.error('Erro ao alternar alerta:', erro);
    }
  };

  return (
    <section aria-labelledby="titulo-agendar-visitas">
      <div style={{ marginBottom: '1.5rem' }}>
        <Cracha variante="acao">Agenda Comunitária</Cracha>
        <h1
          id="titulo-agendar-visitas"
          style={{
            fontFamily: "'Montserrat', sans-serif",
            fontSize: '1.5rem',
            fontWeight: 700,
            marginTop: '0.5rem',
            marginBottom: 0,
          }}
        >
          Agendar Visitas
        </h1>
        <p style={{ color: CORES.textoSuave, marginTop: '0.5rem' }}>
          Escolha um jardim disponível e solicite uma visita técnica ou mudas diretamente pelo botão abaixo.
        </p>
      </div>

      {mensagemSucesso && (
        <div
          role="status"
          style={{
            padding: '0.75rem',
            borderRadius: '8px',
            backgroundColor: '#E8F1ED',
            color: '#0C5C3E',
            marginBottom: '1rem',
            fontWeight: 600,
          }}
        >
          {mensagemSucesso}
        </div>
      )}

      {carregando ? (
        <p style={{ color: CORES.textoSuave }}>Carregando jardins disponíveis...</p>
      ) : (
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
            gap: '1rem',
          }}
        >
          {jardins.map((jardim) => (
            <CartaoJardim
              key={jardim.id}
              jardim={jardim}
              podeGerenciarAlertas={false}
              aoAlternarAlertaColheita={aoAlternarAlertaColheita}
            />
          ))}
        </div>
      )}

      <ModalAgendarVisita
        aberto={modalAberto}
        aoFechar={() => {
          setModalAberto(false);
          setJardimPreSelecionado(null);
        }}
        aoAgendarSucesso={() => {
          setMensagemSucesso('Visita agendada com sucesso!');
          setTimeout(() => setMensagemSucesso(''), 4000);
        }}
        jardimPreSelecionado={jardimPreSelecionado}
        jardinsDisponiveis={jardins}
      />
    </section>
  );
};
