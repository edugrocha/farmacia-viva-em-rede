/**
 * Farmácia Viva em Rede - Cartão de Jardim Medicinal
 * Exibe informações completas do jardim com ações de agendamento.
 */

import React from 'react';
import { useNavigate } from 'react-router-dom';
import type { JardimMedicinal } from '../../core/modelos/entidades';
import { Cartao } from '../ui/Cartao';
import { Cracha } from '../ui/Cracha';
import { Botao } from '../ui/Botao';
import { CORES } from '../../core/tema/tokens';

export interface CartaoJardimProps {
  jardim: JardimMedicinal;
  distanciaFormatada?: string;
  aoAlternarAlertaColheita?: (jardimId: number, estadoAtual: boolean) => void;
  podeGerenciarAlertas?: boolean;
}

export const CartaoJardim: React.FC<CartaoJardimProps> = ({
  jardim,
  distanciaFormatada,
  aoAlternarAlertaColheita,
  podeGerenciarAlertas = false,
}) => {
  const navegar = useNavigate();

  return (
    <Cartao
      style={{
        display: 'flex',
        flexDirection: 'column',
        gap: '0.85rem',
        transition: 'transform 0.15s ease, box-shadow 0.15s ease',
      }}
    >
      <div style={{ display: 'flex', justifyContent: 'space-between', gap: '0.5rem' }}>
        <h3
          style={{
            margin: 0,
            fontFamily: "'Montserrat', sans-serif",
            fontSize: '1rem',
            fontWeight: 700,
            color: CORES.primaria,
            lineHeight: 1.35,
            minWidth: 0,
            overflowWrap: 'break-word',
          }}
        >
          {jardim.nome}
        </h3>
        {jardim.aviso_colheita_ativo && (
          <Cracha variante="acao">Colheita Ativa</Cracha>
        )}
      </div>

      {distanciaFormatada && (
        <div style={{ fontSize: '0.8rem', color: CORES.textoSuave }}>
          Distância: <strong>{distanciaFormatada}</strong>
        </div>
      )}

      <div style={{ fontSize: '0.85rem', color: CORES.textoPrincipal, lineHeight: 1.6, overflowWrap: 'break-word' }}>
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
      </div>

      <div>
        <div
          style={{
            fontSize: '0.75rem',
            fontWeight: 700,
            color: CORES.textoPrincipal,
            marginBottom: '0.4rem',
          }}
        >
          Plantas disponíveis:
        </div>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.35rem' }}>
          {jardim.plantas_disponiveis.map((planta, indice) => (
            <Cracha key={`planta-${jardim.id}-${indice}`} variante="neutra">
              {planta}
            </Cracha>
          ))}
        </div>
      </div>

      <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap', marginTop: 'auto' }}>
        <Botao
          variante="acao"
          onClick={() => navegar(`/agendar-visita?jardim=${jardim.id}`)}
          style={{ flex: 1, minWidth: '140px' }}
        >
          Agendar Visita
        </Botao>
        <Botao
          variante="contorno"
          onClick={() => navegar(`/jardim/${jardim.id}`)}
          style={{ flex: 1, minWidth: '140px' }}
        >
          Ver Detalhes
        </Botao>
      </div>

      {podeGerenciarAlertas && (
        <Botao
          variante="texto"
          tamanho="pequeno"
          onClick={() => aoAlternarAlertaColheita?.(jardim.id, jardim.aviso_colheita_ativo)}
        >
          {jardim.aviso_colheita_ativo
            ? 'Desativar alerta de colheita'
            : 'Ativar alerta de colheita'}
        </Botao>
      )}
    </Cartao>
  );
};
