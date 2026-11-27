/**
 * Farmácia Viva em Rede - Mapa Interativo com Leaflet
 * Exibe marcadores de jardins, localização do usuário e popups detalhados.
 */

import React, { useEffect, useState } from 'react';
import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import type { JardimMedicinal } from '../../core/modelos/entidades';
import { CORES } from '../../core/tema/tokens';
import { useIsMobile } from '../../core/tema/useMediaQuery';
import { Botao } from '../ui/Botao';
import { Cracha } from '../ui/Cracha';
import { useNavigate } from 'react-router-dom';

// Ícone padrão do usuário (círculo azul)
const iconeUsuario = L.divIcon({
  className: 'icone-usuario-leaft',
  html: `<div style="width: 18px; height: 18px; background-color: #1976D2; border: 3px solid #FFFFFF; border-radius: 50%; box-shadow: 0 0 0 6px rgba(25,118,210,0.25);"></div>`,
  iconSize: [18, 18],
  iconAnchor: [9, 9],
});

// Ícone padrão de jardim (pin verde)
const iconeJardim = L.divIcon({
  className: 'icone-jardim-leaft',
  html: `<div style="width: 30px; height: 30px; background-color: ${CORES.primaria}; border: 3px solid #FFFFFF; border-radius: 50% 50% 50% 0; transform: rotate(-45deg); box-shadow: 0 2px 8px rgba(0,0,0,0.35); display: flex; align-items: center; justify-content: center;"><div style="width: 10px; height: 10px; background-color: ${CORES.acao}; border-radius: 50%; transform: rotate(45deg);"></div></div>`,
  iconSize: [30, 30],
  iconAnchor: [15, 28],
});

// Ícone de jardim com alerta de colheita ativo
const iconeJardimColheita = L.divIcon({
  className: 'icone-jardim-colheita-leaft',
  html: `<div style="width: 32px; height: 32px; background-color: ${CORES.acao}; border: 3px solid #FFFFFF; border-radius: 50% 50% 50% 0; transform: rotate(-45deg); box-shadow: 0 2px 8px rgba(0,0,0,0.35); display: flex; align-items: center; justify-content: center;"><div style="width: 10px; height: 10px; background-color: ${CORES.primaria}; border-radius: 50%; transform: rotate(45deg);"></div></div>`,
  iconSize: [32, 32],
  iconAnchor: [16, 30],
});

interface ComponenteAjusteVisaoProps {
  coordenadas: [number, number];
}

const ComponenteAjusteVisao: React.FC<ComponenteAjusteVisaoProps> = ({ coordenadas }) => {
  const mapa = useMap();
  useEffect(() => {
    mapa.setView(coordenadas, 14);
  }, [coordenadas, mapa]);
  return null;
};

export interface MapaLeafletProps {
  jardins: JardimMedicinal[];
  coordenadasUsuario?: { latitude: number; longitude: number } | null;
  altura?: string;
  aoSolicitarVisita?: (jardimId: number) => void;
}

