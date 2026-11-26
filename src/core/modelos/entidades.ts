/**
 * Farmácia Viva em Rede - Definições de Entidades e Tipos do Domínio
 * Preparado para mapeamento direto com tabelas relacionais do PostgreSQL.
 */

// ─────────────────────────────────────────────────────────────────────────────
// Espécie Vegetal (Species Information)
// ─────────────────────────────────────────────────────────────────────────────

// ─────────────────────────────────────────────────────────────────────────────

/** Ciclo de desenvolvimento da planta */
export type CicloDesenvolvimento = 'anual' | 'bianual' | 'perene';

/** Método de propagação */
export type MetodoPropagacao =
  | 'sementes'
  | 'estaquia'
  | 'divisao_touceira'
  | 'rizomas'
  | 'estoloes'
  | 'enxertia'
  | 'mergulhia'
  | 'microestaquia';

/** Partes utilizadas da planta */
export type ParteUtilizada =
  | 'folhas'
  | 'flores'
  | 'frutos'
  | 'raizes'
  | 'cascas'
  | 'sementes'
  | 'rizomas'
  | 'resina'
  | 'latex'
  | 'óleo_essencial';

/**
 * Entidade de Espécie Vegetal — enriquecida com dados botânicos, agronômicos
 * e de identificação visual.
 * Tabela PostgreSQL futura: especies_plantas
 */
export interface EspeciePlanta {
  /** Slug único da espécie, e.g. "erva-cidreira" (usado no path de imagens) */
  slug: string;

  // ── Nomenclatura ──────────────────────────────────────────────────────────
  nome_popular: string;
  /** Nome científico atualizado (sinonímia incluída quando relevante) */
  nome_cientifico: string;
  /** Sinonímias botânicas, se houver */
  sinonimias?: string[];
  familia_botanica: string;

  // ── Distribuição geográfica ───────────────────────────────────────────────
  origem: string;
  distribuicao_geografica: string;

  // ── Morfologia simplificada (ID em campo) ─────────────────────────────────
  morfologia: {
    habito: string;        // ex.: "erva rasteira perene, até 60 cm"
    folhas: string;
    flores?: string;
    frutos?: string;
    raiz?: string;
    aroma?: string;
  };

  // ── Uso medicinal ─────────────────────────────────────────────────────────
  partes_utilizadas: ParteUtilizada[];

  // ── Agronomia ─────────────────────────────────────────────────────────────
  ciclo_desenvolvimento: CicloDesenvolvimento;
  metodos_propagacao: MetodoPropagacao[];
  requisitos_climaticos: {
    temperatura_min_c: number;
    temperatura_max_c: number;
    precipitacao_descricao: string;
    tolerancia_seca?: boolean;
    exposicao_solar: 'pleno_sol' | 'meia_sombra' | 'sombra';
  };
  requisitos_edaficos: {
    tipo_solo: string;
    ph_min: number;
    ph_max: number;
    drenagem: 'boa' | 'moderada' | 'mal_drenado';
    fertilidade: 'alta' | 'media' | 'baixa';
  };
  epoca_plantio: string;
  epoca_colheita: string;
  potencial_produtivo: string;

  // ── Galeria fotográfica ────────────────────────────────────────────────────
  /** Fotos da espécie (imagens de porte/hábito): /assets/plants/{slug}/{arquivo}.{ext} */
  fotos: string[];
}

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
  /**
   * Slugs das espécies presentes no jardim.
   * Referencia EspeciePlanta.slug — JOIN futuro com tabela especies_plantas.
   */
  especies_slugs?: string[];
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
