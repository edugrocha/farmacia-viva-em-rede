/**
 * Farmácia Viva em Rede - Seção Hero com contadores e apresentação institucional
 */

import React from 'react';
import { Botao } from '../ui/Botao';
import { Cracha } from '../ui/Cracha';
import { CORES, RAIO_BORDA, SOMBRAS } from '../../core/tema/tokens';
import { useIsMobile } from '../../core/tema/useMediaQuery';

export interface SecaoHeroProps {
  totalJardins: number;
  totalVisitas: number;
  totalComunidades: number;
  aoClicarAcao?: () => void;
  aoClicarSecundario?: () => void;
}

export const SecaoHero: React.FC<SecaoHeroProps> = ({
  totalJardins,
  totalVisitas,
  totalComunidades,
  aoClicarAcao,
  aoClicarSecundario,
}) => {
  const isMobile = useIsMobile();
  const indicadores = [
    { valor: totalJardins, rotulo: 'Jardins Cadastrados', cor: CORES.primaria },
    { valor: totalVisitas, rotulo: 'Visitas Agendadas', cor: CORES.acao },
    { valor: totalComunidades, rotulo: 'Comunidades Atendidas', cor: CORES.secundaria },
  ];

  return (
    <section
      aria-label="Seção principal institucional"
      style={{
        display: 'flex',
        flexDirection: 'column',
        gap: '2.5rem',
        padding: isMobile ? '2.5rem 1rem' : '4rem 1.5rem',
        background: `linear-gradient(135deg, ${CORES.primaria} 0%, ${CORES.primariaEscura} 100%)`,
        borderRadius: RAIO_BORDA,
        boxShadow: SOMBRAS.media,
        color: '#FFFFFF',
      }}
    >
      <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
        <Cracha variante="acao">Saúde Comunitária e Plantas Medicinais</Cracha>
        <h1
          style={{
            fontFamily: "'Montserrat', sans-serif",
            fontWeight: 700,
            fontSize: isMobile ? '2rem' : 'clamp(2.25rem, 4.5vw, 3.25rem)',
            lineHeight: 1.1,
            letterSpacing: '-0.02em',
            maxWidth: '18ch',
            margin: 0,
          }}
        >
          Conectando comunidades a jardins medicinais certificados
        </h1>
        <p
          style={{
            fontSize: '1rem',
            lineHeight: 1.7,
            maxWidth: '58ch',
            opacity: 0.9,
            margin: 0,
          }}
        >
          Plataforma colaborativa para mapear hortos medicinais urbanos, agendar visitas
          técnicas, trocar saberes tradicionais e orientar a comunidade com base em fontes
          oficiais de saúde.
        </p>
      </div>

      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))',
          gap: '1rem',
        }}
      >
        {indicadores.map((indicador) => (
          <div
            key={indicador.rotulo}
            style={{
              backgroundColor: 'rgba(255, 255, 255, 0.12)',
              borderRadius: RAIO_BORDA,
              padding: '1.25rem',
              textAlign: 'center',
            }}
          >
            <div
              style={{
                fontFamily: "'Montserrat', sans-serif",
                fontSize: '2.25rem',
                fontWeight: 700,
                color: indicador.cor,
              }}
            >
              {indicador.valor}
            </div>
            <div
              style={{
                fontSize: '0.85rem',
                opacity: 0.9,
                marginTop: '0.35rem',
              }}
            >
              {indicador.rotulo}
            </div>
          </div>
        ))}
      </div>

      <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
        <Botao variante="acao" tamanho="grande" onClick={aoClicarAcao}>
          Explorar Jardins
        </Botao>
        <Botao
          variante="contorno"
          tamanho="grande"
          onClick={aoClicarSecundario}
          style={{ borderColor: '#FFFFFF', color: '#FFFFFF' }}
        >
          Participar do Fórum
        </Botao>
      </div>
    </section>
  );
};
