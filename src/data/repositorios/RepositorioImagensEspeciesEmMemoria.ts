/**
 * Farmácia Viva em Rede - Repositório de Imagens de Espécies (em memória)
 *
 * Implementação do contrato IRepositorioImagensEspecies apoiada no manifesto
 * estático de assets. Preparada para futura substituição por consulta a
 * tabela/assets do PostgreSQL sem alterar consumidores.
 */

import { IMAGENS_POR_ESPECIE, obterFotosEspecie } from '../../data/mocks/imagensEspecies';
import type { IRepositorioImagensEspecies } from '../../core/repositorios/contratos';

export class RepositorioImagensEspeciesEmMemoria
  implements IRepositorioImagensEspecies
{
  async obterFotosEspecie(slug: string): Promise<string[]> {
    return Promise.resolve(obterFotosEspecie(slug));
  }

  /** Slugs cadastrados no manifesto (útil para validação/debug). */
  listarSlugsCadastrados(): string[] {
    return Object.keys(IMAGENS_POR_ESPECIE);
  }
}

const instancia = new RepositorioImagensEspeciesEmMemoria();

export const repositorioImagensEspecies: IRepositorioImagensEspecies = instancia;
