/**
 * Farmácia Viva em Rede - Repositório de Jardins em Memória
 * Simulação do repositório PostgreSQL enquanto o banco não é integrado.
 */

import type { IRepositorioJardins } from '../../core/repositorios/contratos';
import type { JardimMedicinal, CriarJardimDTO, FiltroJardinsDTO } from '../../core/modelos/entidades';
import { jardinsIniciais } from '../mocks/dadosIniciais';

export class RepositorioJardinsEmMemoria implements IRepositorioJardins {
  private jardins: JardimMedicinal[];

  constructor() {
    this.jardins = [...jardinsIniciais];
  }

  async listarTodos(): Promise<JardimMedicinal[]> {
    return [...this.jardins];
  }

  async buscarPorId(id: number): Promise<JardimMedicinal | null> {
    return this.jardins.find((j) => j.id === id) ?? null;
  }

  async listarPorFiltro(filtro: FiltroJardinsDTO): Promise<JardimMedicinal[]> {
    return this.jardins.filter((jardim) => {
      if (filtro.tipo_jardim && jardim.tipo_jardim !== filtro.tipo_jardim) return false;
      if (filtro.aviso_colheita_ativo !== undefined && jardim.aviso_colheita_ativo !== filtro.aviso_colheita_ativo) {
        return false;
      }
      if (filtro.planta) {
        const planta = filtro.planta.toLowerCase();
        const contem = jardim.plantas_disponiveis.some((p) => p.toLowerCase().includes(planta));
        if (!contem) return false;
      }
      if (filtro.termo_busca) {
        const termo = filtro.termo_busca.toLowerCase();
        const corresponde =
          jardim.nome.toLowerCase().includes(termo) ||
          jardim.endereco.toLowerCase().includes(termo) ||
          jardim.nome_responsavel.toLowerCase().includes(termo);
        if (!corresponde) return false;
      }
      return true;
    });
  }

  async criar(dados: CriarJardimDTO): Promise<JardimMedicinal> {
    const proximoId = this.jardins.length > 0 ? Math.max(...this.jardins.map((j) => j.id)) + 1 : 1;
    const novo: JardimMedicinal = {
      id: proximoId,
      aviso_colheita_ativo: dados.aviso_colheita_ativo ?? false,
      ...dados,
      criado_em: new Date().toISOString(),
    };
    this.jardins.push(novo);
    return novo;
  }

  async atualizar(id: number, dados: Partial<JardimMedicinal>): Promise<JardimMedicinal | null> {
    const indice = this.jardins.findIndex((j) => j.id === id);
    if (indice === -1) return null;
    this.jardins[indice] = { ...this.jardins[indice], ...dados };
    return this.jardins[indice];
  }

  async remover(id: number): Promise<boolean> {
    const indice = this.jardins.findIndex((j) => j.id === id);
    if (indice === -1) return false;
    this.jardins.splice(indice, 1);
    return true;
  }

  async atualizarAvisoColheita(id: number, estado: boolean): Promise<JardimMedicinal | null> {
    const indice = this.jardins.findIndex((j) => j.id === id);
    if (indice === -1) return null;
    this.jardins[indice] = { ...this.jardins[indice], aviso_colheita_ativo: estado };
    return this.jardins[indice];
  }
}
