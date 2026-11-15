/**
 * Farmácia Viva em Rede - Interface completa do Assistente de IA
 * Versão MVP apenas com UI, sem backend de inteligência artificial integrado.
 */

import React, { useState } from 'react';
import { Cartao } from '../ui/Cartao';
import { CampoEntrada } from '../ui/CampoEntrada';
import { Botao } from '../ui/Botao';
import { Cracha } from '../ui/Cracha';
import { CORES, RAIO_BORDA } from '../../core/tema/tokens';

interface MensagemAssistente {
  remetente: 'usuario' | 'assistente';
  texto: string;
}

export const InterfaceAssistenteIA: React.FC = () => {
  const [mensagemUsuario, setMensagemUsuario] = useState('');
  const [historico, setHistorico] = useState<MensagemAssistente[]>([]);

  const aoEnviar = (evento: React.FormEvent) => {
    evento.preventDefault();
    const texto = mensagemUsuario.trim();
    if (!texto) return;

    setHistorico((anterior) => [...anterior, { remetente: 'usuario', texto }]);

    setTimeout(() => {
      setHistorico((anterior) => [
        ...anterior,
        {
          remetente: 'assistente',
          texto:
            'Esta é a versão MVP do assistente. Em breve poderei responder com base em fontes oficiais brasileiras como ANVISA, SUS, Embrapa e IPA. Consulte também a aba Jardins para agendar uma visita com nossos extensionistas.',
        },
      ]);
    }, 450);

    setMensagemUsuario('');
  };

  return (
    <div
      style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
        gap: '1.5rem',
      }}
    >
      <Cartao>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.85rem' }}>
          <Cracha variante="acao">Fontes Oficiais</Cracha>
          <h3
            style={{
              margin: 0,
              fontFamily: "'Montserrat', sans-serif",
              color: CORES.primaria,
            }}
          >
            Assistente Fitoterápico Institucional
          </h3>
          <p style={{ margin: 0, lineHeight: 1.6, color: CORES.textoPrincipal }}>
            Este assistente foi desenhado para orientar a comunidade sobre uso seguro de plantas
            medicinais com base em fontes oficiais brasileiras.
          </p>
          <ul style={{ margin: 0, paddingLeft: '1.25rem', lineHeight: 1.7 }}>
            <li>ANVISA - Formulário de Fitoterápicos da Farmacopeia Brasileira</li>
            <li>Ministério da Saúde - Monografias da Farmácia Viva (SUS)</li>
            <li>Embrapa - Cultivo e manejo de espécies medicinais</li>
            <li>IPA - Agroecologia do Semiárido</li>
          </ul>
          <div
            style={{
              marginTop: '0.5rem',
              padding: '0.75rem',
              borderRadius: RAIO_BORDA,
              backgroundColor: CORES.acaoSuave,
              color: '#5C3D00',
              fontSize: '0.85rem',
            }}
          >
            Em breve: consultas integradas com bases validadas e citações ABNT.
          </div>
        </div>
      </Cartao>

      <Cartao style={{ display: 'flex', flexDirection: 'column', height: '560px' }}>
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            marginBottom: '0.75rem',
          }}
        >
          <h3
            style={{
              margin: 0,
              fontFamily: "'Montserrat', sans-serif",
              color: CORES.primaria,
            }}
          >
            Chat com o Assistente
          </h3>
          <Cracha variante="neutra">MVP</Cracha>
        </div>

        <div
          style={{
            flex: 1,
            overflowY: 'auto',
            backgroundColor: CORES.fundo,
            borderRadius: RAIO_BORDA,
            padding: '1rem',
            display: 'flex',
            flexDirection: 'column',
            gap: '0.6rem',
          }}
        >
          {historico.length === 0 ? (
            <div
              style={{
                textAlign: 'center',
                color: CORES.textoSuave,
                marginTop: '2rem',
                lineHeight: 1.6,
              }}
            >
              Faça sua primeira pergunta sobre plantas medicinais.
            </div>
          ) : (
            historico.map((mensagem, indice) => (
              <div
                key={indice}
                style={{
                  alignSelf: mensagem.remetente === 'usuario' ? 'flex-end' : 'flex-start',
                  maxWidth: '75%',
                  padding: '0.75rem 1rem',
                  borderRadius: RAIO_BORDA,
                  border: `1px solid ${CORES.bordaSuave}`,
                  backgroundColor:
                    mensagem.remetente === 'usuario'
                      ? CORES.primariaSuave
                      : CORES.superficie,
                  fontFamily: "'Inter', sans-serif",
                  fontSize: '0.9rem',
                  lineHeight: 1.45,
                }}
              >
                {mensagem.texto}
              </div>
            ))
          )}
        </div>

        <form
          onSubmit={aoEnviar}
          style={{ display: 'flex', gap: '0.5rem', marginTop: '0.75rem' }}
        >
          <CampoEntrada
            type="text"
            value={mensagemUsuario}
            onChange={(e) => setMensagemUsuario(e.target.value)}
            placeholder="Escreva sua pergunta..."
            aria-label="Pergunta para o assistente"
            style={{ flex: 1 }}
          />
          <Botao type="submit" variante="primario">
            Enviar
          </Botao>
        </form>
      </Cartao>
    </div>
  );
};
