/**
 * Farmácia Viva em Rede - Visualização do Fórum Comunitário
 */

import React, { useState } from 'react';
import { Cartao } from '../ui/Cartao';
import { Cracha } from '../ui/Cracha';
import { Botao } from '../ui/Botao';
import { ModalCriarTopico } from './ModalCriarTopico';
import { CORES, RAIO_BORDA } from '../../core/tema/tokens';
import { repositorioForum } from '../../data/repositorios';
import type { TopicoForum } from '../../core/modelos/entidades';

export interface VisualizacaoForumProps {
  topicosIniciais?: TopicoForum[];
}

export const VisualizacaoForum: React.FC<VisualizacaoForumProps> = ({ topicosIniciais = [] }) => {
  const [topicos, setTopicos] = useState<TopicoForum[]>(topicosIniciais);
  const [modalAberto, setModalAberto] = useState(false);
  const [carregando, setCarregando] = useState(false);

  const aoCriarTopico = (novoTopico: TopicoForum) => {
    setTopicos((anteriores) => [novoTopico, ...anteriores]);
  };

  const adicionarComentario = async (topicoId: number, conteudo: string) => {
    if (!conteudo.trim()) return;
    setCarregando(true);
    try {
      const comentario = await repositorioForum.adicionarComentario({
        topico_id: topicoId,
        usuario_id: 1,
        usuario_nome: 'Maria Silva',
        conteudo: conteudo.trim(),
        badges_atribuidas: [],
      });

      setTopicos((anteriores) =>
        anteriores.map((topico) =>
          topico.id === topicoId
            ? { ...topico, comentarios: [...topico.comentarios, comentario] }
            : topico
        )
      );
    } catch (erro) {
      console.error('Erro ao adicionar comentário:', erro);
    } finally {
      setCarregando(false);
    }
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '1rem' }}>
        <p style={{ margin: 0, color: CORES.textoSuave }}>
          Discussões entre agentes de saúde, extensionistas e comunidade.
        </p>
        <Botao variante="primario" onClick={() => setModalAberto(true)}>
          Novo Tópico
        </Botao>
      </div>

      {topicos.length === 0 ? (
        <Cartao>
          <p style={{ textAlign: 'center', color: CORES.textoSuave }}>
            Nenhum tópico criado ainda. Seja o primeiro a participar!
          </p>
        </Cartao>
      ) : (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          {topicos.map((topico) => (
            <Cartao key={topico.id}>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                <div>
                  <Cracha variante="secundaria">{topico.usuario?.nome || 'Usuário'}</Cracha>
                </div>
                <h3
                  style={{
                    margin: 0,
                    fontFamily: "'Montserrat', sans-serif",
                    fontSize: '1.1rem',
                    color: CORES.primaria,
                  }}
                >
                  {topico.titulo}
                </h3>
                <p style={{ margin: 0, lineHeight: 1.6 }}>{topico.descricao}</p>

                <div
                  style={{
                    borderTop: `1px solid ${CORES.bordaSuave}`,
                    paddingTop: '0.75rem',
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '0.5rem',
                  }}
                >
                  <div style={{ fontSize: '0.8rem', fontWeight: 700, color: CORES.textoSuave }}>
                    Comentários ({topico.comentarios.length})
                  </div>
                  {topico.comentarios.map((comentario) => (
                    <div
                      key={comentario.id}
                      style={{
                        padding: '0.6rem 0.75rem',
                        backgroundColor: CORES.fundo,
                        borderRadius: RAIO_BORDA,
                        fontSize: '0.85rem',
                      }}
                    >
                      <strong>{comentario.usuario_nome}:</strong> {comentario.conteudo}
                    </div>
                  ))}
                  <FormularioComentario
                    aoEnviar={(conteudo) => adicionarComentario(topico.id, conteudo)}
                    carregando={carregando}
                  />
                </div>
              </div>
            </Cartao>
          ))}
        </div>
      )}

      <ModalCriarTopico
        aberto={modalAberto}
        aoFechar={() => setModalAberto(false)}
        aoCriar={aoCriarTopico}
      />
    </div>
  );
};

interface FormularioComentarioProps {
  aoEnviar: (conteudo: string) => void;
  carregando: boolean;
}

const FormularioComentario: React.FC<FormularioComentarioProps> = ({ aoEnviar, carregando }) => {
  const [conteudo, setConteudo] = useState('');

  const aoSubmeter = (evento: React.FormEvent) => {
    evento.preventDefault();
    if (!conteudo.trim()) return;
    aoEnviar(conteudo);
    setConteudo('');
  };

  return (
    <form onSubmit={aoSubmeter} style={{ display: 'flex', gap: '0.5rem' }}>
      <input
        type="text"
        value={conteudo}
        onChange={(e) => setConteudo(e.target.value)}
        placeholder="Escreva um comentário..."
        aria-label="Novo comentário"
        style={{
          flex: 1,
          padding: '0.6rem 0.75rem',
          borderRadius: RAIO_BORDA,
          border: `1px solid ${CORES.bordaSuave}`,
          fontFamily: "'Inter', sans-serif",
          fontSize: '0.85rem',
        }}
      />
      <Botao type="submit" variante="secundario" tamanho="pequeno" disabled={carregando}>
        Responder
      </Botao>
    </form>
  );
};
