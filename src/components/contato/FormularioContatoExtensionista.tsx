/**
 * Farmácia Viva em Rede - Formulário de contato com a equipe de extensão
 */

import React, { useState } from 'react';
import { Cartao } from '../ui/Cartao';
import { CampoEntrada } from '../ui/CampoEntrada';
import { Botao } from '../ui/Botao';
import { Cracha } from '../ui/Cracha';
import { CORES, RAIO_BORDA } from '../../core/tema/tokens';

export const FormularioContatoExtensionista: React.FC = () => {
  const [nome, setNome] = useState('');
  const [email, setEmail] = useState('');
  const [assunto, setAssunto] = useState('');
  const [mensagem, setMensagem] = useState('');
  const [status, setStatus] = useState<'idle' | 'sucesso' | 'erro'>('idle');
  const [erro, setErro] = useState('');
  const [carregando, setCarregando] = useState(false);

  const aoSubmeter = (evento: React.FormEvent) => {
    evento.preventDefault();
    setErro('');

    if (!nome.trim() || !email.trim() || !assunto.trim() || !mensagem.trim()) {
      setErro('Preencha todos os campos.');
      return;
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setErro('Informe um e-mail válido.');
      return;
    }

    setCarregando(true);
    setTimeout(() => {
      setStatus('sucesso');
      setNome('');
      setEmail('');
      setAssunto('');
      setMensagem('');
      setCarregando(false);
    }, 600);
  };

  return (
    <Cartao>
      <form onSubmit={aoSubmeter} style={{ display: 'flex', flexDirection: 'column', gap: '0.85rem' }}>
        <div>
          <Cracha variante="secundaria">Contato</Cracha>
          <h3
            style={{
              margin: '0.5rem 0 0',
              fontFamily: "'Montserrat', sans-serif",
              color: CORES.primaria,
            }}
          >
            Fale com a Equipe de Extensão Agrícola
          </h3>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '0.75rem' }}>
          <CampoEntrada rotulo="Nome *" value={nome} onChange={(e) => setNome(e.target.value)} required />
          <CampoEntrada
            rotulo="E-mail *"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <CampoEntrada
          rotulo="Assunto *"
          value={assunto}
          onChange={(e) => setAssunto(e.target.value)}
          placeholder="Ex.: Solicitar mudas, agendar visita técnica..."
          required
        />
        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.4rem' }}>
          <label
            htmlFor="mensagem-contato"
            style={{ fontSize: '0.85rem', fontWeight: 600, color: CORES.textoPrincipal }}
          >
            Mensagem *
          </label>
          <textarea
            id="mensagem-contato"
            value={mensagem}
            onChange={(e) => setMensagem(e.target.value)}
            rows={4}
            required
            style={{
              padding: '0.75rem 1rem',
              borderRadius: RAIO_BORDA,
              border: `1px solid ${CORES.bordaSuave}`,
              fontFamily: "'Inter', sans-serif",
              fontSize: '0.95rem',
              resize: 'vertical',
            }}
          />
        </div>

        {erro && (
          <div
            role="alert"
            style={{
              padding: '0.75rem',
              borderRadius: RAIO_BORDA,
              backgroundColor: CORES.erroSuave,
              color: CORES.erro,
              fontSize: '0.85rem',
            }}
          >
            {erro}
          </div>
        )}

        {status === 'sucesso' && (
          <div
            role="status"
            style={{
              padding: '0.75rem',
              borderRadius: RAIO_BORDA,
              backgroundColor: CORES.sucessoSuave,
              color: CORES.sucesso,
              fontSize: '0.85rem',
            }}
          >
            Mensagem enviada com sucesso. Em breve entraremos em contato.
          </div>
        )}

        <Botao type="submit" variante="primario" disabled={carregando}>
          {carregando ? 'Enviando...' : 'Enviar Mensagem'}
        </Botao>
      </form>
    </Cartao>
  );
};
