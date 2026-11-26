/**
 * Farmácia Viva em Rede - Contratos de Repositório
 * Interfaces abstratas que definem o contrato de acesso a dados.
 * Preparado para migração direta para PostgreSQL via drivers SQL.
 */

import type {
  Usuario,
  CriarUsuarioDTO,
  FiltroUsuariosDTO,
  JardimMedicinal,
  CriarJardimDTO,
  FiltroJardinsDTO,
  VisitaAgendada,
  CriarVisitaDTO,
  FiltroVisitasDTO,
  TopicoForum,
  CriarTopicoDTO,
  FiltroTopicosDTO,
  ComentarioForum,
  CriarComentarioDTO,
} from '../modelos/entidades';

export interface IRepositorioUsuarios {
  listarTodos(): Promise<Usuario[]>;
  buscarPorId(id: number): Promise<Usuario | null>;
  buscarPorEmail(email: string): Promise<Usuario | null>;
  listarPorFiltro(filtro: FiltroUsuariosDTO): Promise<Usuario[]>;
  criar(dados: CriarUsuarioDTO): Promise<Usuario>;
  atualizar(id: number, dados: Partial<Usuario>): Promise<Usuario | null>;
  remover(id: number): Promise<boolean>;
}

export interface IRepositorioJardins {
  listarTodos(): Promise<JardimMedicinal[]>;
  buscarPorId(id: number): Promise<JardimMedicinal | null>;
  listarPorFiltro(filtro: FiltroJardinsDTO): Promise<JardimMedicinal[]>;
  criar(dados: CriarJardimDTO): Promise<JardimMedicinal>;
  atualizar(id: number, dados: Partial<JardimMedicinal>): Promise<JardimMedicinal | null>;
  remover(id: number): Promise<boolean>;
  atualizarAvisoColheita(id: number, estado: boolean): Promise<JardimMedicinal | null>;
}

export interface IRepositorioVisitas {
  listarTodas(): Promise<VisitaAgendada[]>;
  buscarPorId(id: number): Promise<VisitaAgendada | null>;
  listarPorFiltro(filtro: FiltroVisitasDTO): Promise<VisitaAgendada[]>;
  criar(dados: CriarVisitaDTO): Promise<VisitaAgendada>;
  atualizar(id: number, dados: Partial<VisitaAgendada>): Promise<VisitaAgendada | null>;
  remover(id: number): Promise<boolean>;
}

export interface IRepositorioForum {
  listarTopicos(): Promise<TopicoForum[]>;
  buscarTopicoPorId(id: number): Promise<TopicoForum | null>;
  listarTopicosPorFiltro(filtro: FiltroTopicosDTO): Promise<TopicoForum[]>;
  criarTopico(dados: CriarTopicoDTO): Promise<TopicoForum>;
  atualizarTopico(id: number, dados: Partial<TopicoForum>): Promise<TopicoForum | null>;
  removerTopico(id: number): Promise<boolean>;
  adicionarComentario(comentario: CriarComentarioDTO): Promise<ComentarioForum>;
  listarComentariosPorTopico(topicoId: number): Promise<ComentarioForum[]>;
}

export interface IRepositorioImagensEspecies {
  /** Retorna os caminhos públicos das fotos da espécie (ex.: /assets/plants/{slug}/*.jpg). */
  obterFotosEspecie(slug: string): Promise<string[]>;
}
