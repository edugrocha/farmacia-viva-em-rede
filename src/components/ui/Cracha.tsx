/**
 * Farmácia Viva em Rede - Componente de Crachá Padrão
 * Etiqueta visual com variantes de cor e 8px de raio.
 */

import React from 'react';
import { CORES, RAIO_BORDA } from '../../core/tema/tokens';

export type VarianteCracha = 'primaria' | 'secundaria' | 'acao' | 'neutra' | 'sucesso' | 'perigo';

export interface CrachaProps extends React.HTMLAttributes<HTMLSpanElement> {
  variante?: VarianteCracha;
}

const ESTILOS_VARIANTES: Record<VarianteCracha, React.CSSProperties> = {
  primaria: {
    backgroundColor: CORES.primariaSuave,
    color: CORES.primaria,
  },
  secundaria: {
    backgroundColor: CORES.secundariaSuave,
    color: CORES.secundariaEscura,
  },
  acao: {
    backgroundColor: CORES.acaoSuave,
    color: '#5C3D00',
  },
  neutra: {
    backgroundColor: CORES.fundo,
    color: CORES.textoPrincipal,
  },
  sucesso: {
    backgroundColor: CORES.sucessoSuave,
    color: CORES.sucesso,
  },
  perigo: {
    backgroundColor: CORES.erroSuave,
    color: CORES.erro,
  },
};

export const Cracha: React.FC<CrachaProps> = ({ variante = 'neutra', style, children, ...props }) => {
  const estiloVariante = ESTILOS_VARIANTES[variante];

  return (
    <span
      style={{
        ...estiloVariante,
        display: 'inline-flex',
        alignItems: 'center',
        gap: '0.35rem',
        padding: '0.35rem 0.75rem',
        borderRadius: RAIO_BORDA,
        fontFamily: "'Inter', sans-serif",
        fontSize: '0.78rem',
        fontWeight: 600,
        letterSpacing: '0.03em',
        textTransform: 'uppercase',
        ...style,
      }}
      {...props}
    >
      {children}
    </span>
  );
};
