# Farmácia Viva em Rede

Plataforma colaborativa para mapear hortos medicinais urbanos, agendar visitas técnicas, trocar saberes tradicionais e orientar a comunidade com base em fontes oficiais de saúde.

## Sobre o Projeto

O **Farmácia Viva em Rede** é uma aplicação web desenvolvida para conectar comunidades a jardins medicinais certificados. O projeto atende principalmente agentes comunitários de saúde, extensionistas agrícolas e membros da sociedade civil.

Esta é a versão MVP (Produto Mínimo Viável) do projeto, com o backend totalmente mockado para validação de fluxo e interface.

## Funcionalidades Principais

- **Navegação Multi-páginas:** Estrutura dividida em Início, Jardins e Mapeamento, Fórum Interativo e Assistente de IA.
- **Mapeamento Gráfico:** Integração com a biblioteca Leaflet.js para exibir um mapa interativo com marcadores dos jardins localizados na região do IFPE Jaboatão dos Guararapes (dados fictícios e realistas).
- **Agendamento de Visitas:** Fluxo simplificado onde o usuário pode clicar em um card de jardim e solicitar uma visita via modal.
- **Fórum Comunitário:** Espaço para troca de saberes (mockado).
- **Interface do Assistente de IA:** Widget flutuante no canto inferior direito e página dedicada para futura integração com a inteligência artificial.
- **Download Mobile:** Ícone flutuante no canto inferior esquerdo indicando o acesso à versão mobile.

## Tecnologias Utilizadas

- **React:** Biblioteca principal para construção da interface.
- **TypeScript:** Tipagem estática para maior segurança do código.
- **Vite:** Ferramenta de build e servidor de desenvolvimento rápido.
- **React Router DOM:** Gerenciamento de rotas da aplicação.
- **Leaflet / React-Leaflet:** Renderização do mapa interativo.
- **CSS Modules / Estilização Inline:** Aplicação estrita do Design System do projeto.

## Padrões e Regras do Projeto

- **Idioma:** Todo o código (nomes de componentes, variáveis, funções e comentários) é escrito estritamente em português.
- **Design System:** Uso da paleta de cores oficial (Primária: `#0C5C3E`, Secundária: `#A489C5`, Ação/CTA: `#FAA825`, Fundo: `#F4F8F5`, Neutro Escuro: `#2E4045`).
- **UI/UX:** Bordas padronizadas com raio de 8px.

## Como Executar o Projeto Localmente

### Pré-requisitos
- Node.js (versão 18 ou superior)
- NPM ou Yarn

### Passo a passo

1. Clone o repositório:
```bash
git clone https://github.com/seu-usuario/farmacia-viva-em-rede.git
```

2. Acesse a pasta do projeto:
```bash
cd farmacia-viva-em-rede
```

3. Instale as dependências:
```bash
npm install
```

4. Inicie o servidor de desenvolvimento:
```bash
npm run dev
```

5. O projeto estará disponível no endereço indicado no terminal (geralmente `http://localhost:5173`).

## Roadmap (Próximos Passos)

- [x] Estruturação de rotas e layout base.
- [x] Implementação do mapa gráfico com Leaflet.
- [x] Criação da UI do widget de IA e botão de download mobile.
- [ ] Integração do backend real com PostgreSQL.
- [ ] Treinamento e conexão do Agente de IA com fontes oficiais.
- [ ] Configuração de pipeline de CI/CD avançado.
- [ ] Deploy em ambiente de produção.

## Autor
Desenvolvido como parte do projeto de extensão do IFPE - Farmácia Viva em Rede.