/**
 * Farmácia Viva em Rede - Repositório de Usuários em Memória
 * Simulação do repositório PostgreSQL enquanto o banco não é integrado.
 */

import type { IRepositorioUsuarios } from '../../core/repositorios/contratos';
import type { Usuario, CriarUsuarioDTO, FiltroUsuariosDTO } from '../../core/modelos/entidades';
import { usuariosIniciais } from '../mocks/dadosIniciais';

export class RepositorioUsuariosEmMemoria implements IRepositorioUsuarios {
  private usuarios: Usuario[];

  constructor() {
    this.usuarios = [...usuariosIniciais];
  }

  async listarTodos(): Promise<Usuario[]> {
    return [...this.usuarios];
  }

  async buscarPorId(id: number): Promise<Usuario | null> {
    return this.usuarios.find((u) => u.id === id) ?? null;
  }

  async buscarPorEmail(email: string): Promise<Usuario | null> {
    return this.usuarios.find((u) => u.email.toLowerCase() === email.toLowerCase()) ?? null;
  }

  async listarPorFiltro(filtro: FiltroUsuariosDTO): Promise<Usuario[]> {
    return this.usuarios.filter((usuario) => {
      if (filtro.tipo_usuario && usuario.tipo_usuario !== filtro.tipo_usuario) return false;
      if (filtro.termo_busca) {
        const termo = filtro.termo_busca.toLowerCase();
        const corresponde =
          usuario.nome.toLowerCase().includes(termo) ||
          usuario.email.toLowerCase().includes(termo);
        if (!corresponde) return false;
      }
      return true;
    });
  }

  async criar(dados: CriarUsuarioDTO): Promise<Usuario> {
    const proximoId = this.usuarios.length > 0 ? Math.max(...this.usuarios.map((u) => u.id)) + 1 : 1;
    const novo: Usuario = {
      id: proximoId,
      ...dados,
      criado_em: new Date().toISOString(),
    };
    this.usuarios.push(novo);
    return novo;
  }

  async atualizar(id: number, dados: Partial<Usuario>): Promise<Usuario | null> {
    const indice = this.usuarios.findIndex((u) => u.id === id);
    if (indice === -1) return null;
    this.usuarios[indice] = { ...this.usuarios[indice], ...dados };
    return this.usuarios[indice];
  }

  async remover(id: number): Promise<boolean> {
    const indice = this.usuarios.findIndex((u) => u.id === id);
    if (indice === -1) return false;
    this.usuarios.splice(indice, 1);
    return true;
  }
}
