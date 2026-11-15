/**
 * Farmácia Viva em Rede - Página Jardins e Mapeamento
 * Exibe mapa interativo, filtros de busca e listagem de jardins com agendamento.
 */

import React, { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { repositorioJardins } from '../data/repositorios';
import { usarAutenticacao } from '../core/autenticacao/ContextoAutenticacao';
import { MapaLeaflet } from '../components/mapa/MapaLeaflet';
import { CartaoJardim } from '../components/jardins/CartaoJardim';
import { ModalCadastrarJardim } from '../components/jardins/ModalCadastrarJardim';
import { ModalAgendarVisita } from '../components/visitas/ModalAgendarVisita';
import { Cartao } from '../components/ui/Cartao';
import { Cracha } from '../components/ui/Cracha';
import { Botao } from '../components/ui/Botao';
import { CampoEntrada } from '../components/ui/CampoEntrada';
import type { JardimMedicinal } from '../core/modelos/entidades';
import { calcularDistanciasEOrdenar, obterLocalizacaoAtual, COORDENADAS_PADRAO } from '../services/servicoGeolocalizacao';
import { CORES } from '../core/tema/tokens';

export const PaginaJardins: React.FC = () => {
  const [searchParams] = useSearchParams();
  const { temPermissao } = usarAutenticacao();

  const [jardins, setJardins] = useState<JardimMedicinal[]>([]);
  const [carregando, setCarregando] = useState(true);
  const [termoBusca, setTermoBusca] = useState('');
  const [filtroTipo, setFiltroTipo] = useState<'todos' | 'publico' | 'particular'>('todos');
  const [modalCadastroAberto, setModalCadastroAberto] = useState(false);
  const [modalVisitaAberto, setModalVisitaAberto] = useState(false);
  const [jardimPreSelecionado, setJardimPreSelecionado] = useState<JardimMedicinal | null>(null);
  const [mensagemSucesso, setMensagemSucesso] = useState('');
  const [coordenadasUsuario, setCoordenadasUsuario] = useState<{ latitude: number; longitude: number } | null>(null);

  useEffect(() => {
    const inicializar = async () => {
      try {
        const lista = await repositorioJardins.listarTodos();
        setJardins(lista);

        const resultado = await obterLocalizacaoAtual();
        if (resultado.coordenadas) {
          setCoordenadasUsuario(resultado.coordenadas);
        }
      } catch (erro) {
        console.error('Erro ao carregar jardins:', erro);
      } finally {
        setCarregando(false);
      }
    };

    inicializar();
  }, []);

  useEffect(() => {
    const jardimId = searchParams.get('jardim');
    if (jardimId) {
      const id = Number(jardimId);
      const encontrado = jardins.find((j) => j.id === id);
      if (encontrado) {
        setJardimPreSelecionado(encontrado);
        setModalVisitaAberto(true);
      }
    }
  }, [searchParams, jardins]);

  const aoAlternarAlertaColheita = async (jardimId: number, estadoAtual: boolean) => {
    try {
      const atualizado = await repositorioJardins.atualizarAvisoColheita(jardimId, !estadoAtual);
      if (atualizado) {
        setJardins((anteriores) =>
          anteriores.map((j) => (j.id === jardimId ? atualizado : j))
        );
      }
    } catch (erro) {
      console.error('Erro ao alternar alerta:', erro);
    }
  };

  const jardinsFiltrados = jardins.filter((jardim) => {
    const matchTipo =
      filtroTipo === 'todos' || jardim.tipo_jardim === filtroTipo;
    const matchBusca =
      !termoBusca.trim() ||
      jardim.nome.toLowerCase().includes(termoBusca.toLowerCase()) ||
      jardim.endereco.toLowerCase().includes(termoBusca.toLowerCase()) ||
      jardim.plantas_disponiveis.some((p) =>
        p.toLowerCase().includes(termoBusca.toLowerCase())
      );
    return matchTipo && matchBusca;
  });

  const jardinsOrdenados = calcularDistanciasEOrdenar(jardinsFiltrados, COORDENADAS_PADRAO);

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
      <section aria-labelledby="titulo-mapeamento">
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'flex-end',
            flexWrap: 'wrap',
            gap: '1rem',
            marginBottom: '1rem',
          }}
        >
          <div>
            <Cracha variante="primaria">Mapeamento Geoespacial</Cracha>
            <h1
              id="titulo-mapeamento"
              style={{
                fontFamily: "'Montserrat', sans-serif",
                fontSize: '1.5rem',
                fontWeight: 700,
                marginTop: '0.5rem',
                marginBottom: 0,
              }}
            >
              Jardins e Mapeamento
            </h1>
          </div>
          {temPermissao('cadastrar_jardim') && (
            <Botao variante="primario" onClick={() => setModalCadastroAberto(true)}>
              Cadastrar Novo Jardim
            </Botao>
          )}
        </div>

        {carregando ? (
          <p style={{ color: CORES.textoSuave }}>Carregando mapa...</p>
        ) : (
          <MapaLeaflet
            jardins={jardins}
            coordenadasUsuario={coordenadasUsuario}
            altura="460px"
            aoSolicitarVisita={(jardimId) => {
              const encontrado = jardins.find((j) => j.id === jardimId);
              if (encontrado) {
                setJardimPreSelecionado(encontrado);
                setModalVisitaAberto(true);
              }
            }}
          />
        )}
      </section>

      <section aria-labelledby="titulo-filtros">
        <Cartao>
          <div
            style={{
              display: 'flex',
              gap: '0.75rem',
              flexWrap: 'wrap',
              alignItems: 'center',
            }}
          >
            <CampoEntrada
              type="text"
              value={termoBusca}
              onChange={(e) => setTermoBusca(e.target.value)}
              placeholder="Buscar por jardim, planta ou endereço..."
              aria-label="Buscar jardim"
              style={{ flex: 1, minWidth: '240px' }}
            />
            <select
              value={filtroTipo}
              onChange={(e) => setFiltroTipo(e.target.value as 'todos' | 'publico' | 'particular')}
              aria-label="Filtrar por tipo de jardim"
              style={{
                padding: '0.75rem 1rem',
                borderRadius: '8px',
                border: '1px solid #E0E8E4',
                fontFamily: "'Inter', sans-serif",
                fontSize: '0.95rem',
              }}
            >
              <option value="todos">Todos os tipos</option>
              <option value="publico">Públicos</option>
              <option value="particular">Particulares</option>
            </select>
          </div>
        </Cartao>
      </section>

      <section aria-labelledby="titulo-lista-mapeamento">
        <h2
          id="titulo-lista-mapeamento"
          style={{
            fontFamily: "'Montserrat', sans-serif",
            fontSize: '1.25rem',
            fontWeight: 700,
            marginBottom: '1rem',
          }}
        >
          Jardins Disponíveis ({jardinsFiltrados.length})
        </h2>

        {mensagemSucesso && (
          <div
            role="status"
            style={{
              padding: '0.75rem',
              borderRadius: '8px',
              backgroundColor: CORES.primariaSuave,
              color: CORES.primaria,
              marginBottom: '1rem',
              fontWeight: 600,
            }}
          >
            {mensagemSucesso}
          </div>
        )}

        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
            gap: '1rem',
          }}
        >
          {jardinsOrdenados.map((jardim) => (
            <CartaoJardim
              key={jardim.id}
              jardim={jardim}
              distanciaFormatada={jardim.distanciaFormatada}
              podeGerenciarAlertas={temPermissao('alternar_alerta_colheita')}
              aoAlternarAlertaColheita={aoAlternarAlertaColheita}
            />
          ))}
        </div>
      </section>

      <ModalCadastrarJardim
        aberto={modalCadastroAberto}
        aoFechar={() => setModalCadastroAberto(false)}
        aoCadastrarSucesso={(jardim) => {
          setJardins((anteriores) => [jardim, ...anteriores]);
          setMensagemSucesso(`Jardim "${jardim.nome}" cadastrado com sucesso!`);
          setTimeout(() => setMensagemSucesso(''), 4000);
        }}
      />

      <ModalAgendarVisita
        aberto={modalVisitaAberto}
        aoFechar={() => {
          setModalVisitaAberto(false);
          setJardimPreSelecionado(null);
        }}
        aoAgendarSucesso={() => {
          setMensagemSucesso('Visita agendada com sucesso!');
          setTimeout(() => setMensagemSucesso(''), 4000);
        }}
        jardimPreSelecionado={jardimPreSelecionado}
        jardinsDisponiveis={jardins}
      />
    </div>
  );
};
