/**
 * Farmácia Viva em Rede - Contexto Global de Autenticação e Sessão
 * Gerencia o estado de sessão do usuário ativo com persistência local e
 * fornece métodos para verificação de permissões (RBAC).
 */

import React, { createContext, useContext, useState, useEffect, useMemo } from 'react';
import type { Usuario, TipoUsuario } from '../modelos/entidades';
import { Permissao, usuarioPossuiPermissao, usuarioPossuiPapel } from './permissoes';
import { repositorioUsuarios } from '../../data/repositorios';

const CHAVE_ARMAZENAMENTO_SESSAO = '@farmacia-viva:sessao-usuario';

export interface ContextoAutenticacaoTipo {
  /** Usuário ativo na sessão atual ou null se deslogado */
  usuarioAtivo: Usuario | null;
  /** Estado de carregamento da sessão */
  carregando: boolean;
  /** Lista de usuários pré-configurados para login instantâneo */
  perfisPreConfigurados: Usuario[];
  /** Autentica um usuário instantaneamente pelo tipo de perfil */
  autenticarPorPapel: (papel: TipoUsuario) => Promise<void>;
  /** Autentica um usuário diretamente pelo seu id */
  autenticarPorId: (id: number) => Promise<void>;
  /** Encerra a sessão ativa */
  encerrarSessao: () => void;
  /** Verifica se o usuário ativo possui determinada permissão */
  temPermissao: (permissao: Permissao) => boolean;
  /** Verifica se o usuário ativo possui um dos papéis especificados */
  temPapel: (papeis: TipoUsuario[]) => boolean;
}

const ContextoAutenticacao = createContext<ContextoAutenticacaoTipo | undefined>(undefined);

export const ProvedorAutenticacao: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [usuarioAtivo, setUsuarioAtivo] = useState<Usuario | null>(null);
  const [perfisPreConfigurados, setPerfisPreConfigurados] = useState<Usuario[]>([]);
  const [carregando, setCarregando] = useState<boolean>(true);

  // Inicialização e recuperação da sessão salva
  useEffect(() => {
    async function inicializarSessao() {
      try {
        setCarregando(true);
        const todosUsuarios = await repositorioUsuarios.listarTodos();
        setPerfisPreConfigurados(todosUsuarios);

        const sessaoSalva = localStorage.getItem(CHAVE_ARMAZENAMENTO_SESSAO);
        if (sessaoSalva) {
          const dadosParsed = JSON.parse(sessaoSalva) as { id: number };
          const usuarioEncontrado = todosUsuarios.find((u) => u.id === dadosParsed.id);
          if (usuarioEncontrado) {
            setUsuarioAtivo(usuarioEncontrado);
            return;
          }
        }

        const perfilPadrao = todosUsuarios.find((u) => u.tipo_usuario === 'comum') || todosUsuarios[0];
        if (perfilPadrao) {
          setUsuarioAtivo(perfilPadrao);
          localStorage.setItem(
            CHAVE_ARMAZENAMENTO_SESSAO,
            JSON.stringify({ id: perfilPadrao.id })
          );
        }
      } catch (erro) {
        console.error('Falha ao inicializar sessão de usuário:', erro);
      } finally {
        setCarregando(false);
      }
    }

    inicializarSessao();
  }, []);

  const autenticarPorPapel = async (papel: TipoUsuario) => {
    const usuarioAlvo = perfisPreConfigurados.find((u) => u.tipo_usuario === papel);
    if (!usuarioAlvo) {
      throw new Error(`Nenhum perfil cadastrado encontrado para o papel '${papel}'.`);
    }
    setUsuarioAtivo(usuarioAlvo);
    localStorage.setItem(
      CHAVE_ARMAZENAMENTO_SESSAO,
      JSON.stringify({ id: usuarioAlvo.id })
    );
  };

  const autenticarPorId = async (id: number) => {
    const usuarioAlvo = perfisPreConfigurados.find((u) => u.id === id);
    if (!usuarioAlvo) {
      throw new Error(`Usuário com ID ${id} não encontrado nos registros.`);
    }
    setUsuarioAtivo(usuarioAlvo);
    localStorage.setItem(
      CHAVE_ARMAZENAMENTO_SESSAO,
      JSON.stringify({ id: usuarioAlvo.id })
    );
  };

  const encerrarSessao = () => {
    setUsuarioAtivo(null);
    localStorage.removeItem(CHAVE_ARMAZENAMENTO_SESSAO);
  };

  const temPermissao = (permissao: Permissao): boolean => {
    return usuarioPossuiPermissao(usuarioAtivo, permissao);
  };

  const temPapel = (papeis: TipoUsuario[]): boolean => {
    return usuarioPossuiPapel(usuarioAtivo, papeis);
  };

  const valorContexto = useMemo<ContextoAutenticacaoTipo>(
    () => ({
      usuarioAtivo,
      carregando,
      perfisPreConfigurados,
      autenticarPorPapel,
      autenticarPorId,
      encerrarSessao,
      temPermissao,
      temPapel,
    }),
    [usuarioAtivo, carregando, perfisPreConfigurados]
  );

  return (
    <ContextoAutenticacao.Provider value={valorContexto}>
      {children}
    </ContextoAutenticacao.Provider>
  );
};

/**
 * Hook personalizado para acesso aos dados de autenticação e RBAC
 */
export function usarAutenticacao(): ContextoAutenticacaoTipo {
  const contexto = useContext(ContextoAutenticacao);
  if (!contexto) {
    throw new Error('usarAutenticacao deve ser utilizado dentro de um ProvedorAutenticacao.');
  }
  return contexto;
}
