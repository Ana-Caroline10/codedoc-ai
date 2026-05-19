# Architecture - CodeDoc AI

## 1. Visão Geral do Sistema
O **CodeDoc AI** é uma aplicação Single Page (SPA) construída com **Next.js**, que utiliza inteligência artificial para processar código fonte e gerar documentação automática. A arquitetura foca em simplicidade, segurança da API Key e portabilidade para deploy na Vercel.

## 2. Stack Tecnológica
- **Framework:** Next.js 14+ (App Router)
- **Linguagem:** TypeScript
- **Estilização:** CSS Modules (Vanilla CSS approach)
- **IA:** Google Generative AI SDK (Gemini Pro)
- **Infraestrutura:** Vercel (Frontend + Serverless Functions)
- **Persistência:** LocalStorage (Navegador)

## 3. Arquitetura de Componentes
A aplicação será organizada seguindo os princípios de Atomic Design simplificado:

- **Layouts:** Estrutura global (Header, Footer, Main).
- **Views:** 
  - `Home`: Painel principal de edição e resultados.
  - `History`: Lista de códigos processados anteriormente (vindo do localStorage).
- **Components:**
  - `CodeEditor`: Editor para entrada de código.
  - `DocPanel`: Exibição do resumo e funções detectadas.
  - `MarkdownPreview`: Visualização do README gerado.
  - `LinguagemSelector`: Dropdown para selecionar a linguagem.

## 4. Fluxo de Dados
1.  **Input:** O usuário cola o código no `CodeEditor`.
2.  **Request:** O frontend envia o código para uma **API Route** (`/api/process`) do Next.js.
    - *Motivo:* Proteger a `GEMINI_API_KEY` no lado do servidor (Vercel Serverless).
3.  **Processing:** A API Route formata o prompt e chama o modelo Gemini Pro.
4.  **Response:** A IA retorna um objeto JSON contendo:
    - Código com comentários.
    - Resumo da lógica.
    - Lista de funções.
    - Conteúdo do README.
5.  **Display:** O frontend renderiza os dados nos respectivos painéis.
6.  **Persistence:** O resultado é salvo no `localStorage`.

## 5. Estratégia de IA (Prompts)
Serão utilizados 3 tipos de instruções no System Prompt:
- **Documentação:** "Adicione comentários explicativos no código seguindo o padrão da linguagem (JSDoc/Docstring)."
- **Resumo:** "Explique o que este código faz como se eu tivesse 10 anos."
- **README:** "Gere um arquivo README.md profissional para este código."

## 6. Segurança e Performance
- **API Keys:** Armazenadas como `Environment Variables` na Vercel.
- **Loading:** Implementação de Skeletons e estados de carregamento para feedback visual.
- **Bundle Size:** Minimizar bibliotecas externas; usar apenas o essencial.

## 7. Estrutura de Pastas
```
/src
  /app
    /api
      /process
        route.ts       # Endpoint de integração com Gemini
    page.tsx           # Home View
    layout.tsx
  /components          # Componentes Reutilizáveis
  /hooks               # Custom hooks (ex: useLocalStorage)
  /services            # Lógica de chamadas de API
  /styles              # CSS Modules
  /types               # Definições de interfaces TS
```
