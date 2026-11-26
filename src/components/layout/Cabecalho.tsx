/**
 * Farmácia Viva em Rede - Cabeçalho de navegação principal
 * Barra superior fixa com logo, menu de navegação e seleção de perfil.
 */

import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { usarAutenticacao } from '../../core/autenticacao/ContextoAutenticacao';
import { ROTULOS_PAPEIS } from '../../core/autenticacao/permissoes';
import { CORES, RAIO_BORDA, SOMBRAS } from '../../core/tema/tokens';

export const Cabecalho: React.FC = () => {
  const localizacao = useLocation();
  const { usuarioAtivo, perfisPreConfigurados, autenticarPorId, encerrarSessao } = usarAutenticacao();

  const itensMenu = [
    { caminho: '/', rotulo: 'Início' },
    { caminho: '/jardins', rotulo: 'Jardins e Mapeamento' },
    { caminho: '/forum', rotulo: 'Fórum Interativo' },
    { caminho: '/assistente', rotulo: 'Assistente de IA' },
  ];

  const estiloAtivo = {
    borderBottom: `2px solid ${CORES.acao}`,
    color: CORES.primaria,
  };

  return (
    <header
      style={{
        position: 'sticky',
        top: 0,
        zIndex: 1000,
        backgroundColor: CORES.superficie,
        borderBottom: `1px solid ${CORES.bordaSuave}`,
        boxShadow: SOMBRAS.suave,
      }}
    >
      <div
        style={{
          maxWidth: '1280px',
          margin: '0 auto',
          padding: '0.85rem 1.5rem',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          gap: '1rem',
          flexWrap: 'wrap',
        }}
      >
          {/* Bloco da logo com imagem e texto */}
          <Link
            to="/"
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '0.6rem',
              textDecoration: 'none',
            }}
          >
            <img
              src="/assets/brand/logo.png"
              alt="Logo Farmácia Viva em Rede"
              style={{
                height: '42px',
                width: 'auto',
                objectFit: 'contain',
              }}
            />
            <span
              style={{
                fontFamily: "'Montserrat', sans-serif",
                fontWeight: 700,
                fontSize: '1.15rem',
                color: CORES.primaria,
              }}
            >
              Farmácia Viva em Rede
            </span>
          </Link>

        <nav
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '0.5rem',
            flexWrap: 'wrap',
          }}
        >
          {itensMenu.map((item) => (
            <Link
              key={item.caminho}
              to={item.caminho}
              style={{
                padding: '0.6rem 0.85rem',
                borderRadius: RAIO_BORDA,
                textDecoration: 'none',
                fontFamily: "'Inter', sans-serif",
                fontSize: '0.85rem',
                fontWeight: 600,
                color:
                  localizacao.pathname === item.caminho
                    ? CORES.primaria
                    : CORES.textoPrincipal,
                backgroundColor:
                  localizacao.pathname === item.caminho
                    ? CORES.primariaSuave
                    : 'transparent',
                ...(localizacao.pathname === item.caminho ? estiloAtivo : {}),
              }}
            >
              {item.rotulo}
            </Link>
          ))}
        </nav>

        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '0.75rem',
            flexWrap: 'wrap',
          }}
        >
          {usuarioAtivo && (
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '0.6rem',
              }}
            >
              <div
                style={{
                  padding: '0.45rem 0.75rem',
                  borderRadius: RAIO_BORDA,
                  backgroundColor: CORES.primariaSuave,
                  border: `1px solid ${CORES.bordaSuave}`,
                  fontFamily: "'Inter', sans-serif",
                  fontSize: '0.78rem',
                  color: CORES.textoPrincipal,
                  textAlign: 'right',
                }}
              >
                <div style={{ fontWeight: 700, color: CORES.primaria }}>
                  {usuarioAtivo.nome}
                </div>
                <div style={{ fontSize: '0.7rem', color: CORES.textoSuave }}>
                  {ROTULOS_PAPEIS[usuarioAtivo.tipo_usuario].titulo}
                </div>
              </div>

              <select
                aria-label="Selecionar perfil de usuário"
                value={usuarioAtivo.id}
                onChange={(e) => autenticarPorId(Number(e.target.value))}
                style={{
                  padding: '0.5rem 0.75rem',
                  borderRadius: RAIO_BORDA,
                  border: `1px solid ${CORES.bordaSuave}`,
                  fontFamily: "'Inter', sans-serif",
                  fontSize: '0.78rem',
                  color: CORES.textoPrincipal,
                  backgroundColor: CORES.superficie,
                  cursor: 'pointer',
                }}
              >
                {perfisPreConfigurados.map((perfil) => (
                  <option key={perfil.id} value={perfil.id}>
                    {perfil.nome}
                  </option>
                ))}
              </select>

              <button
                type="button"
                onClick={encerrarSessao}
                style={{
                  padding: '0.5rem 0.75rem',
                  borderRadius: RAIO_BORDA,
                  border: `1px solid ${CORES.bordaSuave}`,
                  backgroundColor: CORES.superficie,
                  color: CORES.textoPrincipal,
                  fontFamily: "'Inter', sans-serif",
                  fontSize: '0.78rem',
                  fontWeight: 600,
                  cursor: 'pointer',
                }}
              >
                Sair
              </button>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};