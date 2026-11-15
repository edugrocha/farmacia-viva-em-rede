/**
 * Farmácia Viva em Rede - Repositório do Fórum em Memória
 * Simulação do repositório PostgreSQL enquanto o banco não é integrado.
 */

import type { IRepositorioForum } from '../../core/repositorios/contratos';
import type { TopicoForum, CriarTopicoDTO, FiltroTopicosDTO, ComentarioForum, CriarComentarioDTO } from '../../core/modelos/entidades';
import type { RepositorioUsuariosEmMemoria } from './RepositorioUsuariosEmMemoria';
import { topicosIniciais } from '../mocks/dadosIniciais';

export class RepositorioForumEmMemoria implements IRepositorioForum {
  private topicos: TopicoForum[];
  private comentarios: ComentarioForum[];
  private dependenciasUsuarios: RepositorioUsuariosEmMemoria | null = null;

  constructor() {
    this.topicos = [...topicosIniciais];
    this.comentarios = topicosIniciais.flatMap((t) => t.comentarios);
  }

  definirDependencias(usuarios: RepositorioUsuariosEmMemoria): void {
    this.dependenciasUsuarios = usuarios;
  }

  async listarTopicos(): Promise<TopicoForum[]> {
    const resultado = await Promise.all(
      this.topicos.map(async (topico) => this.popularRelacionamentos(topico))
    );
    return resultado;
  }

  async buscarTopicoPorId(id: number): Promise<TopicoForum | null> {
    const topico = this.topicos.find((t) => t.id === id);
    if (!topico) return null;
    return this.popularRelacionamentos(topico);
  }

  async listarTopicosPorFiltro(filtro: FiltroTopicosDTO): Promise<TopicoForum[]> {
    const filtrados = this.topicos.filter((topico) => {
      if (filtro.usuario_id && topico.usuario_id !== filtro.usuario_id) return false;
      if (filtro.termo_busca) {
        const termo = filtro.termo_busca.toLowerCase();
        const corresponde =
          topico.titulo.toLowerCase().includes(termo) ||
          topico.descricao.toLowerCase().includes(termo);
        if (!corresponde) return false;
      }
      return true;
    });
    return Promise.all(filtrados.map((t) => this.popularRelacionamentos(t)));
  }

  async criarTopico(dados: CriarTopicoDTO): Promise<TopicoForum> {
    const proximoId = this.topicos.length > 0 ? Math.max(...this.topicos.map((t) => t.id)) + 1 : 1;
    const novo: TopicoForum = {
      id: proximoId,
      imagens: dados.imagens ?? [],
      comentarios: [],
      ...dados,
      criado_em: new Date().toISOString(),
    };
    this.topicos.push(novo);
    return this.popularRelacionamentos(novo);
  }

  async atualizarTopico(id: number, dados: Partial<TopicoForum>): Promise<TopicoForum | null> {
    const indice = this.topicos.findIndex((t) => t.id === id);
    if (indice === -1) return null;
    this.topicos[indice] = { ...this.topicos[indice], ...dados };
    return this.popularRelacionamentos(this.topicos[indice]);
  }

  async removerTopico(id: number): Promise<boolean> {
    const indice = this.topicos.findIndex((t) => t.id === id);
    if (indice === -1) return false;
    this.topicos.splice(indice, 1);
    return true;
  }

  async adicionarComentario(comentario: CriarComentarioDTO): Promise<ComentarioForum> {
    const proximoId = this.comentarios.length > 0 ? Math.max(...this.comentarios.map((c) => c.id)) + 1 : 1;
    const novo: ComentarioForum = {
      id: proximoId,
      badges_atribuidas: comentario.badges_atribuidas ?? [],
      ...comentario,
      criado_em: new Date().toISOString(),
    };
    this.comentarios.push(novo);
    const topico = this.topicos.find((t) => t.id === comentario.topico_id);
    if (topico) {
      topico.comentarios.push(novo);
    }
    return novo;
  }

  async listarComentariosPorTopico(topicoId: number): Promise<ComentarioForum[]> {
    return this.comentarios.filter((c) => c.topico_id === topicoId);
  }

  private async popularRelacionamentos(topico: TopicoForum): Promise<TopicoForum> {
    const usuario = this.dependenciasUsuarios
      ? await this.dependenciasUsuarios.buscarPorId(topico.usuario_id)
      : null;
    return { ...topico, usuario: usuario ?? undefined };
  }
}
