/**
 * Farmácia Viva em Rede — CarrosselFotosEspecie
 *
 * Exibe as fotos da espécie (porte/hábito) de forma mobile-first:
 * - Mobile: carrossel horizontal swipeable (arraste/ponteiro) com snap e paginação.
 * - Desktop (≥ 768px): grid de 2 colunas com aspect-ratio fixo.
 * - Todas as imagens carregam lazy, com decoding assíncrono e fallback de placeholder
 *   quando a carga falha.
 */

import React, { useCallback, useEffect, useRef, useState } from 'react';
import { CORES, RAIO_BORDA } from '../../core/tema/tokens';

const BREAKPOINT_DESKTOP = 768;
const ASPECT_RATIO = '4/3';

interface Props {
  fotos: string[];
  nomePopular: string;
}

export const CarrosselFotosEspecie: React.FC<Props> = ({ fotos, nomePopular }) => {
  if (!fotos || fotos.length === 0) return null;

  const [atual, setAtual] = useState(0);
  const [erros, setErros] = useState<Set<string>>(new Set());
  const [arrastando, setArrastando] = useState(false);
  const [ponteiroX, setPonteiroX] = useState(0);
  const [scrollInicio, setScrollInicio] = useState(0);
  const [isDesktop, setIsDesktop] = useState(typeof window !== 'undefined' && window.innerWidth >= BREAKPOINT_DESKTOP);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const atualizar = () => setIsDesktop(window.innerWidth >= BREAKPOINT_DESKTOP);
    window.addEventListener('resize', atualizar, { passive: true });
    return () => window.removeEventListener('resize', atualizar);
  }, []);

  const lidarErro = useCallback((src: string) => setErros(prev => new Set(prev).add(src)), []);

  const indicePorScroll = useCallback(() => {
    const el = containerRef.current;
    if (!el || isDesktop) return 0;
    return Math.max(0, Math.min(fotos.length - 1, Math.round(el.scrollLeft / el.clientWidth)));
  }, [fotos.length, isDesktop]);

  const aoRolar = useCallback(() => {
    setAtual(indicePorScroll());
  }, [indicePorScroll]);

  const irPara = useCallback(
    (index: number) => {
      const alvo = Math.max(0, Math.min(fotos.length - 1, index));
      setAtual(alvo);
      const el = containerRef.current;
      if (el && !isDesktop) el.scrollTo({ left: alvo * el.clientWidth, behavior: 'smooth' });
    },
    [fotos.length, isDesktop],
  );

  const aoPointerDown = useCallback(
    (e: React.PointerEvent<HTMLDivElement>) => {
      setArrastando(true);
      setPonteiroX(e.clientX);
      setScrollInicio(containerRef.current?.scrollLeft ?? 0);
      containerRef.current?.setPointerCapture(e.pointerId);
    },
    [],
  );

  const aoPointerMove = useCallback(
    (e: React.PointerEvent<HTMLDivElement>) => {
      if (!arrastando || !containerRef.current) return;
      e.preventDefault();
      const dx = e.clientX - ponteiroX;
      containerRef.current.scrollLeft = scrollInicio - dx;
    },
    [arrastando, ponteiroX, scrollInicio],
  );

  const aoPointerUp = useCallback(() => setArrastando(false), []);

  const aoKeyDown = useCallback(
    (e: React.KeyboardEvent) => {
      if (e.key === 'ArrowLeft') irPara(atual - 1);
      else if (e.key === 'ArrowRight') irPara(atual + 1);
    },
    [atual, irPara],
  );

  if (isDesktop) {
    return (
      <section aria-label={`Fotos de ${nomePopular}`} style={{ marginBottom: '1rem' }}>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '0.75rem' }}>
          {fotos.map((src, idx) => (
            <div
              key={src}
              role="img"
              aria-label={`Foto ${idx + 1} de ${nomePopular}`}
              aria-roledescription="imagem"
              style={{
                position: 'relative',
                aspectRatio: ASPECT_RATIO,
                borderRadius: RAIO_BORDA,
                overflow: 'hidden',
                backgroundColor: CORES.fundo,
              }}
            >
              {erros.has(src) ? (
                <PlaceholderFoto label={`Foto ${idx + 1}`} />
              ) : (
                <img
                  src={src}
                  alt={`Foto ${idx + 1} de ${nomePopular}`}
                  loading="lazy"
                  decoding="async"
                  style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
                  onError={() => lidarErro(src)}
                />
              )}
            </div>
          ))}
        </div>
      </section>
    );
  }

  return (
    <section aria-label={`Fotos de ${nomePopular}`} style={{ marginBottom: '1rem' }}>
      <div
        ref={containerRef}
        onPointerDown={aoPointerDown}
        onPointerMove={aoPointerMove}
        onPointerUp={aoPointerUp}
        onPointerCancel={aoPointerUp}
        onKeyDown={aoKeyDown}
        onScroll={aoRolar}
        style={{
          display: 'flex',
          overflowX: 'auto',
          scrollSnapType: 'x mandatory',
          scrollBehavior: 'smooth',
          scrollbarWidth: 'none',
          WebkitOverflowScrolling: 'touch',
          touchAction: arrastando ? 'none' : 'pan-y',
          gap: '0.5rem',
          padding: '0 0.25rem 0.5rem',
        }}
      >
        {fotos.map((src, idx) => (
          <div
            key={src}
            style={{
              flex: '0 0 auto',
              width: '100%',
              scrollSnapAlign: 'center',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <div
              role="img"
              aria-label={`Foto ${idx + 1} de ${nomePopular}`}
              aria-roledescription="imagem"
              style={{
                position: 'relative',
                width: '100%',
                aspectRatio: ASPECT_RATIO,
                borderRadius: RAIO_BORDA,
                overflow: 'hidden',
                backgroundColor: CORES.fundo,
                boxShadow: `0 2px 8px ${CORES.textoSuave}20`,
              }}
            >
              {erros.has(src) ? (
                <PlaceholderFoto label={`Foto ${idx + 1}`} />
              ) : (
                <img
                  src={src}
                  alt={`Foto ${idx + 1} de ${nomePopular}`}
                  loading="lazy"
                  decoding="async"
                  style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
                  onError={() => lidarErro(src)}
                />
              )}
            </div>
          </div>
        ))}
      </div>

      {/* Paginação */}
      <div style={{ display: 'flex', justifyContent: 'center', gap: '0.4rem', marginTop: '0.5rem' }}>
        {fotos.map((_, idx) => (
          <button
            key={idx}
            aria-label={`Foto ${idx + 1}`}
            aria-pressed={atual === idx}
            onClick={() => irPara(idx)}
            style={{
              all: 'unset',
              boxSizing: 'border-box',
              width: 20,
              height: 6,
              borderRadius: '3px',
              backgroundColor: atual === idx ? CORES.primaria : CORES.bordaSuave,
              cursor: 'pointer',
              transition: 'all 0.2s ease',
              padding: 0,
            }}
          />
        ))}
      </div>

      {fotos.length > 1 && (
        <p style={{
          fontSize: '0.7rem',
          color: CORES.textoSuave,
          textAlign: 'center',
          margin: '0.4rem 0 0',
          fontFamily: "'Inter', sans-serif",
        }}>
          {atual + 1} de {fotos.length}
        </p>
      )}
    </section>
  );
};

// ── Placeholder quando a imagem falha ao carregar ────────────────────────────
const PlaceholderFoto: React.FC<{ label: string }> = ({ label }) => (
  <div
    style={{
      width: '100%',
      height: '100%',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: CORES.primariaSuave,
      color: CORES.primaria,
      fontSize: '0.7rem',
      fontFamily: "'Inter', sans-serif",
      gap: '0.25rem',
      textAlign: 'center',
      padding: '0.25rem',
    }}
  >
    <span style={{ fontSize: '1.5rem' }}>Foto indisponível</span>
    {label}
  </div>
);
