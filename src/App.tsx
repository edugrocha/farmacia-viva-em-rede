import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { ProvedorAutenticacao } from './core/autenticacao/ContextoAutenticacao';
import { LayoutBase } from './components/layout/LayoutBase';
import { PaginaInicio } from './pages/PaginaInicio';
import { PaginaJardins } from './pages/PaginaJardins';
import { PaginaForum } from './pages/PaginaForum';
import { PaginaAgendarVisita } from './pages/PaginaAgendarVisita';
import { PaginaAssistenteIA } from './pages/PaginaAssistenteIA';
import { PaginaJardimDetalhes } from './pages/PaginaJardimDetalhes';

/**
 * Componente raiz da aplicacao Farmacia Viva em Rede.
 * Configura roteamento multi-pagina com react-router-dom e
 * envolve toda a arvore com o provedor de autenticacao (RBAC).
 */
export function App() {
  return (
    <ProvedorAutenticacao>
      <BrowserRouter>
        <LayoutBase>
          <Routes>
            <Route path="/" element={<PaginaInicio />} />
            <Route path="/jardins" element={<PaginaJardins />} />
            <Route path="/jardim/:id" element={<PaginaJardimDetalhes />} />
            <Route path="/forum" element={<PaginaForum />} />
            <Route path="/agendar-visita" element={<PaginaAgendarVisita />} />
            <Route path="/assistente" element={<PaginaAssistenteIA />} />
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </LayoutBase>
      </BrowserRouter>
    </ProvedorAutenticacao>
  );
}

export default App;