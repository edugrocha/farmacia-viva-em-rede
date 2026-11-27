/**
 * Farmácia Viva em Rede - Modal de criação de tópico no fórum
 */

import React, { useState } from 'react';
import { Cartao } from '../ui/Cartao';
import { CampoEntrada } from '../ui/CampoEntrada';
import { Botao } from '../ui/Botao';
import { Cracha } from '../ui/Cracha';
import { CORES, RAIO_BORDA, SOMBRAS } from '../../core/tema/tokens';
import { repositorioForum } from '../../data/repositorios';
import { usarAutenticacao } from '../../core/autenticacao/ContextoAutenticacao';
import type { TopicoForum } from '../../core/modelos/entidades';
import { useDialogA11y } from '../../core/tema/useDialogA11y';

export interface ModalCriarTopicoProps {
  aberto: boolean;
  aoFechar: () => void;
  aoCriar: (topico: TopicoForum) => void;
}

export const ModalCriarTopico: React.FC<ModalCriarTopicoProps> = ({
  aberto,
  aoFechar,
  aoCriar,
}) => {
  const { usuarioAtivo } = usarAutenticacao();
  const [titulo, setTitulo] = useState('');
  const [descricao, setDescricao] = useState('');
  const [imagens, setImagens] = useState('');
  const [erro, setErro] = useState('');
  const [carregando, setCarregando] = useState(false);

  const dialogRef = useDialogA11y<HTMLDivElement>(aoFechar, aberto);

  if (!aberto) return null;

  const aoSubmeter = async (evento: React.FormEvent) => {
    evento.preventDefault();
    setErro('');

    if (!titulo.trim() || !descricao.trim()) {
      setErro('Preencha o título e a descrição.');
      return;
    }

    if (!usuarioAtivo) {
      setErro('Você precisa estar autenticado para criar um tópico.');
      return;
    }

    const listaImagens = imagens
      .split(',')
      .map((i) => i.trim())
      .filter(Boolean);
    if (listaImagens.length > 3) {
      setErro('Limite de 3 imagens por tópico.');
      return;
    }

    setCarregando(true);
    try {
      const novoTopico = await repositorioForum.criarTopico({
        usuario_id: usuarioAtivo.id,
        titulo: titulo.trim(),
        descricao: descricao.trim(),
        imagens: listaImagens,
      });
      aoCriar(novoTopico);
      setTitulo('');
      setDescricao('');
      setImagens('');
      aoFechar();
    } catch (erroInterno) {
      setErro(
        erroInterno instanceof Error ? erroInterno.message : 'Não foi possível criar o tópico.'
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
      aria-labelledby="titulo-modal-criar-topico"
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
          maxWidth: '560px',
          boxShadow: SOMBRAS.elevada,
          display: 'flex',
          flexDirection: 'column',
          gap: '0.85rem',
        }}
      >
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div>
            <Cracha variante="secundaria">Comunidade</Cracha>
            <h2
              id="titulo-modal-criar-topico"
              style={{
                margin: '0.5rem 0 0',
                fontFamily: "'Montserrat', sans-serif",
                fontSize: '1.15rem',
                color: CORES.primaria,
              }}
            >
              Novo Tópico
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
          <CampoEntrada
            rotulo="Título *"
            value={titulo}
            onChange={(e) => setTitulo(e.target.value)}
            required
          />
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.4rem' }}>
            <label
              htmlFor="descricao-topico"
              style={{ fontSize: '0.85rem', fontWeight: 600, color: CORES.textoPrincipal }}
            >
              Descrição *
            </label>
            <textarea
              id="descricao-topico"
              value={descricao}
              onChange={(e) => setDescricao(e.target.value)}
              rows={4}
              required
              style={{
                padding: '0.75rem 1rem',
                borderRadius: RAIO_BORDA,
                border: `1px solid ${CORES.bordaSuave}`,
                fontFamily: "'Inter', sans-serif",
                fontSize: '0.95rem',
                resize: 'vertical',
              }}
            />
          </div>
          <CampoEntrada
            rotulo="URLs de imagens (opcional, até 3)"
            value={imagens}
            onChange={(e) => setImagens(e.target.value)}
            placeholder="https://exemplo.com/1.jpg, https://exemplo.com/2.jpg"
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
            <Botao type="submit" variante="primario" disabled={carregando}>
              {carregando ? 'Criando...' : 'Criar Tópico'}
            </Botao>
          </div>
        </form>
      </Cartao>
    </div>
  );
};
