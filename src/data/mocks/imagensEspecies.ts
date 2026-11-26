/**
 * Farmácia Viva em Rede — Manifesto de Imagens de Espécies
 *
 * Mapeamento centralizado (única fonte da verdade) entre o slug da espécie
 * (EspeciePlanta.slug) e os caminhos públicos das fotos disponíveis em
 * /assets/plants/{slug}/.
 *
 * Regras:
 * - Chave = slug da espécie (lowercase, hifenizado, ASCII).
 * - Valor = array de caminhos relativos a /public, ex.: '/assets/plants/alecrim/alecrim1.jpg'.
 * - Os nomes de arquivo são mantidos exatamente como estão no disco (case-sensitive),
 *   pois nem todos seguem a convenção {slug}N.ext (ex.: 'Guaco1.png', 'capimsanto1.jpg').
 * - Espécies com menos de 2 fotos no disco expõem apenas o que existe.
 */

import type { EspeciePlanta } from '../../core/modelos/entidades';

export const IMAGENS_POR_ESPECIE: Record<string, string[]> = {
  alecrim: [
    '/assets/plants/alecrim/alecrim1.jpg',
    '/assets/plants/alecrim/alecrim2.jpg',
  ],
  'boldo-brasileiro': [
    '/assets/plants/boldo-brasileiro/boldo1.jpg',
    '/assets/plants/boldo-brasileiro/boldo2.jpg',
  ],
  camomila: [
    '/assets/plants/camomila/camomila1.jpg',
    '/assets/plants/camomila/camomila2.jpg',
  ],
  'capim-santo': [
    '/assets/plants/capim-santo/capimsanto1.jpg',
    '/assets/plants/capim-santo/capimsanto2.jpg',
  ],
  'erva-cidreira': ['/assets/plants/erva-cidreira/ervacidreira1.jpg'],
  guaco: ['/assets/plants/guaco/Guaco1.png'],
  hortela: [
    '/assets/plants/hortela/hortela1.jpg',
    '/assets/plants/hortela/hortela2.jpg',
  ],
  manjericao: [
    '/assets/plants/manjericao/manjericao1.jpg',
    '/assets/plants/manjericao/manjericao2.jpg',
  ],
};

/** Retorna as fotos cadastradas para o slug, ou array vazio quando não houver. */
export function obterFotosEspecie(slug: string): string[] {
  return IMAGENS_POR_ESPECIE[slug] ?? [];
}

/** Aplica as fotos do manifesto a uma entidade de espécie (sem mutar o original). */
export function especieComFotos(especie: EspeciePlanta): EspeciePlanta {
  return { ...especie, fotos: obterFotosEspecie(especie.slug) };
}
