/**
 * Farmácia Viva em Rede - Modal de agendamento de visita
 * Registra a solicitação diretamente no estado mockado do sistema.
 */

import React, { useEffect, useState } from 'react';
import { Cartao } from '../ui/Cartao';
import { Botao } from '../ui/Botao';
import { CampoEntrada } from '../ui/CampoEntrada';
import { Cracha } from '../ui/Cracha';
import { CORES, RAIO_BORDA, SOMBRAS } from '../../core/tema/tokens';
import { repositorioVisitas } from '../../data/repositorios';
import { usarAutenticacao } from '../../core/autenticacao/ContextoAutenticacao';
import type { JardimMedicinal, VisitaAgendada } from '../../core/modelos/entidades';
import { useDialogA11y } from '../../core/tema/useDialogA11y';

export interface ModalAgendarVisitaProps {
  aberto: boolean;
  aoFechar: () => void;
  aoAgendarSucesso: (visita: VisitaAgendada) => void;
  jardimPreSelecionado?: JardimMedicinal | null;
  jardinsDisponiveis?: JardimMedicinal[];
}

export const ModalAgendarVisita: React.FC<ModalAgendarVisitaProps> = ({
  aberto,
  aoFechar,
  aoAgendarSucesso,
  jardimPreSelecionado,
  jardinsDisponiveis = [],
}) => {
  const { usuarioAtivo } = usarAutenticacao();
  const [jardimId, setJardimId] = useState<number | ''>('');
  const [dataHorario, setDataHorario] = useState('');
  const [observacao, setObservacao] = useState('');
  const [erro, setErro] = useState('');
  const [carregando, setCarregando] = useState(false);

  useEffect(() => {
    if (jardimPreSelecionado) {
      setJardimId(jardimPreSelecionado.id);
    } else if (jardinsDisponiveis.length > 0) {
      setJardimId(jardinsDisponiveis[0].id);
    }
  }, [jardimPreSelecionado, jardinsDisponiveis, aberto]);

  const dialogRef = useDialogA11y<HTMLDivElement>(aoFechar, aberto);

  if (!aberto) return null;

  const jardimSelecionado =
    jardinsDisponiveis.find((j) => j.id === jardimId) ?? jardimPreSelecionado ?? null;

  const aoSubmeter = async (evento: React.FormEvent) => {
    evento.preventDefault();
    setErro('');

    if (!jardimId || !dataHorario) {
      setErro('Selecione o jardim e a data da visita.');
      return;
    }

    if (!usuarioAtivo) {
      setErro('Você precisa estar autenticado para agendar.');
      return;
    }

    setCarregando(true);
    try {
      const novaVisita = await repositorioVisitas.criar({
        jardim_id: Number(jardimId),
        usuario_id: usuarioAtivo.id,
        data_horario: new Date(dataHorario).toISOString(),
        status: 'pendente',
      });

      aoAgendarSucesso(novaVisita);
      setDataHorario('');
      setObservacao('');
      aoFechar();
    } catch (erroInterno) {
      setErro(
        erroInterno instanceof Error
          ? erroInterno.message
          : 'Não foi possível agendar a visita.'
      );
    } finally {
      setCarregando(false);
    }
  };

  return (
    <div
      ref={dialogRef}
      role="dialog"
      aria-modal="true"
      aria-labelledby="titulo-modal-agendar-visita"
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 9999,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'rgba(46, 64, 69, 0.6)',
        padding: '1rem',
      }}
    >
      <Cartao
        style={{
          width: '100%',
          maxWidth: '520px',
          boxShadow: SOMBRAS.elevada,
          display: 'flex',
          flexDirection: 'column',
          gap: '0.85rem',
        }}
      >
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div>
            <Cracha variante="secundaria">Agendamento Rápido</Cracha>
            <h2
              id="titulo-modal-agendar-visita"
              style={{
                margin: '0.5rem 0 0',
                fontFamily: "'Montserrat', sans-serif",
                fontSize: '1.15rem',
                color: CORES.primaria,
              }}
            >
              Solicitar Visita ao Jardim
            </h2>
          </div>
          <button
            type="button"
            onClick={aoFechar}
            aria-label="Fechar modal"
            style={{
              background: 'none',
              border: 'none',
              fontSize: '1.5rem',
              cursor: 'pointer',
              color: CORES.textoPrincipal,
              lineHeight: 1,
            }}
          >
            ×
          </button>
        </div>

        <form onSubmit={aoSubmeter} style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.4rem' }}>
            <label
              htmlFor="select-jardim"
              style={{ fontSize: '0.85rem', fontWeight: 600, color: CORES.textoPrincipal }}
            >
              Jardim medicinal *
            </label>
            <select
              id="select-jardim"
              value={jardimId}
              onChange={(e) => setJardimId(e.target.value === '' ? '' : Number(e.target.value))}
              style={{
                padding: '0.75rem 1rem',
                borderRadius: RAIO_BORDA,
                border: `1px solid ${CORES.bordaSuave}`,
                fontFamily: "'Inter', sans-serif",
                fontSize: '0.95rem',
                cursor: 'pointer',
              }}
            >
              <option value="">Selecione um jardim...</option>
              {jardinsDisponiveis.map((jardim) => (
                <option key={jardim.id} value={jardim.id}>
                  {jardim.nome}
                </option>
              ))}
            </select>
          </div>

          {jardimSelecionado && (
            <div
              style={{
                padding: '0.75rem',
                borderRadius: RAIO_BORDA,
                backgroundColor: CORES.primariaSuave,
                fontSize: '0.85rem',
                color: CORES.textoPrincipal,
              }}
            >
              <div>
                <strong>Responsável:</strong> {jardimSelecionado.nome_responsavel}
              </div>
              <div>
                <strong>Contato:</strong> {jardimSelecionado.contato_responsavel}
              </div>
            </div>
          )}

          <CampoEntrada
            rotulo="Data e horário da visita *"
            type="datetime-local"
            value={dataHorario}
            onChange={(e) => setDataHorario(e.target.value)}
            required
          />
          <CampoEntrada
            rotulo="Observação (opcional)"
            value={observacao}
            onChange={(e) => setObservacao(e.target.value)}
            placeholder="Ex.: Quantidade de mudas desejada, melhor horário..."
          />

          {erro && (
            <div
              role="alert"
              style={{
                padding: '0.75rem',
                borderRadius: RAIO_BORDA,
                backgroundColor: CORES.erroSuave,
                color: CORES.erro,
                fontSize: '0.85rem',
              }}
            >
              {erro}
            </div>
          )}

          <div style={{ display: 'flex', gap: '0.75rem', justifyContent: 'flex-end', marginTop: '0.5rem' }}>
            <Botao type="button" variante="contorno" onClick={aoFechar}>
              Cancelar
            </Botao>
            <Botao type="submit" variante="acao" disabled={carregando}>
              {carregando ? 'Agendando...' : 'Confirmar Agendamento'}
            </Botao>
          </div>
        </form>
      </Cartao>
    </div>
  );
};
