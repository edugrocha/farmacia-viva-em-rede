/**
 * Farmácia Viva em Rede - Sistema de Permissões RBAC
 * Define permissões granulares e regras de acesso por papel de usuário.
 */

import type { Usuario, TipoUsuario } from '../modelos/entidades';

/**
 * Permissões disponíveis no sistema
 */
export type Permissao =
  | 'cadastrar_jardim'
  | 'alternar_alerta_colheita'
  | 'agendar_visita'
  | 'visualizar_mapa'
  | 'participar_forum'
  | 'gerenciar_usuarios'
  | 'acessar_assistente';

/**
 * Mapeamento de permissões por papel de usuário
 */
const PERMISSOES_POR_PAPEL: Record<TipoUsuario, Permissao[]> = {
  comum: ['visualizar_mapa', 'participar_forum', 'agendar_visita', 'acessar_assistente'],
  extensionista: [
    'visualizar_mapa',
    'participar_forum',
    'agendar_visita',
    'acessar_assistente',
    'cadastrar_jardim',
    'alternar_alerta_colheita',
  ],
  responsavel_jardim: [
    'visualizar_mapa',
    'participar_forum',
    'agendar_visita',
    'acessar_assistente',
    'alternar_alerta_colheita',
  ],
};

/**
 * Rótulos amigáveis para exibição dos papéis no painel
 */
export const ROTULOS_PAPEIS: Record<TipoUsuario, { titulo: string; descricao: string }> = {
  comum: {
    titulo: 'Usuário Comum',
    descricao: 'Acesso a consultas, agendamentos e fórum comunitário',
  },
  extensionista: {
    titulo: 'Extensionista',
    descricao: 'Gerencia jardins, alertas de colheita e orienta a comunidade',
  },
  responsavel_jardim: {
    titulo: 'Responsável por Jardim',
    descricao: 'Administra um horto específico e seus alertas de colheita',
  },
};

/**
 * Verifica se um usuário possui uma permissão específica
 */
export function usuarioPossuiPermissao(usuario: Usuario | null, permissao: Permissao): boolean {
  if (!usuario) return false;
  const permissoes = PERMISSOES_POR_PAPEL[usuario.tipo_usuario];
  return permissoes.includes(permissao);
}

/**
 * Verifica se um usuário possui um dos papéis especificados
 */
export function usuarioPossuiPapel(usuario: Usuario | null, papeis: TipoUsuario[]): boolean {
  if (!usuario) return false;
  return papeis.includes(usuario.tipo_usuario);
}
