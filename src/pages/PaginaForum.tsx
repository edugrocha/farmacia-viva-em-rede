/**
 * Farmácia Viva em Rede - Página Fórum Interativo
 */

import React, { useEffect, useState } from 'react';
import { repositorioForum } from '../data/repositorios';
import { VisualizacaoForum } from '../components/forum/VisualizacaoForum';
import { Cracha } from '../components/ui/Cracha';
import type { TopicoForum } from '../core/modelos/entidades';

export const PaginaForum: React.FC = () => {
  const [topicos, setTopicos] = useState<TopicoForum[]>([]);
  const [carregando, setCarregando] = useState(true);

  useEffect(() => {
    const carregar = async () => {
      try {
        const lista = await repositorioForum.listarTopicos();
        setTopicos(lista);
      } catch (erro) {
        console.error('Erro ao carregar fórum:', erro);
      } finally {
        setCarregando(false);
      }
    };

    carregar();
  }, []);

  return (
    <section aria-labelledby="titulo-forum-pagina">
      <div style={{ marginBottom: '1.5rem' }}>
        <Cracha variante="secundaria">Comunidade e Saberes</Cracha>
        <h1
          id="titulo-forum-pagina"
          style={{
            fontFamily: "'Montserrat', sans-serif",
            fontSize: '1.5rem',
            fontWeight: 700,
            marginTop: '0.5rem',
            marginBottom: 0,
          }}
        >
          Fórum Interativo
        </h1>
        <p style={{ color: '#6B7B80', marginTop: '0.5rem' }}>
          Espaço de diálogo entre agentes de saúde, extensionistas e membros da comunidade.
        </p>
      </div>

      {carregando ? (
        <p style={{ color: '#6B7B80' }}>Carregando discussões...</p>
      ) : (
        <VisualizacaoForum topicosIniciais={topicos} />
      )}
    </section>
  );
};
