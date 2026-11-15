/**
 * Farmácia Viva em Rede - Repositório de Visitas em Memória
 * Simulação do repositório PostgreSQL enquanto o banco não é integrado.
 */

import type { IRepositorioVisitas } from '../../core/repositorios/contratos';
import type { VisitaAgendada, CriarVisitaDTO, FiltroVisitasDTO } from '../../core/modelos/entidades';
import type { RepositorioJardinsEmMemoria } from './RepositorioJardinsEmMemoria';
import type { RepositorioUsuariosEmMemoria } from './RepositorioUsuariosEmMemoria';
import { visitasIniciais } from '../mocks/dadosIniciais';

export class RepositorioVisitasEmMemoria implements IRepositorioVisitas {
  private visitas: VisitaAgendada[];
  private dependenciasJardins: RepositorioJardinsEmMemoria | null = null;
  private dependenciasUsuarios: RepositorioUsuariosEmMemoria | null = null;

  constructor() {
    this.visitas = [...visitasIniciais];
  }

  definirDependencias(jardins: RepositorioJardinsEmMemoria, usuarios: RepositorioUsuariosEmMemoria): void {
    this.dependenciasJardins = jardins;
    this.dependenciasUsuarios = usuarios;
  }

  async listarTodas(): Promise<VisitaAgendada[]> {
    const resultado = await Promise.all(
      this.visitas.map(async (visita) => {
        return this.popularRelacionamentos(visita);
      })
    );
    return resultado;
  }

  async buscarPorId(id: number): Promise<VisitaAgendada | null> {
    const visita = this.visitas.find((v) => v.id === id);
    if (!visita) return null;
    return this.popularRelacionamentos(visita);
  }

  async listarPorFiltro(filtro: FiltroVisitasDTO): Promise<VisitaAgendada[]> {
    const filtradas = this.visitas.filter((visita) => {
      if (filtro.jardim_id && visita.jardim_id !== filtro.jardim_id) return false;
      if (filtro.usuario_id && visita.usuario_id !== filtro.usuario_id) return false;
      if (filtro.status && visita.status !== filtro.status) return false;
      if (filtro.data_inicio && visita.data_horario < filtro.data_inicio) return false;
      if (filtro.data_fim && visita.data_horario > filtro.data_fim) return false;
      return true;
    });
    return Promise.all(filtradas.map((v) => this.popularRelacionamentos(v)));
  }

  async criar(dados: CriarVisitaDTO): Promise<VisitaAgendada> {
    const proximoId = this.visitas.length > 0 ? Math.max(...this.visitas.map((v) => v.id)) + 1 : 1;
    const nova: VisitaAgendada = {
      id: proximoId,
      status: dados.status ?? 'pendente',
      ...dados,
      criado_em: new Date().toISOString(),
    };
    this.visitas.push(nova);
    return this.popularRelacionamentos(nova);
  }

  async atualizar(id: number, dados: Partial<VisitaAgendada>): Promise<VisitaAgendada | null> {
    const indice = this.visitas.findIndex((v) => v.id === id);
    if (indice === -1) return null;
    this.visitas[indice] = { ...this.visitas[indice], ...dados };
    return this.popularRelacionamentos(this.visitas[indice]);
  }

  async remover(id: number): Promise<boolean> {
    const indice = this.visitas.findIndex((v) => v.id === id);
    if (indice === -1) return false;
    this.visitas.splice(indice, 1);
    return true;
  }

  private async popularRelacionamentos(visita: VisitaAgendada): Promise<VisitaAgendada> {
    const jardim = this.dependenciasJardins ? await this.dependenciasJardins.buscarPorId(visita.jardim_id) : null;
    const usuario = this.dependenciasUsuarios ? await this.dependenciasUsuarios.buscarPorId(visita.usuario_id) : null;
    return { ...visita, jardim: jardim ?? undefined, usuario: usuario ?? undefined };
  }
}
