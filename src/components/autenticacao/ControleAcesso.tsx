/**
 * Farmácia Viva em Rede - Controle de acesso baseado em permissões (RBAC)
 * Renderiza o conteúdo apenas se o usuário ativo possuir a permissão exigida.
 */

import React from 'react';
import { usarAutenticacao } from '../../core/autenticacao/ContextoAutenticacao';
import type { Permissao } from '../../core/autenticacao/permissoes';

export interface ControleAcessoProps {
  permissao: Permissao;
  children: React.ReactNode;
  fallback?: React.ReactNode;
}

export const ControleAcesso: React.FC<ControleAcessoProps> = ({
  permissao,
  children,
  fallback = null,
}) => {
  const { temPermissao } = usarAutenticacao();

  if (!temPermissao(permissao)) {
    return <>{fallback}</>;
  }

  return <>{children}</>;
};
