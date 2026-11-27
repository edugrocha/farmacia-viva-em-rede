/**
 * Farmácia Viva em Rede - Broto botânico de sucesso.
 * Um broto que "cresce" ao contribuir com a rede (cadastrar jardim / agendar visita).
 * A animação é puramente decorativa e respeita prefers-reduced-motion (via classe .broto-anim).
 */
import React from 'react';
import { CORES } from '../../core/tema/tokens';

export interface BrotoBotanicoProps {
  tamanho?: number;
}

export const BrotoBotanico: React.FC<BrotoBotanicoProps> = ({ tamanho = 22 }) => (
  <svg
    className="broto-anim"
    width={tamanho}
    height={tamanho}
    viewBox="0 0 24 24"
    fill="none"
    aria-hidden="true"
    focusable="false"
    style={{ flexShrink: 0 }}
  >
    <path d="M12 21v-7" stroke={CORES.primaria} strokeWidth="2" strokeLinecap="round" />
    <path d="M12 14c0-3-2-5-5-5 0 3 2 5 5 5Z" fill={CORES.primaria} />
    <path d="M12 12c0-3 2-5 5-5 0 3-2 5-5 5Z" fill={CORES.acao} />
  </svg>
);