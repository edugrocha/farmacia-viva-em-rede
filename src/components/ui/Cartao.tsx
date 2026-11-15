/**
 * Farmácia Viva em Rede - Componente de Cartão Padrão
 * Container com 8px de raio, fundo branco e sombra suave.
 */

import React from 'react';
import { CORES, RAIO_BORDA, SOMBRAS } from '../../core/tema/tokens';

export interface CartaoProps extends React.HTMLAttributes<HTMLDivElement> {
  fundoBranco?: boolean;
  destacado?: boolean;
}

export const Cartao: React.FC<CartaoProps> = ({
  fundoBranco = true,
  destacado = false,
  style,
  children,
  ...props
}) => {
  return (
    <div
      style={{
        backgroundColor: fundoBranco ? CORES.superficie : 'transparent',
        border: destacado ? `2px solid ${CORES.primaria}` : `1px solid ${CORES.bordaSuave}`,
        borderRadius: RAIO_BORDA,
        boxShadow: SOMBRAS.suave,
        padding: '1.25rem',
        ...style,
      }}
      {...props}
    >
      {children}
    </div>
  );
};