export const MapaLeaflet: React.FC<MapaLeafletProps> = ({
  jardins,
  coordenadasUsuario = null,
  altura = '420px',
  aoSolicitarVisita,
}) => {
  const navegar = useNavigate();
  const isMobile = useIsMobile();
  const [carregandoLocalizacao, setCarregandoLocalizacao] = useState(false);

  const coordenadasCentral: [number, number] = coordenadasUsuario
    ? [coordenadasUsuario.latitude, coordenadasUsuario.longitude]
    : [-8.1620, -34.9435];

  const limitesMapa = L.latLngBounds(
    jardins.map((jardim) => [jardim.latitude, jardim.longitude] as [number, number])
  );

  useEffect(() => {
    if (!coordenadasUsuario && navigator.geolocation) {
      setCarregandoLocalizacao(true);
      const timeoutId = setTimeout(() => setCarregandoLocalizacao(false), 10000);
      return () => clearTimeout(timeoutId);
    }
    return () => undefined;
  }, [coordenadasUsuario]);

  return (
    <div
      style={{
        position: 'relative',
        height: isMobile ? '380px' : altura,
        width: '100%',
        borderRadius: '8px',
        overflow: 'hidden',
        border: `1px solid ${CORES.bordaSuave}`,
      }}
    >
      <MapContainer
        center={coordenadasCentral}
        zoom={14}
        scrollWheelZoom={false}
        style={{ height: '100%', width: '100%' }}
        bounds={jardins.length > 0 ? limitesMapa : undefined}
        boundsOptions={{ padding: [40, 40] }}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> colaboradores'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <ComponenteAjusteVisao coordenadas={coordenadasCentral} />

        {coordenadasUsuario && (
          <Marker position={[coordenadasUsuario.latitude, coordenadasUsuario.longitude]} icon={iconeUsuario}>
            <Popup>
              <div style={{ fontFamily: "'Inter', sans-serif", maxWidth: '220px' }}>
                <strong style={{ color: CORES.primaria }}>Sua Localização</strong>
                <div style={{ fontSize: '0.8rem', marginTop: '0.25rem', color: CORES.textoSuave }}>
                  Coordenadas obtidas via GPS
                </div>
              </div>
            </Popup>
          </Marker>
        )}

        {jardins.map((jardim) => (
          <Marker
            key={jardim.id}
            position={[jardim.latitude, jardim.longitude]}
            icon={jardim.aviso_colheita_ativo ? iconeJardimColheita : iconeJardim}
          >
            <Popup>
              <div
                style={{
                  fontFamily: "'Inter', sans-serif",
                  minWidth: isMobile ? '0' : '240px',
                  maxWidth: '100%',
                  overflowWrap: 'break-word',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '0.5rem',
                }}
              >
                <div style={{ fontWeight: 700, fontSize: '0.95rem', color: CORES.primaria }}>
                  {jardim.nome}
                </div>
                <div style={{ fontSize: '0.8rem', color: CORES.textoSuave }}>
                  {jardim.endereco}
                </div>
                <div style={{ display: 'flex', gap: '0.4rem', flexWrap: 'wrap' }}>
                  <Cracha variante={jardim.tipo_jardim === 'publico' ? 'primaria' : 'neutra'}>
                    {jardim.tipo_jardim === 'publico' ? 'Público' : 'Particular'}
                  </Cracha>
                  {jardim.aviso_colheita_ativo && (
                    <Cracha variante="acao">Colheita Ativa</Cracha>
                  )}
                </div>
                <div style={{ fontSize: '0.8rem' }}>
                  <strong>Responsável:</strong> {jardim.nome_responsavel}
                </div>
                <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap', marginTop: '0.25rem' }}>
                  <Botao
                    variante="acao"
                    tamanho="pequeno"
                    onClick={() => {
                      if (aoSolicitarVisita) {
                        aoSolicitarVisita(jardim.id);
                      } else {
                        navegar(`/agendar-visita?jardim=${jardim.id}`);
                      }
                    }}
                  >
                    Agendar Visita
                  </Botao>
                  <Botao
                    variante="contorno"
                    tamanho="pequeno"
                    onClick={() => navegar(`/jardim/${jardim.id}`)}
                  >
                    Ver Detalhes
                  </Botao>
                </div>
              </div>
            </Popup>
          </Marker>
        ))}
      </MapContainer>

      {carregandoLocalizacao && (
        <div
          style={{
            position: 'absolute',
            bottom: '1rem',
            left: '1rem',
            zIndex: 500,
            backgroundColor: CORES.superficie,
            padding: '0.5rem 0.75rem',
            borderRadius: '8px',
            fontSize: '0.8rem',
            fontFamily: "'Inter', sans-serif",
            boxShadow: '0 2px 8px rgba(0,0,0,0.15)',
          }}
        >
            Buscando sua localização...
        </div>
      )}
    </div>
  );
};
