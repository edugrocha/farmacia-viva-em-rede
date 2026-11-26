/**
 * Farmácia Viva em Rede — Mock de Espécies Vegetais (MVP)
 * Dados botânicos e agronômicos de referência.
 * Fonte: Embrapa Recursos Genéticos, REFLORA / RBG Kew, Farmacopeia Brasileira.
 *
 * Fotos da espécie (porte/hábito) são mapeadas centralmente em imagensEspecies.ts.
 */

import type { EspeciePlanta } from '../../core/modelos/entidades';
import { IMAGENS_POR_ESPECIE } from './imagensEspecies';

export const especiesMock: EspeciePlanta[] = [
  // ─── Erva-cidreira ─────────────────────────────────────────────────────────
  {
    slug: 'erva-cidreira',
    nome_popular: 'Erva-cidreira',
    nome_cientifico: 'Lippia alba (Mill.) N.E.Br.',
    sinonimias: ['Verbena alba Mill.', 'Lantana alba Mill.'],
    familia_botanica: 'Verbenaceae',
    origem: 'América tropical (México ao Brasil)',
    distribuicao_geografica:
      'Amplamente distribuída no Brasil, da Amazônia ao Sul; comum em regiões tropicais e subtropicais da América Latina e Caribe.',
    morfologia: {
      habito: 'Arbusto perene, ramificado, 0,5–2 m de altura.',
      folhas:
        'Opostas, ovais a elípticas, 2–6 cm, margens serradas, superfície rugosa, aroma cítrico intenso ao toque.',
      flores: 'Pequenas, brancas a lilás, reunidas em espigas axilares.',
      frutos: 'Drupas pequenas, globosas, verdes a amareladas na maturidade.',
      aroma: 'Cítrico-mentolado, rico em citral e limoneno.',
    },
    partes_utilizadas: ['folhas', 'flores'],
    ciclo_desenvolvimento: 'perene',
    metodos_propagacao: ['estaquia', 'divisao_touceira', 'sementes'],
    requisitos_climaticos: {
      temperatura_min_c: 10,
      temperatura_max_c: 38,
      precipitacao_descricao: '800–1800 mm/ano; tolera períodos secos curtos.',
      tolerancia_seca: true,
      exposicao_solar: 'pleno_sol',
    },
    requisitos_edaficos: {
      tipo_solo: 'Franco-argiloso, bem estruturado',
      ph_min: 5.5,
      ph_max: 7.0,
      drenagem: 'boa',
      fertilidade: 'media',
    },
    epoca_plantio: 'Primavera–verão (setembro a março no Nordeste)',
    epoca_colheita: 'A partir de 90 dias após plantio; colher de manhã cedo.',
    potencial_produtivo:
      'Até 10 t/ha de massa fresca por ano em 3–4 cortes; rendimento de óleo essencial: 0,2–0,5%.',
    fotos: IMAGENS_POR_ESPECIE['erva-cidreira'],
  },

  // ─── Guaco ─────────────────────────────────────────────────────────────────
  {
    slug: 'guaco',
    nome_popular: 'Guaco',
    nome_cientifico: 'Mikania glomerata Spreng.',
    sinonimias: ['Eupatorium scandens Vell.'],
    familia_botanica: 'Asteraceae',
    origem: 'Brasil (Mata Atlântica — Sul e Sudeste)',
    distribuicao_geografica:
      'Regiões Sul, Sudeste e partes do Nordeste brasileiro; frequente em bordas de mata e capoeiras.',
    morfologia: {
      habito: 'Liana (trepadeira) perene, caule volúvel, pode ultrapassar 5 m.',
      folhas:
        'Opostas, ovado-cordadas, 6–15 cm, membranáceas, ápice acuminado, base cordada; nervação proeminente.',
      flores: 'Capítulos brancos, agrupados em panículas terminais.',
      frutos: 'Aquênios com papus branco.',
      aroma: 'Folhas com odor característico de cumarina quando secas.',
    },
    partes_utilizadas: ['folhas'],
    ciclo_desenvolvimento: 'perene',
    metodos_propagacao: ['estaquia', 'sementes'],
    requisitos_climaticos: {
      temperatura_min_c: 15,
      temperatura_max_c: 35,
      precipitacao_descricao: '1000–2000 mm/ano; prefere umidade elevada.',
      tolerancia_seca: false,
      exposicao_solar: 'meia_sombra',
    },
    requisitos_edaficos: {
      tipo_solo: 'Franco-arenoso, rico em matéria orgânica',
      ph_min: 5.5,
      ph_max: 6.5,
      drenagem: 'boa',
      fertilidade: 'alta',
    },
    epoca_plantio: 'Outono–inverno (abril a agosto); evitar floradas',
    epoca_colheita: 'Folhas adultas após 6–8 meses; colher antes da floração.',
    potencial_produtivo:
      'Rendimento variável conforme suporte; extrato padronizado com ≥ 1% de cumarina.',
    fotos: IMAGENS_POR_ESPECIE['guaco'],
  },

  // ─── Boldo-brasileiro ──────────────────────────────────────────────────────
  {
    slug: 'boldo-brasileiro',
    nome_popular: 'Boldo-brasileiro',
    nome_cientifico: 'Plectranthus barbatus Andrews',
    sinonimias: ['Coleus forskohlii (Willd.) Briq.'],
    familia_botanica: 'Lamiaceae',
    origem: 'Índia e África Oriental; naturalizado no Brasil',
    distribuicao_geografica:
      'Cultivado em todo o Brasil, especialmente Nordeste e Sudeste; escapado de cultivo em beiras de estradas.',
    morfologia: {
      habito: 'Erva suculenta perene, erecta, 0,5–1,5 m; caule quadrangular.',
      folhas:
        'Opostas, ovadas a elípticas, 5–12 cm, carnosas, margens crenadas, face abaxial glandular, aroma forte.',
      flores: 'Azul-violáceas, em racemos terminais.',
      frutos: 'Núculas ovoides.',
      aroma: 'Forte, aromático, campforoso.',
    },
    partes_utilizadas: ['folhas'],
    ciclo_desenvolvimento: 'perene',
    metodos_propagacao: ['estaquia', 'divisao_touceira'],
    requisitos_climaticos: {
      temperatura_min_c: 12,
      temperatura_max_c: 35,
      precipitacao_descricao: '700–1500 mm/ano.',
      tolerancia_seca: true,
      exposicao_solar: 'meia_sombra',
    },
    requisitos_edaficos: {
      tipo_solo: 'Franco, bem drenado',
      ph_min: 5.5,
      ph_max: 7.0,
      drenagem: 'boa',
      fertilidade: 'media',
    },
    epoca_plantio: 'O ano todo (evitar pico de frio); primavera ideal.',
    epoca_colheita: 'Folhas maduras a partir de 60–90 dias; evitar floradas.',
    potencial_produtivo: 'Alta biomassa foliar; até 15 t/ha de massa verde/ano.',
    fotos: IMAGENS_POR_ESPECIE['boldo-brasileiro'],
  },

  // ─── Alecrim ───────────────────────────────────────────────────────────────
  {
    slug: 'alecrim',
    nome_popular: 'Alecrim',
    nome_cientifico: 'Salvia rosmarinus Spenn.',
    sinonimias: ['Rosmarinus officinalis L.'],
    familia_botanica: 'Lamiaceae',
    origem: 'Região mediterrânea',
    distribuicao_geografica:
      'Cultivado mundialmente; no Brasil, melhor adaptado ao Sul e Sudeste (clima mais seco e frio).',
    morfologia: {
      habito: 'Arbusto aromático perene, 0,5–2 m; ramificado desde a base.',
      folhas:
        'Lineares, 2–4 cm, coriáceas, revoltas, face adaxial verde-escura e abaxial branco-tomentosa.',
      flores: 'Azul-pálidas a violeta, bilabadas, em racemos axilares.',
      frutos: 'Núculas acastanhadas.',
      aroma: 'Fresco, campforoso, rico em 1,8-cineol e α-pineno.',
    },
    partes_utilizadas: ['folhas', 'flores', 'óleo_essencial'],
    ciclo_desenvolvimento: 'perene',
    metodos_propagacao: ['estaquia', 'sementes', 'mergulhia'],
    requisitos_climaticos: {
      temperatura_min_c: 5,
      temperatura_max_c: 32,
      precipitacao_descricao: '400–800 mm/ano; tolera seca prolongada.',
      tolerancia_seca: true,
      exposicao_solar: 'pleno_sol',
    },
    requisitos_edaficos: {
      tipo_solo: 'Arenoso a franco-arenoso, calcário a levemente ácido',
      ph_min: 6.0,
      ph_max: 8.0,
      drenagem: 'boa',
      fertilidade: 'baixa',
    },
    epoca_plantio: 'Outono–primavera (março a setembro no Sudeste).',
    epoca_colheita: 'Ramos novos a partir de 90 dias; maior teor de óleo antes da floração.',
    potencial_produtivo: '3–5 t/ha de massa verde; rendimento de óleo: 1,0–2,5%.',
    fotos: IMAGENS_POR_ESPECIE['alecrim'],
  },

  // ─── Capim-santo ───────────────────────────────────────────────────────────
  {
    slug: 'capim-santo',
    nome_popular: 'Capim-santo',
    nome_cientifico: 'Cymbopogon citratus (DC.) Stapf',
    sinonimias: ['Andropogon citratus DC.'],
    familia_botanica: 'Poaceae',
    origem: 'Índia (provável); amplamente cultivado na Ásia e América tropical',
    distribuicao_geografica:
      'Cultivado em todo o Brasil, especialmente Norte e Nordeste; naturalizado em margens de rios e campos.',
    morfologia: {
      habito: 'Gramínea perene, cespitosa, 1–2 m; forma touceiras densas.',
      folhas: 'Longas (60–120 cm × 1–2 cm), planas, lanceoladas, margens cortantes, aroma cítrico intenso.',
      flores: 'Panícula terminal, raramente produzida em cultivo.',
      aroma: 'Fortemente cítrico (citral 65–85%).',
    },
    partes_utilizadas: ['folhas', 'óleo_essencial'],
    ciclo_desenvolvimento: 'perene',
    metodos_propagacao: ['divisao_touceira', 'rizomas'],
    requisitos_climaticos: {
      temperatura_min_c: 15,
      temperatura_max_c: 40,
      precipitacao_descricao: '700–2500 mm/ano.',
      tolerancia_seca: true,
      exposicao_solar: 'pleno_sol',
    },
    requisitos_edaficos: {
      tipo_solo: 'Variado; prefere solos franco-argilosos férteis',
      ph_min: 5.0,
      ph_max: 7.5,
      drenagem: 'boa',
      fertilidade: 'media',
    },
    epoca_plantio: 'Início das chuvas (outubro a dezembro no Nordeste).',
    epoca_colheita: 'A partir de 90 dias; 3–4 cortes/ano.',
    potencial_produtivo: '20–40 t/ha de massa fresca/ano; óleo essencial: 0,4–0,8%.',
    fotos: IMAGENS_POR_ESPECIE['capim-santo'],
  },

  // ─── Hortelã ───────────────────────────────────────────────────────────────
  {
    slug: 'hortela',
    nome_popular: 'Hortelã',
    nome_cientifico: 'Mentha × piperita L.',
    sinonimias: ['Mentha piperita var. officinalis Sole'],
    familia_botanica: 'Lamiaceae',
    origem: 'Híbrido de origem europeia (M. aquatica × M. spicata)',
    distribuicao_geografica:
      'Cultivado mundialmente; no Brasil, presente em hortas domésticas e jardins medicinais de todas as regiões.',
    morfologia: {
      habito: 'Erva perene, estolonística, 30–90 cm; caule quadrangular avermelhado.',
      folhas: 'Opostas, ovado-lanceoladas, 4–8 cm, margens serradas, aroma mentolado intenso.',
      flores: 'Lilases, pequenas, em espigas terminais e axilares.',
      raiz: 'Estolões subterrâneos que propagam a planta vegetativamente.',
      aroma: 'Mentolado fresco (mentol 35–55%).',
    },
    partes_utilizadas: ['folhas', 'flores', 'óleo_essencial'],
    ciclo_desenvolvimento: 'perene',
    metodos_propagacao: ['estoloes', 'estaquia', 'divisao_touceira'],
    requisitos_climaticos: {
      temperatura_min_c: 5,
      temperatura_max_c: 30,
      precipitacao_descricao: '600–1500 mm/ano; prefere boa umidade no solo.',
      tolerancia_seca: false,
      exposicao_solar: 'meia_sombra',
    },
    requisitos_edaficos: {
      tipo_solo: 'Franco, fértil, rico em matéria orgânica',
      ph_min: 6.0,
      ph_max: 7.0,
      drenagem: 'moderada',
      fertilidade: 'alta',
    },
    epoca_plantio: 'Primavera e outono; evitar verão com calor excessivo no Nordeste.',
    epoca_colheita: '60–90 dias após plantio; colher antes da plena floração.',
    potencial_produtivo: '15–25 t/ha de massa fresca/ano; óleo: 0,5–1,0%.',
    fotos: IMAGENS_POR_ESPECIE['hortela'],
  },

  // ─── Manjericão ────────────────────────────────────────────────────────────
  {
    slug: 'manjericao',
    nome_popular: 'Manjericão',
    nome_cientifico: 'Ocimum basilicum L.',
    familia_botanica: 'Lamiaceae',
    origem: 'Índia e regiões tropicais da Ásia',
    distribuicao_geografica:
      'Cultivado mundialmente; amplamente usado em hortas domésticas e jardins medicinais brasileiros.',
    morfologia: {
      habito: 'Erva anual aromática, 30–60 cm; caule quadrangular, ramificado.',
      folhas: 'Opostas, ovadas a elípticas, 3–8 cm, membranáceas, verde-brilhante.',
      flores: 'Brancas a lilases, bilabadas, em racemos terminais.',
      frutos: 'Núculas pretas.',
      aroma: 'Doce-picante; quimiotipos variados (eugenol, linalol, citral).',
    },
    partes_utilizadas: ['folhas', 'flores', 'sementes', 'óleo_essencial'],
    ciclo_desenvolvimento: 'anual',
    metodos_propagacao: ['sementes'],
    requisitos_climaticos: {
      temperatura_min_c: 15,
      temperatura_max_c: 38,
      precipitacao_descricao: '600–1500 mm/ano.',
      tolerancia_seca: false,
      exposicao_solar: 'pleno_sol',
    },
    requisitos_edaficos: {
      tipo_solo: 'Franco-arenoso a franco-argiloso, bem drenado',
      ph_min: 6.0,
      ph_max: 7.5,
      drenagem: 'boa',
      fertilidade: 'alta',
    },
    epoca_plantio: 'Primavera–verão (setembro a março).',
    epoca_colheita: 'A partir de 30–45 dias; colher ponteiros antes da floração.',
    potencial_produtivo: '8–15 t/ha de massa fresca; óleo: 0,3–1,0%.',
    fotos: IMAGENS_POR_ESPECIE['manjericao'],
  },

  // ─── Camomila ──────────────────────────────────────────────────────────────
  {
    slug: 'camomila',
    nome_popular: 'Camomila',
    nome_cientifico: 'Matricaria chamomilla L.',
    sinonimias: ['Chamomilla recutita (L.) Rauschert'],
    familia_botanica: 'Asteraceae',
    origem: 'Europa e Ásia Ocidental',
    distribuicao_geografica:
      'Cultivada no Brasil especialmente no Sul (Paraná, maior produtor mundial); adaptada a climas temperados.',
    morfologia: {
      habito: 'Erva anual, ereta, 20–60 cm; muito ramificada.',
      folhas: 'Alternas, 2–3-pinadas, laciniadas, segmentos filiformes, sem pecíolo.',
      flores: 'Capítulos com flores liguladas brancas e flores tubulosas amarelas; receptáculo cônico e oco.',
      frutos: 'Aquênios sem papus.',
      aroma: 'Capítulos com odor característico de maçã (camazuleno, α-bisabolol).',
    },
    partes_utilizadas: ['flores', 'óleo_essencial'],
    ciclo_desenvolvimento: 'anual',
    metodos_propagacao: ['sementes'],
    requisitos_climaticos: {
      temperatura_min_c: 5,
      temperatura_max_c: 25,
      precipitacao_descricao: '500–900 mm/ano.',
      tolerancia_seca: false,
      exposicao_solar: 'pleno_sol',
    },
    requisitos_edaficos: {
      tipo_solo: 'Areno-argiloso, levemente ácido a neutro',
      ph_min: 5.6,
      ph_max: 7.0,
      drenagem: 'boa',
      fertilidade: 'media',
    },
    epoca_plantio: 'Outono (abril a junho no Sul do Brasil).',
    epoca_colheita: 'Capítulos no início da abertura; colheita manual ou mecânica.',
    potencial_produtivo: '800–1500 kg/ha de capítulos secos; óleo: 0,3–1,5%.',
    fotos: IMAGENS_POR_ESPECIE['camomila'],
  },
];

/** Busca uma espécie pelo seu slug. Retorna undefined se não encontrar. */
export function buscarEspeciePorSlug(slug: string): EspeciePlanta | undefined {
  return especiesMock.find((e) => e.slug === slug);
}
