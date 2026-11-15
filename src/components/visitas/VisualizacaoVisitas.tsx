/**
 * Farmácia Viva em Rede - Visualização e gestão de visitas agendadas
 */

import React from 'react';
import { Cartao } from '../ui/Cartao';
import { Cracha } from '../ui/Cracha';
import { CORES } from '../../core/tema/tokens';
import type { VisitaAgendada } from '../../core/modelos/entidades';

export interface VisualizacaoVisitasProps {
  visitasIniciais?: VisitaAgendada[];
  aoVisitaAtualizada?: () => void;
}

export const VisualizacaoVisitas: React.FC<VisualizacaoVisitasProps> = ({
  visitasIniciais = [],
}) => {
  if (visitasIniciais.length === 0) {
    return (
      <Cartao>
        <p style={{ textAlign: 'center', color: CORES.textoSuave }}>
          Nenhuma visita agendada ainda. Clique em "Agendar Visita" em qualquer cartão de jardim.
        </p>
      </Cartao>
    );
  }

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
      {visitasIniciais.map((visita) => (
        <Cartao
          key={visita.id}
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            gap: '1rem',
            flexWrap: 'wrap',
          }}
        >
          <div>
            <div
              style={{
                fontFamily: "'Montserrat', sans-serif",
                fontWeight: 700,
                color: CORES.primaria,
                fontSize: '0.95rem',
              }}
            >
              {visita.jardim?.nome || `Jardim #${visita.jardim_id}`}
            </div>
            <div style={{ fontSize: '0.85rem', color: CORES.textoSuave, marginTop: '0.25rem' }}>
              {new Date(visita.data_horario).toLocaleString('pt-BR', {
                day: '2-digit',
                month: '2-digit',
                year: 'numeric',
                hour: '2-digit',
                minute: '2-digit',
              })}
            </div>
            <div style={{ fontSize: '0.8rem', color: CORES.textoPrincipal, marginTop: '0.25rem' }}>
              Solicitante: {visita.usuario?.nome || 'Usuário'}
            </div>
          </div>
          <Cracha variante={visita.status === 'confirmado' ? 'primaria' : 'acao'}>
            {visita.status === 'confirmado' ? 'Confirmada' : 'Pendente'}
          </Cracha>
        </Cartao>
      ))}
    </div>
  );
};
