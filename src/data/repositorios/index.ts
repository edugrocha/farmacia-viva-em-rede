/**
 * Farmácia Viva em Rede - Fábrica e Registro Central de Repositórios
 * Ponto de injeção de dependência do Repository Pattern.
 */

import { RepositorioUsuariosEmMemoria } from './RepositorioUsuariosEmMemoria';
import { RepositorioJardinsEmMemoria } from './RepositorioJardinsEmMemoria';
import { RepositorioVisitasEmMemoria } from './RepositorioVisitasEmMemoria';
import { RepositorioForumEmMemoria } from './RepositorioForumEmMemoria';

import type {
  IRepositorioUsuarios,
  IRepositorioJardins,
  IRepositorioVisitas,
  IRepositorioForum,
} from '../../core/repositorios/contratos';

const instanciaUsuarios = new RepositorioUsuariosEmMemoria();
const instanciaJardins = new RepositorioJardinsEmMemoria();
const instanciaVisitas = new RepositorioVisitasEmMemoria();
const instanciaForum = new RepositorioForumEmMemoria();

instanciaVisitas.definirDependencias(instanciaJardins, instanciaUsuarios);
instanciaForum.definirDependencias(instanciaUsuarios);

export const repositorioUsuarios: IRepositorioUsuarios = instanciaUsuarios;
export const repositorioJardins: IRepositorioJardins = instanciaJardins;
export const repositorioVisitas: IRepositorioVisitas = instanciaVisitas;
export const repositorioForum: IRepositorioForum = instanciaForum;

export * from './RepositorioUsuariosEmMemoria';
export * from './RepositorioJardinsEmMemoria';
export * from './RepositorioVisitasEmMemoria';
export * from './RepositorioForumEmMemoria';
export * from '../../core/repositorios/contratos';
