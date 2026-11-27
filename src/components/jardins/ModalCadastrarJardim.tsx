/**
 * Farmácia Viva em Rede - Modal de cadastro de jardim medicinal
 */

import React, { useState } from 'react';
import { Botao } from '../ui/Botao';
import { CampoEntrada } from '../ui/CampoEntrada';
import { Cracha } from '../ui/Cracha';
import { Cartao } from '../ui/Cartao';
import { CORES, RAIO_BORDA, SOMBRAS } from '../../core/tema/tokens';
import { repositorioJardins } from '../../data/repositorios';
import type { JardimMedicinal, TipoJardim } from '../../core/modelos/entidades';
import { useDialogA11y } from '../../core/tema/useDialogA11y';

export interface ModalCadastrarJardimProps {
  aberto: boolean;
  aoFechar: () => void;
  aoCadastrarSucesso: (jardim: JardimMedicinal) => void;
}

export const ModalCadastrarJardim: React.FC<ModalCadastrarJardimProps> = ({
  aberto,
  aoFechar,
  aoCadastrarSucesso,
}) => {
  const [nome, setNome] = useState('');
  const [nomeResponsavel, setNomeResponsavel] = useState('');
  const [contatoResponsavel, setContatoResponsavel] = useState('');
  const [endereco, setEndereco] = useState('');
  const [latitude, setLatitude] = useState('-8.1620');
  const [longitude, setLongitude] = useState('-34.9435');
  const [tipoJardim, setTipoJardim] = useState<TipoJardim>('publico');
  const [plantas, setPlantas] = useState('');
  const [avisoColheita, setAvisoColheita] = useState(false);
  const [erro, setErro] = useState('');
  const [carregando, setCarregando] = useState(false);

  const dialogRef = useDialogA11y<HTMLDivElement>(aoFechar, aberto);

  if (!aberto) return null;

  const aoSubmeter = async (evento: React.FormEvent) => {
    evento.preventDefault();
    setErro('');

    if (
      !nome.trim() ||
      !nomeResponsavel.trim() ||
      !contatoResponsavel.trim() ||
      !endereco.trim() ||
      !plantas.trim()
    ) {
      setErro('Preencha todos os campos obrigatórios.');
      return;
    }

    const lat = Number(latitude);
    const lng = Number(longitude);
    if (Number.isNaN(lat) || Number.isNaN(lng)) {
      setErro('Latitude e longitude devem ser números válidos.');
      return;
    }

    setCarregando(true);
    try {
      const novoJardim = await repositorioJardins.criar({
        nome: nome.trim(),
        extensionista_id: 2,
        nome_responsavel: nomeResponsavel.trim(),
        contato_responsavel: contatoResponsavel.trim(),
        tipo_jardim: tipoJardim,
        endereco: endereco.trim(),
        latitude: lat,
        longitude: lng,
        plantas_disponiveis: plantas
          .split(',')
          .map((p) => p.trim())
          .filter(Boolean),
        aviso_colheita_ativo: avisoColheita,
      });

      aoCadastrarSucesso(novoJardim);
      setNome('');
      setNomeResponsavel('');
      setContatoResponsavel('');
      setEndereco('');
      setLatitude('-8.1620');
      setLongitude('-34.9435');
      setPlantas('');
      setAvisoColheita(false);
      aoFechar();
    } catch (erroInterno) {
      setErro(
        erroInterno instanceof Error ? erroInterno.message : 'Não foi possível cadastrar o jardim.'
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
      aria-labelledby="titulo-modal-cadastro-jardim"
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 9999,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'rgba(46, 64, 69, 0.6)',
        padding: '1rem',
        overflowY: 'auto',
      }}
    >
      <Cartao
        style={{
          width: '100%',
          maxWidth: '640px',
          maxHeight: '90vh',
          overflowY: 'auto',
          boxShadow: SOMBRAS.elevada,
        }}
      >
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
          <div>
            <Cracha variante="primaria">Extensão Comunitária</Cracha>
            <h2
              id="titulo-modal-cadastro-jardim"
              style={{
                margin: '0.5rem 0 0',
                fontFamily: "'Montserrat', sans-serif",
                fontSize: '1.15rem',
                color: CORES.primaria,
              }}
            >
              Cadastrar Novo Jardim Medicinal
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

        <form onSubmit={aoSubmeter} style={{ display: 'flex', flexDirection: 'column', gap: '0.85rem' }}>
          <CampoEntrada rotulo="Nome do jardim *" value={nome} onChange={(e) => setNome(e.target.value)} required />
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.75rem' }}>
            <CampoEntrada
              rotulo="Nome do responsável *"
              value={nomeResponsavel}
              onChange={(e) => setNomeResponsavel(e.target.value)}
              required
            />
            <CampoEntrada
              rotulo="Contato do responsável *"
              value={contatoResponsavel}
              onChange={(e) => setContatoResponsavel(e.target.value)}
              required
            />
          </div>
          <CampoEntrada rotulo="Endereço completo *" value={endereco} onChange={(e) => setEndereco(e.target.value)} required />
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.75rem' }}>
            <CampoEntrada rotulo="Latitude" value={latitude} onChange={(e) => setLatitude(e.target.value)} />
            <CampoEntrada rotulo="Longitude" value={longitude} onChange={(e) => setLongitude(e.target.value)} />
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.4rem' }}>
            <label style={{ fontSize: '0.85rem', fontWeight: 600, color: CORES.textoPrincipal }}>
              Tipo de jardim *
            </label>
            <select
              value={tipoJardim}
              onChange={(e) => setTipoJardim(e.target.value as TipoJardim)}
              style={{
                padding: '0.75rem 1rem',
                borderRadius: RAIO_BORDA,
                border: `1px solid ${CORES.bordaSuave}`,
                fontFamily: "'Inter', sans-serif",
                fontSize: '0.95rem',
                cursor: 'pointer',
              }}
            >
              <option value="publico">Público</option>
              <option value="particular">Particular</option>
            </select>
          </div>
          <CampoEntrada
            rotulo="Plantas disponíveis (separe por vírgula) *"
            value={plantas}
            onChange={(e) => setPlantas(e.target.value)}
            placeholder="Ex.: Erva-cidreira, Guaco, Boldo-brasileiro"
            required
          />
          <label
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '0.5rem',
              fontSize: '0.85rem',
              color: CORES.textoPrincipal,
              cursor: 'pointer',
            }}
          >
            <input
              type="checkbox"
              checked={avisoColheita}
              onChange={(e) => setAvisoColheita(e.target.checked)}
            />
            Ativar aviso de colheita ao cadastrar
          </label>

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
            <Botao type="submit" variante="primario" disabled={carregando}>
              {carregando ? 'Cadastrando...' : 'Cadastrar Jardim'}
            </Botao>
          </div>
        </form>
      </Cartao>
    </div>
  );
};
