/**
 * Farmácia Viva em Rede - Serviço de Geolocalização e Cálculo de Distâncias
 * Interage com a API nativa navigator.geolocation com tratamento de permissões,
 * fallbacks e cálculo geoespacial pela fórmula de Haversine.
 */

import type { JardimMedicinal } from '../core/modelos/entidades';

export interface Coordenadas {
  latitude: number;
  longitude: number;
  precisao?: number;
}

export type EstadoGeolocalizacao =
  | 'ocioso'
  | 'solicitando'
  | 'sucesso'
  | 'permissao_negada'
  | 'indisponivel'
  | 'tempo_esgotado'
  | 'erro';

export interface ResultadoGeolocalizacao {
  coordenadas: Coordenadas | null;
  estado: EstadoGeolocalizacao;
  mensagemErro?: string;
  usandoLocalizacaoPadrao: boolean;
}

export interface JardimComDistancia extends JardimMedicinal {
  distanciaEmKm: number;
  distanciaFormatada: string;
}

/**
 * Coordenadas de referência padrão para fallback (campus IFPE Jaboatão dos Guararapes - PE)
 */
export const COORDENADAS_PADRAO: Coordenadas = {
  latitude: -8.1620,
  longitude: -34.9435,
};

const RAIO_TERRA_KM = 6371;

function grausParaRadianos(graus: number): number {
  return (graus * Math.PI) / 180;
}

/**
 * Calcula a distância geodésica em quilômetros entre duas coordenadas (Haversine)
 */
export function calcularDistanciaHaversine(
  origem: Coordenadas,
  destino: Coordenadas
): number {
  const dLat = grausParaRadianos(destino.latitude - origem.latitude);
  const dLon = grausParaRadianos(destino.longitude - origem.longitude);

  const lat1 = grausParaRadianos(origem.latitude);
  const lat2 = grausParaRadianos(destino.latitude);

  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.sin(dLon / 2) * Math.sin(dLon / 2) * Math.cos(lat1) * Math.cos(lat2);

  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

  return RAIO_TERRA_KM * c;
}

/**
 * Formata a distância para exibição amigável em português
 */
export function formatarDistancia(distanciaEmKm: number): string {
  if (distanciaEmKm < 1) {
    const metros = Math.round(distanciaEmKm * 1000);
    return `${metros} m`;
  }
  return `${distanciaEmKm.toFixed(1).replace('.', ',')} km`;
}

/**
 * Solicita as coordenadas atuais do navegador de forma segura e assíncrona
 */
export function obterLocalizacaoAtual(
  timeoutMs: number = 8000
): Promise<ResultadoGeolocalizacao> {
  return new Promise((resolve) => {
    if (typeof window === 'undefined' || !navigator.geolocation) {
      resolve({
        coordenadas: COORDENADAS_PADRAO,
        estado: 'indisponivel',
        mensagemErro: 'A API de geolocalização não é suportada neste navegador.',
        usandoLocalizacaoPadrao: true,
      });
      return;
    }

    const opcoes: PositionOptions = {
      enableHighAccuracy: true,
      timeout: timeoutMs,
      maximumAge: 60000,
    };

    navigator.geolocation.getCurrentPosition(
      (posicao) => {
        resolve({
          coordenadas: {
            latitude: posicao.coords.latitude,
            longitude: posicao.coords.longitude,
            precisao: posicao.coords.accuracy,
          },
          estado: 'sucesso',
          usandoLocalizacaoPadrao: false,
        });
      },
      (erro) => {
        let estadoErro: EstadoGeolocalizacao = 'erro';
        let mensagem = 'Ocorreu um erro ao obter a localização.';

        switch (erro.code) {
          case erro.PERMISSION_DENIED:
            estadoErro = 'permissao_negada';
            mensagem = 'Permissão de geolocalização negada pelo usuário.';
            break;
          case erro.POSITION_UNAVAILABLE:
            estadoErro = 'indisponivel';
            mensagem = 'Sinal de localização GPS indisponível no momento.';
            break;
          case erro.TIMEOUT:
            estadoErro = 'tempo_esgotado';
            mensagem = 'O tempo limite para obter a localização expirou.';
            break;
        }

        resolve({
          coordenadas: COORDENADAS_PADRAO,
          estado: estadoErro,
          mensagemErro: mensagem,
          usandoLocalizacaoPadrao: true,
        });
      },
      opcoes
    );
  });
}

/**
 * Ordena e enriquece uma lista de jardins com a distância calculada
 */
export function calcularDistanciasEOrdenar(
  jardins: JardimMedicinal[],
  origem: Coordenadas
): JardimComDistancia[] {
  const enriquecidos: JardimComDistancia[] = jardins.map((jardim) => {
    const distanciaEmKm = calcularDistanciaHaversine(origem, {
      latitude: jardim.latitude,
      longitude: jardim.longitude,
    });

    return {
      ...jardim,
      distanciaEmKm,
      distanciaFormatada: formatarDistancia(distanciaEmKm),
    };
  });

  return enriquecidos.sort((a, b) => a.distanciaEmKm - b.distanciaEmKm);
}
