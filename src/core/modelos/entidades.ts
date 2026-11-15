/**
 * Farmácia Viva em Rede - Definições de Entidades e Tipos do Domínio
 * Preparado para mapeamento direto com tabelas relacionais do PostgreSQL.
 */

/**
 * Papéis de usuário no sistema (Enum no PostgreSQL: tipo_usuario_enum)
 */
export type TipoUsuario = 'comum' | 'extensionista' | 'responsavel_jardim';

/**
 * Entidade de Usuário
 * Tabela PostgreSQL: usuarios
 */
export interface Usuario {
  id: number;
  nome: string;
  email: string;
  senha_hash: string;
  tipo_usuario: TipoUsuario;
  criado_em: string;
}

/**
 * DTO para criação de novos usuários
 */
export interface CriarUsuarioDTO {
  nome: string;
  email: string;
  senha_hash: string;
  tipo_usuario: TipoUsuario;
}

/**
 * Filtros de busca para usuários
 */
export interface FiltroUsuariosDTO {
  tipo_usuario?: TipoUsuario;
  termo_busca?: string;
}

/**
 * Tipo de gestão do jardim (Enum no PostgreSQL: tipo_jardim_enum)
 */
export type TipoJardim = 'particular' | 'publico';

/**
 * Entidade de Jardim Medicinal
 * Tabela PostgreSQL: jardins_medicinais
 */
export interface JardimMedicinal {
  id: number;
  nome: string;
  extensionista_id: number;
  nome_responsavel: string;
  contato_responsavel: string;
  tipo_jardim: TipoJardim;
  endereco: string;
  latitude: number;
  longitude: number;
  plantas_disponiveis: string[];
  aviso_colheita_ativo: boolean;
  criado_em: string;
}

/**
 * DTO para cadastro de um jardim medicinal
 */
export interface CriarJardimDTO {
  nome: string;
  extensionista_id: number;
  nome_responsavel: string;
  contato_responsavel: string;
  tipo_jardim: TipoJardim;
  endereco: string;
  latitude: number;
  longitude: number;
  plantas_disponiveis: string[];
  aviso_colheita_ativo?: boolean;
}

/**
 * Filtros para busca e consulta de jardins medicinais
 */
export interface FiltroJardinsDTO {
  tipo_jardim?: TipoJardim;
  aviso_colheita_ativo?: boolean;
  planta?: string;
  termo_busca?: string;
}

/**
 * Status do agendamento da visita (Enum no PostgreSQL: status_visita_enum)
 */
export type StatusVisita = 'pendente' | 'confirmado' | 'cancelado';

/**
 * Entidade de Visita Agendada
 * Tabela PostgreSQL: visitas_agendadas
 */
export interface VisitaAgendada {
  id: number;
  jardim_id: number;
  usuario_id: number;
  data_horario: string;
  status: StatusVisita;
  criado_em: string;
  /** Relacionamentos populados opcionalmente (JOINs no PostgreSQL) */
  jardim?: JardimMedicinal;
  usuario?: Usuario;
}

/**
 * DTO para agendamento de nova visita
 */
export interface CriarVisitaDTO {
  jardim_id: number;
  usuario_id: number;
  data_horario: string;
  status?: StatusVisita;
}

/**
 * Filtros para consulta de visitas
 */
export interface FiltroVisitasDTO {
  jardim_id?: number;
  usuario_id?: number;
  status?: StatusVisita;
  data_inicio?: string;
  data_fim?: string;
}

/**
 * Entidade de Comentário em Tópico do Fórum
 * Tabela PostgreSQL: comentarios_forum
 */
export interface ComentarioForum {
  id: number;
  topico_id: number;
  usuario_id: number;
  usuario_nome: string;
  conteudo: string;
  badges_atribuidas: string[];
  criado_em: string;
}

/**
 * DTO para criação de novo comentário
 */
export interface CriarComentarioDTO {
  topico_id: number;
  usuario_id: number;
  usuario_nome: string;
  conteudo: string;
  badges_atribuidas?: string[];
}

/**
 * Entidade de Tópico do Fórum Comunitário
 * Tabela PostgreSQL: topicos_forum
 */
export interface TopicoForum {
  id: number;
  usuario_id: number;
  titulo: string;
  descricao: string;
  imagens: string[];
  criado_em: string;
  /** Relacionamentos populados opcionalmente (JOINs no PostgreSQL) */
  usuario?: Usuario;
  comentarios: ComentarioForum[];
}

/**
 * DTO para abertura de novo tópico no fórum
 */
export interface CriarTopicoDTO {
  usuario_id: number;
  titulo: string;
  descricao: string;
  imagens?: string[];
}

/**
 * Filtros para busca de tópicos no fórum
 */
export interface FiltroTopicosDTO {
  usuario_id?: number;
  termo_busca?: string;
}

/**
 * Entidade de Mensagem de Contato
 * Tabela PostgreSQL: mensagens_contato
 */
export interface MensagemContato {
  id: number;
  nome_remetente: string;
  email_remetente: string;
  assunto: string;
  mensagem: string;
  criado_em: string;
}

/**
 * DTO para envio de nova mensagem de contato
 */
export interface CriarMensagemContatoDTO {
  nome_remetente: string;
  email_remetente: string;
  assunto: string;
  mensagem: string;
}
